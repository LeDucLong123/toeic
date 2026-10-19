export interface Option {
  key: string
  text: string
  textVi?: string
}

export interface Question {
  id: number
  question: string
  questionVi?: string
  options: Option[]
  correctAnswer: string
  explanation?: string
}

export interface QuestionGroup {
  groupId: string
  part: number
  audioUrl: string
  imageUrl?: string
  transcriptEn: string
  transcriptVi: string
  questions: Question[]
}

export interface TestData {
  testId: string
  title: string
  totalGroups: number
  totalQuestions: number
  groups: QuestionGroup[]
}

export interface UserExamState {
  answers: Record<number, string> // questionId -> "A"|"B"|"C"|"D"
  flagged: Record<number, boolean> // questionId -> boolean
  isSubmitted: boolean
  submittedAt?: string
  score?: {
    correct: number
    total: number
    percentage: number
    part3Correct: number
    part3Total: number
    part4Correct: number
    part4Total: number
  }
}
