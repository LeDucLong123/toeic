import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, RotateCw, Volume2, Gauge } from "lucide-react"

interface AudioPlayerProps {
  src: string
  title?: string
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1.0)

  useEffect(() => {
    setIsPlaying(false)
    setCurrentTime(0)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
    }
  }, [src])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  const skipSeconds = (seconds: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds))
  }

  const cycleSpeed = () => {
    const speeds = [1.0, 1.1, 1.2, 0.9]
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length
    const nextSpeed = speeds[nextIdx]
    setPlaybackRate(nextSpeed)
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed
    }
  }

  const handleSliderChange = (vals: number | readonly number[]) => {
    if (!audioRef.current) return
    const target = Array.isArray(vals) ? vals[0] : (vals as number)
    audioRef.current.currentTime = target
    setCurrentTime(target)
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? "0" : ""}${s}`
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground p-4 shadow-sm space-y-3">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold truncate max-w-[200px] sm:max-w-[260px]">
              {title || "Audio Track"}
            </h4>
            <span className="text-xs text-muted-foreground font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Speed button */}
        <Button
          variant="outline"
          size="sm"
          onClick={cycleSpeed}
          className="h-8 px-2.5 text-xs font-mono gap-1"
          title="Tốc độ phát (Click để đổi 1.0x / 1.1x / 1.2x / 0.9x)"
        >
          <Gauge className="w-3.5 h-3.5 text-muted-foreground" />
          {playbackRate}x
        </Button>
      </div>

      {/* Progress Slider */}
      <div className="py-1">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.5}
          onValueChange={handleSliderChange}
          className="cursor-pointer"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 pt-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => skipSeconds(-5)}
          className="h-9 w-9 p-0 rounded-full"
          title="Tua lại 5 giây"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button
          onClick={togglePlay}
          size="sm"
          className="h-10 w-10 p-0 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
          title={isPlaying ? "Tạm dừng (Space)" : "Phát Audio (Space)"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => skipSeconds(5)}
          className="h-9 w-9 p-0 rounded-full"
          title="Tua tới 5 giây"
        >
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
