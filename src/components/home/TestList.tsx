import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Headphones,
  BookOpen,
  Calendar,
  Layers
} from "lucide-react"

interface TestListProps {
  onSelectTest: (testId: string) => void
  userScore?: number
}

const ETS_TESTS = [
  {
    id: "test-1",
    testNumber: 1,
    title: "ETS 2026 - Test 01",
    subtitle: "Đề thi chuẩn hóa ETS mới nhất",
    totalQuestions: 200,
    listeningQuestions: 100,
    readingQuestions: 100,
    audioTracks: 54,
    hasDetailKey: true,
    hasTranscript: true,
    isReady: true,
    difficulty: "Tiêu chuẩn (Khuyên dùng khởi đầu)",
    badgeText: "Sẵn sàng 100%"
  },
  {
    id: "test-2",
    testNumber: 2,
    title: "ETS 2026 - Test 02",
    subtitle: "Đề thi chuẩn hóa ETS mới nhất",
    totalQuestions: 200,
    listeningQuestions: 100,
    readingQuestions: 100,
    audioTracks: 54,
    hasDetailKey: true,
    hasTranscript: true,
    isReady: false,
    difficulty: "Tiêu chuẩn",
    badgeText: "Sắp mở"
  },
  {
    id: "test-3",
    testNumber: 3,
    title: "ETS 2026 - Test 03",
    subtitle: "Đề thi chuẩn hóa ETS mới nhất",
    totalQuestions: 200,
    listeningQuestions: 100,
    readingQuestions: 100,
    audioTracks: 54,
    hasDetailKey: true,
    hasTranscript: true,
    isReady: false,
    difficulty: "Trung bình",
    badgeText: "Sắp mở"
  },
  {
    id: "test-4",
    testNumber: 4,
    title: "ETS 2026 - Test 04",
    subtitle: "Đề thi chuẩn hóa ETS mới nhất",
    totalQuestions: 200,
    listeningQuestions: 100,
    readingQuestions: 100,
    audioTracks: 54,
    hasDetailKey: true,
    hasTranscript: true,
    isReady: false,
    difficulty: "Trung bình",
    badgeText: "Sắp mở"
  },
  {
    id: "test-5",
    testNumber: 5,
    title: "ETS 2026 - Test 05",
    subtitle: "Đề thi chuẩn hóa ETS mới nhất",
    totalQuestions: 200,
    listeningQuestions: 100,
    readingQuestions: 100,
    audioTracks: 54,
    hasDetailKey: true,
    hasTranscript: true,
    isReady: false,
    difficulty: "Trung bình khá",
    badgeText: "Sắp mở"
  },
  {
    id: "test-6",
    testNumber: 6,
    title: "ETS 2026 - Test 06",
    subtitle: "Đề thi chuẩn hóa ETS mới nhất",
    totalQuestions: 200,
    listeningQuestions: 100,
    readingQuestions: 100,
    audioTracks: 54,
    hasDetailKey: true,
    hasTranscript: true,
    isReady: false,
    difficulty: "Trung bình khá",
    badgeText: "Sắp mở"
  },
  {
    id: "test-7",
    testNumber: 7,
    title: "ETS 2026 - Test 07",
    subtitle: "Đề thi chuẩn hóa ETS mới nhất",
    totalQuestions: 200,
    listeningQuestions: 100,
    readingQuestions: 100,
    audioTracks: 54,
    hasDetailKey: true,
    hasTranscript: true,
    isReady: false,
    difficulty: "Nâng cao",
    badgeText: "Sắp mở"
  },
  {
    id: "test-8",
    testNumber: 8,
    title: "ETS 2026 - Test 08",
    subtitle: "Đề thi chuẩn hóa ETS mới nhất",
    totalQuestions: 200,
    listeningQuestions: 100,
    readingQuestions: 100,
    audioTracks: 54,
    hasDetailKey: true,
    hasTranscript: true,
    isReady: false,
    difficulty: "Nâng cao",
    badgeText: "Sắp mở"
  },
  {
    id: "test-9",
    testNumber: 9,
    title: "ETS 2026 - Test 09",
    subtitle: "Đề thi chuẩn hóa ETS mới nhất",
    totalQuestions: 200,
    listeningQuestions: 100,
    readingQuestions: 100,
    audioTracks: 54,
    hasDetailKey: true,
    hasTranscript: true,
    isReady: false,
    difficulty: "Nâng cao",
    badgeText: "Sắp mở"
  },
  {
    id: "test-10",
    testNumber: 10,
    title: "ETS 2026 - Test 10",
    subtitle: "Đề thi chuẩn hóa ETS mới nhất",
    totalQuestions: 200,
    listeningQuestions: 100,
    readingQuestions: 100,
    audioTracks: 54,
    hasDetailKey: true,
    hasTranscript: true,
    isReady: false,
    difficulty: "Thử thách 900+",
    badgeText: "Sắp mở"
  }
]

export function TestList({ onSelectTest }: TestListProps) {
  return (
    <div className="space-y-8">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Thư viện trọn bộ đề thi TOEIC ETS 2026
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Chọn đề thi để bắt đầu
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Chọn một bài Test trong danh sách 10 đề thi chuẩn format ETS 2026 dưới đây. Sau khi chọn Test, bạn có thể lựa chọn làm <strong>Full Test</strong> hoặc tập trung luyện <strong>từng Part riêng biệt</strong>.
          </p>
        </div>

        <div className="absolute right-6 -bottom-6 opacity-15 hidden md:block">
          <Award className="w-64 h-64" />
        </div>
      </div>

      {/* Test Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Danh sách 10 đề thi ETS 2026</h3>
            <p className="text-sm text-muted-foreground">Nhấp vào đề bạn muốn luyện để chọn chế độ làm bài</p>
          </div>
          <Badge variant="outline" className="gap-1.5 py-1 px-3 text-xs">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> 10 Full Tests
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ETS_TESTS.map((test) => {
            return (
              <Card
                key={test.id}
                onClick={() => test.isReady && onSelectTest(test.id)}
                className={`relative flex flex-col justify-between transition-all duration-200 border ${
                  test.isReady 
                    ? "cursor-pointer hover:shadow-lg hover:border-blue-500 ring-1 ring-blue-500/20 bg-card" 
                    : "opacity-60 bg-slate-50/50 dark:bg-slate-900/50 cursor-not-allowed"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <Badge 
                      className={test.isReady 
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1" 
                        : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs"
                      }
                    >
                      {test.isReady ? <CheckCircle2 className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      {test.badgeText}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">
                      #{test.testNumber.toString().padStart(2, '0')}
                    </span>
                  </div>

                  <CardTitle className="text-xl font-bold">
                    {test.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {test.subtitle} • {test.difficulty}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-xs space-y-3 pb-4">
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Headphones className="w-3.5 h-3.5 text-blue-600" />
                      <span>{test.listeningQuestions} câu LC</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{test.readingQuestions} câu RC</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-600" />
                      <span>120 phút</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Lời giải chi tiết</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 border-t flex items-center justify-between py-3 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-xl">
                  <span className="text-xs font-medium text-muted-foreground">
                    {test.isReady ? "Chọn để xem các Part" : "Sắp ra mắt"}
                  </span>
                  <Button
                    size="sm"
                    disabled={!test.isReady}
                    className={`text-xs h-8 gap-1.5 ${
                      test.isReady ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xs" : ""
                    }`}
                  >
                    {test.isReady ? (
                      <>Vào Test 1 <ArrowRight className="w-3.5 h-3.5" /></>
                    ) : (
                      "Chưa mở"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
