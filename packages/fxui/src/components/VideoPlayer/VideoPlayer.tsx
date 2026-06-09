import React from 'react';
import { cn } from '../../utils/cn';

function formatTime(s: number): string {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  caption?: string;
}

const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(
  ({ src, poster, autoPlay = false, loop = false, muted = false, caption, className, ...props }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(muted ? 0 : 1);
    const [isMuted, setIsMuted] = React.useState(muted);
    const [showControls, setShowControls] = React.useState(true);
    const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const togglePlay = () => {
      const v = videoRef.current;
      if (!v) return;
      if (v.paused) { v.play(); setPlaying(true); }
      else { v.pause(); setPlaying(false); }
    };

    const toggleMute = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = !v.muted;
      setIsMuted(v.muted);
      if (!v.muted && volume === 0) { v.volume = 0.5; setVolume(0.5); }
    };

    const handleVolumeChange = (val: number) => {
      const v = videoRef.current;
      if (!v) return;
      v.volume = val;
      setVolume(val);
      v.muted = val === 0;
      setIsMuted(val === 0);
    };

    const handleSeek = (val: number) => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = val;
      setCurrentTime(val);
    };

    const resetHideTimer = () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setShowControls(true);
      if (playing) {
        hideTimer.current = setTimeout(() => setShowControls(false), 2500);
      }
    };

    React.useEffect(() => {
      const v = videoRef.current;
      if (!v) return;
      const onTime = () => setCurrentTime(v.currentTime);
      const onMeta = () => setDuration(v.duration);
      const onEnded = () => setPlaying(false);
      v.addEventListener('timeupdate', onTime);
      v.addEventListener('loadedmetadata', onMeta);
      v.addEventListener('ended', onEnded);
      return () => { v.removeEventListener('timeupdate', onTime); v.removeEventListener('loadedmetadata', onMeta); v.removeEventListener('ended', onEnded); };
    }, []);

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
      <figure className={cn('flex flex-col gap-2', className)} ref={ref} {...props}>
        <div
          className={cn(
            'relative overflow-hidden bg-fx-black',
            'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx',
            'group',
          )}
          onMouseMove={resetHideTimer}
          onMouseLeave={() => playing && setShowControls(false)}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            muted={isMuted}
            playsInline
            className="w-full block"
            onClick={togglePlay}
            aria-label={caption ?? 'Video'}
          />

          {/* Big play button overlay */}
          {!playing && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play"
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                'text-fx-white text-5xl',
                'bg-fx-black/20 hover:bg-fx-black/30 transition-colors duration-150',
              )}
            >
              ▶
            </button>
          )}

          {/* Controls bar */}
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 px-3 py-2',
              'bg-gradient-to-t from-fx-black/80 to-transparent',
              'transition-opacity duration-200',
              showControls || !playing ? 'opacity-100' : 'opacity-0',
            )}
          >
            {/* Progress bar */}
            <input
              type="range"
              min={0}
              max={duration || 1}
              step={0.1}
              value={currentTime}
              onChange={(e) => handleSeek(Number(e.target.value))}
              aria-label="Seek"
              className="w-full h-1 accent-fx-yellow cursor-pointer mb-2"
            />

            <div className="flex items-center gap-3">
              {/* Play/pause */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? 'Pause' : 'Play'}
                className="text-fx-white text-sm font-bold w-6 text-center hover:text-fx-yellow transition-colors"
              >
                {playing ? '⏸' : '▶'}
              </button>

              {/* Time */}
              <span className="text-xs font-mono text-fx-white/80">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex-1" />

              {/* Volume */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="text-fx-white text-sm hover:text-fx-yellow transition-colors"
              >
                {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                aria-label="Volume"
                className="w-16 h-1 accent-fx-yellow cursor-pointer"
              />
            </div>
          </div>
        </div>

        {caption && (
          <figcaption className="text-xs text-gray-400 font-sans text-center">{caption}</figcaption>
        )}
      </figure>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export { VideoPlayer };
export default VideoPlayer;
