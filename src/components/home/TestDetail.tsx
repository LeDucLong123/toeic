import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Play, 
  Headphones, 
  BookOpen, 
  Clock, 
  Flame, 
  Sparkles,
  Volume2,
  CheckCircle2,
  Award
} from "lucide-react"

interface TestDetailProps {
  testId: string
  onBackToTestList: () => void
  onStartPractice: (partId: number | null) => void
}

interface PartInfo {
  id: number
  name: string
  vietnameseName: string
  type: "Listening" | "Reading"
  questions: string
  totalQuestions: number
  description: string
  recommendedTime: string
  tag?: string
  isAvailable: boolean
}

const PARTS_DATA: PartInfo[] = [
  {
    id: 1,
    name: "Part 1",
    vietnameseName: "Mô tả tranh",
    type: "Listening",
    questions: "Câu 1 - 6",
    totalQuestions: 6,
    description: "Nghe 4 câu mô tả bức ảnh và chọn đáp án chính xác nhất.",
    recommendedTime: "3 phút",
    isAvailable: false
  },
  {
    id: 2,
    name: "Part 2",
    vietnameseName: "Hỏi & Đáp",
    type: "Listening",
    questions: "Câu 7 - 31",
    totalQuestions: 25,
    description: "Nghe 1 câu hỏi/nói và chọn 1 trong 3 câu hồi đáp phù hợp nhất.",
    recommendedTime: "10 phút",
    isAvailable: false
  },
  {
    id: 3,
    name: "Part 3",
    vietnameseName: "Đoạn hội thoại",
    type: "Listening",
    questions: "Câu 32 - 70",
    totalQuestions: 39,
    description: "13 đoạn hội thoại ngắn giữa 2-3 người, mỗi đoạn 3 câu hỏi kèm đồ họa.",
    recommendedTime: "17 phút",
    tag: "Đang cần luyện",
    isAvailable: true
  },
  {
    id: 4,
    name: "Part 4",
    vietnameseName: "Bài độc thoại ngắn",
    type: "Listening",
    questions: "Câu 71 - 100",
    totalQuestions: 30,
    description: "10 bài nói đơn thoại (thông báo, tin nhắn thoại, tin tức,...) kèm đồ họa.",
    recommendedTime: "15 phút",
    tag: "Đang cần luyện",
    isAvailable: true
  },
  {
    id: 5,
    name: "Part 5",
    vietnameseName: "Điền từ câu đơn",
    type: "Reading",
    questions: "Câu 101 - 130",
    totalQuestions: 30,
    description: "Ngữ pháp và từ vựng câu đơn công sở.",
    recommendedTime: "10 - 12 phút",
    isAvailable: false
  },
  {
    id: 6,
    name: "Part 6",
    vietnameseName: "Điền từ đoạn văn",
    type: "Reading",
    questions: "Câu 131 - 146",
    totalQuestions: 16,
    description: "4 đoạn văn ngắn cần điền từ/cụm từ hoặc cả câu phù hợp.",
    recommendedTime: "8 - 10 phút",
    isAvailable: false
  },
  {
    id: 7,
    name: "Part 7",
    vietnameseName: "Đọc hiểu văn bản",
    type: "Reading",
    questions: "Câu 147 - 200",
    totalQuestions: 54,
    description: "Đọc hiểu đoạn đơn, đoạn kép và đoạn ba (Email, Chat, Bài báo...).",
    recommendedTime: "50 - 55 phút",
    isAvailable: false
  }
]

