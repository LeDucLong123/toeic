import { useEffect, useRef } from "react"
import type { QuestionGroup } from "@/types/exam"
import { useExamStore } from "@/stores/useExamStore"
import { Badge } from "@/components/ui/badge"
import { Flag, Check, X, ChevronRight } from "lucide-react"

interface QuestionNavigatorProps {
  groups: QuestionGroup[]
  onSelectGroup: (groupIndex: number, questionId: number) => void
}

export function QuestionNavigator({ groups, onSelectGroup }: QuestionNavigatorProps) {
  const { answers, flagged, isSubmitted, isReviewMode, activeGroupIndex } = useExamStore()
  const activeItemRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll the active group into view inside the navigator list
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      })
    }
  }, [activeGroupIndex])

  const totalQuestions = groups.reduce((acc, g) => acc + g.questions.length, 0)
  const answeredCount = Object.keys(answers).length

  return (
    <div className="space-y-3">
      {/* Header Info */}
      <div className="flex items-center justify-between text-xs pb-2 border-b">
        <div>
          <span className="font-bold text-foreground">Bảng câu hỏi</span>
          <span className="text-muted-foreground ml-1 font-mono">({answeredCount}/{totalQuestions})</span>
        </div>
        <div className="flex items-center gap-2.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> Đã làm
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span> Cắm cờ
          </span>
        </div>
      </div>

      {/* Group List */}
      <div className="space-y-2.5 max-h-[65vh] overflow-y-auto pr-1">
        {groups.map((group, groupIdx) => {
          const isActive = groupIdx === activeGroupIndex
          return (
            <div 
              key={group.groupId} 
              ref={isActive ? activeItemRef : null}
              onClick={() => onSelectGroup(groupIdx, group.questions[0].id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer select-none ${
                isActive 
                  ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/30 shadow-xs" 
                  : "bg-card hover:border-blue-300 dark:hover:border-blue-800 hover:bg-slate-50/80 dark:hover:bg-slate-900/60"
              }`}
            >
              {/* Group Title Bar */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-semibold ${
                    isActive ? "text-blue-700 dark:text-blue-300 font-bold" : "text-muted-foreground"
                  }`}>
                    Part {group.part} • Đoạn {group.groupId}
                  </span>
                  {group.imageUrl && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-1 py-0.2 rounded font-medium">
                      Ảnh
                    </span>
                  )}
                </div>

                {isActive ? (
                  <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-blue-400 bg-blue-100/50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    Đang làm
                  </Badge>
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-60" />
                )}
              </div>

              {/* 3 Question Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {group.questions.map((q) => {
                  const userAns = answers[q.id]
                  const isFlag = !!flagged[q.id]
                  const isAnswered = !!userAns
                  const isRight = userAns === q.correctAnswer

                  // Button styling
                  let btnColor = "bg-muted text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-800"
                  if (isReviewMode && isSubmitted) {
                    if (isRight) {
                      btnColor = "bg-emerald-600 text-white font-bold"
                    } else if (isAnswered && !isRight) {
                      btnColor = "bg-red-500 text-white font-bold"
                    } else {
                      btnColor = "bg-amber-100 text-amber-900 border border-amber-300"
                    }
                  } else {
                    if (isAnswered) {
                      btnColor = "bg-blue-600 text-white font-semibold shadow-xs"
                    }
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectGroup(groupIdx, q.id)
                      }}
                      className={`relative h-9 rounded-lg text-xs font-medium flex items-center justify-center transition-all ${btnColor} hover:scale-102 active:scale-98`}
                    >
                      <span>{q.id}</span>
                      {userAns && !isReviewMode && (
                        <span className="ml-1 text-[10px] opacity-90 font-bold">({userAns})</span>
                      )}
                      {isReviewMode && isSubmitted && (
                        <span className="ml-1">
                          {isRight ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </span>
                      )}

                      {/* Flag Indicator */}
                      {isFlag && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 text-white rounded-full flex items-center justify-center shadow-xs">
                          <Flag className="w-2 h-2 fill-current" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
