import { useExamStore } from "@/stores/useExamStore"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RotateCcw, BookOpen, Headphones, ArrowRight, ArrowLeft } from "lucide-react"

interface ResultDashboardProps {
  onReview: () => void
  onRetake: () => void
  onHome: () => void
}

export function ResultDashboard({ onReview, onRetake, onHome }: ResultDashboardProps) {
  const { score, elapsedSeconds } = useExamStore()

  if (!score) return null

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m} phút ${s} giây`
  }

  // Estimate TOEIC score for listening based on accuracy
  const estListeningScore = Math.min(495, Math.max(5, Math.round((score.percentage / 100) * 495 / 5) * 5))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-lg border">
        <CardHeader className="text-center pb-4 border-b">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-3 shadow-md shadow-amber-500/10">
            <Trophy className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Hoàn thành bài luyện thi!
          </CardTitle>
          <CardDescription>
            ETS 2026 Test 1 - Thời gian làm: {formatTime(elapsedSeconds)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Main Score Card */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 space-y-1">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Số câu đúng
              </span>
              <div className="text-3xl font-black text-blue-700 dark:text-blue-300">
                {score.correct} <span className="text-base font-normal text-muted-foreground">/ {score.total}</span>
              </div>
              <Badge variant="outline" className="text-xs bg-white dark:bg-slate-900">
                Độ chính xác: {score.percentage}%
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 space-y-1">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Điểm Listening ước tính
              </span>
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300">
                {estListeningScore} <span className="text-base font-normal text-muted-foreground">/ 495</span>
              </div>
              <Badge variant="outline" className="text-xs bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300">
                Thang điểm ETS 990
              </Badge>
            </div>
          </div>

          {/* Detailed Part Breakdown */}
          <div className="space-y-4 rounded-xl border p-4 bg-card">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Headphones className="w-4 h-4 text-blue-600" /> Phân tích chi tiết từng phần
            </h4>

            {/* Part 3 */}
            {score.part3Total > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Part 3: Đoạn hội thoại</span>
                  <span className="font-semibold text-muted-foreground">
                    {score.part3Correct} / {score.part3Total} câu ({Math.round((score.part3Correct / score.part3Total) * 100)}%)
                  </span>
                </div>
                <Progress value={(score.part3Correct / score.part3Total) * 100} className="h-2" />
              </div>
            )}

            {/* Part 4 */}
            {score.part4Total > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Part 4: Bài độc thoại ngắn</span>
                  <span className="font-semibold text-muted-foreground">
                    {score.part4Correct} / {score.part4Total} câu ({Math.round((score.part4Correct / score.part4Total) * 100)}%)
                  </span>
                </div>
                <Progress value={(score.part4Correct / score.part4Total) * 100} className="h-2" />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 shadow-md"
              onClick={onReview}
            >
              <BookOpen className="w-4 h-4" /> Chữa đề & Xem Transcript <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              className="gap-2"
              onClick={onRetake}
            >
              <RotateCcw className="w-4 h-4" /> Làm lại bài
            </Button>
            <Button 
              variant="ghost"
              className="gap-2"
              onClick={onHome}
            >
              <ArrowLeft className="w-4 h-4" /> Trang chủ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
