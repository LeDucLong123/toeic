import { create } from "zustand"
import type { QuestionGroup, UserExamState } from "@/types/exam"

interface ExamStore extends UserExamState {
  currentPart: number | null // null means both/all
  activeGroupIndex: number
  elapsedSeconds: number
  isReviewMode: boolean

  // Actions
  selectPart: (part: number | null) => void
  setActiveGroupIndex: (index: number) => void
  setAnswer: (questionId: number, optionKey: string) => void
  toggleFlag: (questionId: number) => void
  submitExam: (groups: QuestionGroup[]) => void
  retakeExam: () => void
  setReviewMode: (review: boolean) => void
  tickTimer: () => void
}

const STORAGE_KEY = "toeic_ets2026_exam_state"

const getInitialState = (): UserExamState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error("Failed to load saved state", e)
  }
  return {
    answers: {},
    flagged: {},
    isSubmitted: false
  }
}

export const useExamStore = create<ExamStore>((set, get) => {
  const initial = getInitialState()

  return {
    ...initial,
    currentPart: null,
    activeGroupIndex: 0,
    elapsedSeconds: 0,
    isReviewMode: false,

    selectPart: (part) => {
      set({ currentPart: part, activeGroupIndex: 0 })
    },

    setActiveGroupIndex: (index) => {
      set({ activeGroupIndex: index })
    },

    setAnswer: (questionId, optionKey) => {
      set((state) => {
        const newAnswers = { ...state.answers, [questionId]: optionKey }
        // Save to localStorage
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              answers: newAnswers,
              flagged: state.flagged,
              isSubmitted: state.isSubmitted,
              score: state.score
            })
          )
        } catch (e) {
          console.error(e)
        }
        return { answers: newAnswers }
      })
    },

    toggleFlag: (questionId) => {
      set((state) => {
        const newFlagged = { ...state.flagged, [questionId]: !state.flagged[questionId] }
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              answers: state.answers,
              flagged: newFlagged,
              isSubmitted: state.isSubmitted,
              score: state.score
            })
          )
        } catch (e) {
          console.error(e)
        }
        return { flagged: newFlagged }
      })
    },

    submitExam: (groups) => {
      const state = get()
      let correct = 0
      let total = 0
      let p3Correct = 0
      let p3Total = 0
      let p4Correct = 0
      let p4Total = 0

      groups.forEach((g) => {
        g.questions.forEach((q) => {
          total++
          const userAns = state.answers[q.id]
          const isRight = userAns === q.correctAnswer
          if (isRight) correct++

          if (g.part === 3) {
            p3Total++
            if (isRight) p3Correct++
          } else if (g.part === 4) {
            p4Total++
            if (isRight) p4Correct++
          }
        })
      })

      const score = {
        correct,
        total,
        percentage: Math.round((correct / (total || 1)) * 100),
        part3Correct: p3Correct,
        part3Total: p3Total,
        part4Correct: p4Correct,
        part4Total: p4Total
      }

      const newState = {
        isSubmitted: true,
        submittedAt: new Date().toISOString(),
        score,
        isReviewMode: true
      }

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            answers: state.answers,
            flagged: state.flagged,
            ...newState
          })
        )
      } catch (e) {
        console.error(e)
      }

      set(newState)
    },

    retakeExam: () => {
      const reset = {
        answers: {},
        flagged: {},
        isSubmitted: false,
        score: undefined,
        isReviewMode: false,
        activeGroupIndex: 0,
        elapsedSeconds: 0
      }
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch (e) {
        console.error(e)
      }
      set(reset)
    },

    setReviewMode: (review) => {
      set({ isReviewMode: review })
    },

    tickTimer: () => {
      set((state) => ({ elapsedSeconds: state.elapsedSeconds + 1 }))
    }
  }
})
