import { useState, useEffect } from "react"
import type { QuestionGroup } from "@/types/exam"
import { useExamStore } from "@/stores/useExamStore"
import { AudioPlayer } from "./AudioPlayer"
import { QuestionNavigator } from "./QuestionNavigator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flag, 
  CheckCircle2, 
  Menu, 
  FileText, 
  Eye, 
  EyeOff,
  RotateCcw,
  Sparkles,
  Image as ImageIcon
} from "lucide-react"

interface ExamRoomProps {
  groups: QuestionGroup[]
  onBackToDashboard: () => void
}

function renderDialogue(text: string) {
  if (!text) return null
  const lines = text.split("\n").filter((l) => l.trim())

  return (
    <div className="space-y-2.5">
      {lines.map((line, idx) => {
        const match = line.match(/^([A-Za-z0-9_À-ỹ\s]+:)\s*(.*)$/)
        if (match) {
          const speaker = match[1].replace(":", "").trim()
          const content = match[2]
          const lower = speaker.toLowerCase()
          const isWoman = lower.includes("w") || lower.includes("nữ")
          const isMan = lower.includes("m") || lower.includes("nam")

          let badgeColor = "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
          if (isWoman) {
            badgeColor = "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800"
          } else if (isMan) {
            badgeColor = "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800"
          }

          return (
            <div key={idx} className="flex items-start gap-2 leading-relaxed">
              <Badge variant="outline" className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 mt-0.5 ${badgeColor}`}>
                {speaker}
              </Badge>
              <p className="text-slate-800 dark:text-slate-200 flex-1">
                {content}
              </p>
            </div>
          )
        }

        return (
          <p key={idx} className="text-slate-800 dark:text-slate-200 leading-relaxed">
            {line}
          </p>
        )
      })}
    </div>
  )
}

export function ExamRoom({ groups, onBackToDashboard }: ExamRoomProps) {
  const { 
    activeGroupIndex, 
    setActiveGroupIndex, 
    answers, 
    setAnswer, 
    flagged, 
    toggleFlag,
    isSubmitted,
    isReviewMode,
    submitExam,
    retakeExam,
    setReviewMode,
    elapsedSeconds,
    tickTimer
  } = useExamStore()

  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showSheet, setShowSheet] = useState(false)
  const [showTranscript, setShowTranscript] = useState(isReviewMode)
  const [showTranslation, setShowTranslation] = useState(false)

  // Timer interval
  useEffect(() => {
    if (isSubmitted) return
    const interval = setInterval(() => {
      tickTimer()
    }, 1000)
    return () => clearInterval(interval)
  }, [isSubmitted, tickTimer])

  // Current group
  const currentGroup = groups[activeGroupIndex] || groups[0]

  const totalQuestions = groups.reduce((acc, g) => acc + g.questions.length, 0)
  const answeredCount = Object.keys(answers).length
  const unansweredCount = totalQuestions - answeredCount

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`
  }

  const handleNext = () => {
    if (activeGroupIndex < groups.length - 1) {
      setActiveGroupIndex(activeGroupIndex + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrev = () => {
    if (activeGroupIndex > 0) {
      setActiveGroupIndex(activeGroupIndex - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Top sticky exam bar */}
      <header className="sticky top-0 z-40 border-b bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBackToDashboard} className="gap-1.5 text-xs">
              <ArrowLeft className="w-4 h-4" /> Về trang chủ
            </Button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">Part {currentGroup.part} - Đoạn {currentGroup.groupId}</span>
                <Badge variant="outline" className="text-[10px] py-0 h-4">
                  Đoạn {activeGroupIndex + 1} / {groups.length}
                </Badge>
                {isReviewMode && (
                  <Badge className="bg-emerald-600 text-white text-[10px] py-0 h-4">
                    Chế độ chữa đề
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{formatTimer(elapsedSeconds)}</span>
            </div>

            {/* Mobile Sheet for question navigator */}
            <Button 
              variant="outline" 
              size="sm" 
              className="lg:hidden h-8 px-2.5"
              onClick={() => setShowSheet(true)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <Sheet open={showSheet} onOpenChange={setShowSheet}>
              <SheetContent side="right" className="w-[320px]">
                <SheetHeader>
                  <SheetTitle className="text-sm">Bảng câu hỏi</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <QuestionNavigator
                    groups={groups}
                    onSelectGroup={(idx, qId) => {
                      setActiveGroupIndex(idx)
                      setShowSheet(false)
                      setTimeout(() => {
                        const el = document.getElementById(`question-card-${qId}`)
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "center" })
                        } else {
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      }, 50)
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Submit / Finish Button */}
            {!isSubmitted ? (
              <>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
                  onClick={() => setShowSubmitModal(true)}
                >
                  Nộp bài
                </Button>
                <Dialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Xác nhận nộp bài?</DialogTitle>
                      <DialogDescription className="space-y-2 pt-2">
                        <p>Bạn đã hoàn thành <strong>{answeredCount} / {totalQuestions}</strong> câu hỏi.</p>
                        {unansweredCount > 0 && (
                          <p className="text-amber-600 dark:text-amber-400 font-medium">
                            ⚠️ Vẫn còn {unansweredCount} câu hỏi bạn chưa chọn đáp án.
                          </p>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button variant="outline" onClick={() => setShowSubmitModal(false)}>
                        Làm tiếp
                      </Button>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          submitExam(groups)
                          setShowSubmitModal(false)
                        }}
                      >
                        Xác nhận nộp & Chấm điểm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={retakeExam}
                  className="text-xs h-8 gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Làm lại
                </Button>
                <Button
                  size="sm"
                  onClick={() => setReviewMode(!isReviewMode)}
                  className={`text-xs h-8 gap-1 ${isReviewMode ? "bg-slate-800 text-white" : "bg-emerald-600 text-white"}`}
                >
                  {isReviewMode ? "Ẩn đáp án" : "Xem đáp án"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace: 2 Columns */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Audio Player & Transcript */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-20 space-y-4">
            {/* Audio Component */}
            <AudioPlayer
              src={currentGroup.audioUrl}
              title={`Part ${currentGroup.part} - Đoạn ${currentGroup.groupId}`}
            />

            {/* Graphic Image if group has one */}
            {currentGroup.imageUrl && (
              <div className="rounded-xl border bg-card text-card-foreground p-3.5 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <ImageIcon className="w-4 h-4 text-amber-500" />
                    <span>Hình ảnh minh họa (Graphic)</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-300">
                    Look at the graphic
                  </Badge>
                </div>
                <div className="rounded-lg overflow-hidden border bg-white dark:bg-slate-900 p-2 flex items-center justify-center">
                  <img
                    src={currentGroup.imageUrl}
                    alt={`Graphic for group ${currentGroup.groupId}`}
                    className="max-h-[260px] w-auto object-contain rounded-sm"
                  />
                </div>
              </div>
            )}

            {/* Transcript Card */}
            <div className="rounded-xl border bg-card text-card-foreground p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Transcript & Lời thoại</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs gap-1"
                    onClick={() => setShowTranscript(!showTranscript)}
                  >
                    {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showTranscript ? "Ẩn" : "Hiện"}
                  </Button>
                  {showTranscript && (
                    <Button
                      variant={showTranslation ? "secondary" : "ghost"}
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => setShowTranslation(!showTranslation)}
                    >
                      Dịch nghĩa
                    </Button>
                  )}
                </div>
              </div>

              {showTranscript ? (
                <div className="space-y-3 text-xs leading-relaxed max-h-[360px] overflow-y-auto pr-1">
                  <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border font-sans">
                    {renderDialogue(currentGroup.transcriptEn)}
                  </div>

                  {showTranslation && currentGroup.transcriptVi && (
                    <div className="p-3.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                      <div className="font-semibold text-[11px] mb-2 text-amber-700 dark:text-amber-400">
                        Bản dịch tiếng Việt:
                      </div>
                      {renderDialogue(currentGroup.transcriptVi)}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 rounded-lg bg-slate-50 dark:bg-slate-900 border text-center text-xs text-muted-foreground space-y-1">
                  <p>Lời thoại đang được ẩn để bạn tập trung luyện nghe.</p>
                  <p className="text-[11px] opacity-75">Bấm "Hiện" ở góc trên nếu bạn muốn đọc theo hoặc chữa đề.</p>
                </div>
              )}
            </div>

            {/* Quick Practice Tip */}
            <div className="p-3.5 rounded-xl border bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <p className="leading-relaxed">
                <strong>Mẹo luyện Part 3-4:</strong> Hãy đọc lướt 3 câu hỏi trước khi bấm chạy Audio để nắm trước từ khóa cần bắt thông tin.
              </p>
            </div>
          </div>
        </div>

        {/* Center / Right Column: Questions & Options */}
        <div className="lg:col-span-4 space-y-5">
          {currentGroup.questions.map((q) => {
            const userChoice = answers[q.id]
            const isFlag = !!flagged[q.id]
            const isCorrect = userChoice === q.correctAnswer

            return (
              <div 
                key={q.id}
                id={`question-card-${q.id}`}
                className="rounded-xl border bg-card text-card-foreground p-5 shadow-xs space-y-4 transition-all scroll-mt-24"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center justify-center shrink-0">
                        {q.id}
                      </span>
                      <h4 className="text-sm font-semibold text-foreground">
                        {q.question}
                      </h4>
                    </div>
                    {isReviewMode && q.questionVi && (
                      <p className="text-xs text-muted-foreground pl-8 italic">
                        {q.questionVi}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFlag(q.id)}
                    className={`h-8 w-8 p-0 rounded-full shrink-0 ${
                      isFlag ? "text-amber-500 bg-amber-50 dark:bg-amber-950" : "text-muted-foreground"
                    }`}
                    title="Cắm cờ câu này để xem lại"
                  >
                    <Flag className={`w-4 h-4 ${isFlag ? "fill-current" : ""}`} />
                  </Button>
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = userChoice === opt.key
                    const isCorrectOpt = opt.key === q.correctAnswer

                    let optStyle = "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-card"
                    if (isReviewMode && isSubmitted) {
                      if (isCorrectOpt) {
                        optStyle = "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 font-medium ring-1 ring-emerald-500/30"
                      } else if (isSelected && !isCorrectOpt) {
                        optStyle = "border-red-400 bg-red-50/60 dark:bg-red-950/30 text-red-900 dark:text-red-100 line-through opacity-80"
                      }
                    } else {
                      if (isSelected) {
                        optStyle = "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-medium ring-1 ring-blue-500/40"
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => !isSubmitted && setAnswer(q.id, opt.key)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-all ${optStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 ${
                            isSelected ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"
                          }`}>
                            {opt.key}
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </div>

                        {isReviewMode && isCorrectOpt && (
                          <Badge className="bg-emerald-600 text-white text-[10px] h-4 px-1.5 shrink-0 ml-2">
                            Đáp án đúng
                          </Badge>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Review status bar */}
                {isReviewMode && isSubmitted && (
                  <div className={`p-2.5 rounded-lg text-xs flex items-center justify-between ${
                    isCorrect ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300" : "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300"
                  }`}>
                    <span className="font-semibold flex items-center gap-1.5">
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : "✗"}
                      {isCorrect ? "Bạn đã trả lời đúng!" : `Bạn chọn (${userChoice || "Chưa chọn"}) - Đáp án đúng là (${q.correctAnswer})`}
                    </span>
                  </div>
                )}
              </div>
            )
          })}

          {/* Pagination Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={activeGroupIndex === 0}
              className="text-xs gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Đoạn trước
            </Button>
            <span className="text-xs text-muted-foreground">
              Đoạn {activeGroupIndex + 1} / {groups.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={activeGroupIndex === groups.length - 1}
              className="text-xs gap-1"
            >
              Đoạn tiếp <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Rightmost Column: Persistent Question Palette on Desktop */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20 rounded-xl border bg-card p-4 shadow-xs">
            <QuestionNavigator
              groups={groups}
              onSelectGroup={(idx, qId) => {
                setActiveGroupIndex(idx)
                setTimeout(() => {
                  const el = document.getElementById(`question-card-${qId}`)
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" })
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                }, 50)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