export function TestDetail({ onBackToTestList, onStartPractice }: TestDetailProps) {
  return (
    <div className="space-y-8">
      {/* Navigation Breadcrumb / Back */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBackToTestList}
          className="gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách đề thi
        </Button>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300">
            <Volume2 className="w-3.5 h-3.5 mr-1" /> 54 Audio tracks
          </Badge>
          <Badge variant="outline" className="text-xs">
            Format ETS 2026
          </Badge>
        </div>
      </div>

      {/* Hero Banner for Test 1 Mode Selection */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> ETS 2026 - Test 01
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Chọn chế độ làm bài cho Test 1
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Bạn có thể làm bài theo chế độ <strong>Full Test</strong> (kết hợp các phần nghe) hoặc chọn luyện <strong>từng Part riêng biệt</strong> bên dưới để mổ xẻ các phần mình đang yếu.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold shadow-md gap-2"
              onClick={() => onStartPractice(null)}
            >
              <Play className="w-4 h-4 fill-current" /> Làm Full Listening (Part 3 & 4 - 69 câu)
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 gap-2"
              onClick={() => onStartPractice(3)}
            >
              <Headphones className="w-4 h-4" /> Luyện nhanh Part 3 (39 câu)
            </Button>
          </div>
        </div>

        <div className="absolute right-6 -bottom-6 opacity-15 hidden md:block">
          <Award className="w-64 h-64" />
        </div>
      </div>

      {/* Practice by Part Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Hoặc chọn làm riêng từng Part</h3>
            <p className="text-sm text-muted-foreground">Tập trung nâng band điểm cho từng dạng câu hỏi</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> ETS 2026 Test 1
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PARTS_DATA.map((part) => {
            const isListening = part.type === "Listening"
            const isTarget = part.tag !== undefined

            return (
              <Card 
                key={part.id} 
                className={`relative flex flex-col justify-between transition-all duration-200 border ${
                  part.isAvailable ? "hover:shadow-md cursor-pointer" : "opacity-60 cursor-not-allowed bg-slate-50/50 dark:bg-slate-900/50"
                } ${
                  isTarget ? "ring-2 ring-blue-500/20 border-blue-300 dark:border-blue-700 bg-blue-50/20 dark:bg-blue-950/20" : "hover:border-slate-300 dark:hover:border-slate-700"
                }`}
                onClick={() => part.isAvailable && onStartPractice(part.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={isListening ? "default" : "secondary"} className="gap-1 text-xs">
                      {isListening ? <Headphones className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                      {part.type}
                    </Badge>
                    {part.tag && (
                      <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs">
                        {part.tag}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>{part.name} - {part.vietnameseName}</span>
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {part.questions} ({part.totalQuestions} câu)
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-xs text-slate-600 dark:text-slate-300 pb-4">
                  <p>{part.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Thời gian gợi ý: {part.recommendedTime}</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 border-t flex items-center justify-between py-3 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-xl">
                  <span className="text-xs font-medium text-muted-foreground">
                    {part.isAvailable ? "Sẵn sàng làm bài" : "Sắp ra mắt"}
                  </span>
                  <Button 
                    size="sm" 
                    variant={isTarget ? "default" : "outline"} 
                    className="text-xs h-8"
                    disabled={!part.isAvailable}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (part.isAvailable) onStartPractice(part.id)
                    }}
                  >
                    {part.isAvailable ? "Luyện ngay" : "Khóa"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl border bg-card shadow-xs space-y-1.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
            <Headphones className="w-4 h-4" />
            <span>54 Audio tracks cắt nhỏ</span>
          </div>
          <p className="text-xs text-muted-foreground">Từng bài nói & hội thoại có audio riêng biệt, tua lại ±5s và chỉnh tốc độ 0.9x - 1.2x.</p>
        </div>

        <div className="p-4 rounded-xl border bg-card shadow-xs space-y-1.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Transcript & Giải thích chi tiết</span>
          </div>
          <p className="text-xs text-muted-foreground">Lời thoại song ngữ tách từng lượt nói và đáp án chuẩn từ PDF giải thích ETS 2026.</p>
        </div>

        <div className="p-4 rounded-xl border bg-card shadow-xs space-y-1.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400">
            <Sparkles className="w-4 h-4" />
            <span>Đầy đủ 5 hình ảnh đồ họa</span>
          </div>
          <p className="text-xs text-muted-foreground">Hình ảnh các câu "Look at the graphic" được trích xuất sắc nét trực tiếp từ đề gốc.</p>
        </div>
      </section>
    </div>
  )
}
