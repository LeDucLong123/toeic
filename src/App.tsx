import { useState } from "react"
import rawTestData from "@/data/test1-listening.json"
import type { TestData, QuestionGroup } from "@/types/exam"
import { useExamStore } from "@/stores/useExamStore"
import { TestList } from "@/components/home/TestList"
import { TestDetail } from "@/components/home/TestDetail"
import { ExamRoom } from "@/components/exam/ExamRoom"
import { ResultDashboard } from "@/components/exam/ResultDashboard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Volume2, ChevronRight } from "lucide-react"

const testData = rawTestData as unknown as TestData

export default function App() {
  const [viewMode, setViewMode] = useState<"test-list" | "test-detail" | "exam" | "result">("test-list")
  const [selectedTestId, setSelectedTestId] = useState<string>("test-1")
  const [activeGroups, setActiveGroups] = useState<QuestionGroup[]>(testData.groups)

  const { 
    selectPart, 
    isSubmitted, 
    score, 
    retakeExam, 
    setReviewMode,
    answers
  } = useExamStore()

  // 1. User picks a test from test list
  const handleSelectTest = (testId: string) => {
    setSelectedTestId(testId)
    setViewMode("test-detail")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // 2. User chooses practice mode (Full test or specific Part)
  const handleStartPractice = (partId: number | null) => {
    selectPart(partId)
    if (partId === null) {
      setActiveGroups(testData.groups)
    } else {
      setActiveGroups(testData.groups.filter((g) => g.part === partId))
    }

    if (isSubmitted && score) {
      setViewMode("result")
    } else {
      setViewMode("exam")
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // If user is inside Exam room
  if (viewMode === "exam") {
    return (
      <ExamRoom
        groups={activeGroups}
        onBackToDashboard={() => setViewMode("test-detail")}
      />
    )
  }

  // If user is inside Result Summary
  if (viewMode === "result" && score) {
    return (
      <ResultDashboard
        onReview={() => {
          setReviewMode(true)
          setViewMode("exam")
        }}
        onRetake={() => {
          retakeExam()
          setViewMode("exam")
        }}
        onHome={() => setViewMode("test-detail")}
      />
    )
  }

  const answeredTotal = Object.keys(answers).length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-xs">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setViewMode("test-list")}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            T26
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">TOEIC ETS 2026 Master</h1>
            <p className="text-xs text-muted-foreground">Luyện đề tương tác - Không cần Database</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 py-1 px-3 text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200">
            <Volume2 className="w-3.5 h-3.5" /> 54 Audio tracks đã sẵn sàng
          </Badge>
          {answeredTotal > 0 && viewMode === "test-list" && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs gap-1.5"
              onClick={() => {
                setSelectedTestId("test-1")
                setViewMode("test-detail")
              }}
            >
              Tiếp tục bài làm ({answeredTotal} câu) <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {viewMode === "test-list" && (
          <TestList onSelectTest={handleSelectTest} />
        )}

        {viewMode === "test-detail" && (
          <TestDetail
            testId={selectedTestId}
            onBackToTestList={() => setViewMode("test-list")}
            onStartPractice={handleStartPractice}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground bg-white/50 dark:bg-slate-900/50">
        <p>Bộ đề ôn luyện thi TOEIC ETS 2026 • Luyện đề tự động chạy trên máy cục bộ</p>
      </footer>
    </div>
  )
}
