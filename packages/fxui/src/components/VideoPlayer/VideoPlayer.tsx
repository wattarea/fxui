import React from 'react';
import { cn } from '../../utils/cn';

function formatTime(s: number): string {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export type VideoPlayerTheme = 'dark' | 'yellow' | 'pink' | 'green' | 'blue';

const themeAccent: Record<VideoPlayerTheme, string> = {
  dark: 'accent-fx-white',
  yellow: 'accent-fx-yellow',
  pink: 'accent-fx-pink',
  green: 'accent-fx-green',
  blue: 'accent-fx-blue',
};

const themeHighlight: Record<VideoPlayerTheme, string> = {
  dark: 'hover:text-white',
  yellow: 'hover:text-fx-yellow',
  pink: 'hover:text-fx-pink',
  green: 'hover:text-fx-green',
  blue: 'hover:text-[#0066FF]',
};

export interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  caption?: string;
  /** Aspect ratio applied to the video container. */
  ratio?: '16/9' | '4/3' | '9/16' | '1/1' | 'auto';
  /** Colour theme for the control bar accent. */
  theme?: VideoPlayerTheme;
  /** Show a keyboard shortcuts hint in the controls. */
  showShortcuts?: boolean;
}

const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(
  ({
    src,
    poster,
    autoPlay = false,
    loop = false,
    muted = false,
    caption,
    ratio = '16/9',
    theme = 'yellow',
    showShortcuts = false,
    className,
    ...props
  }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(muted ? 0 : 1);
    const [isMuted, setIsMuted] = React.useState(muted);
    const [showControls, setShowControls] = React.useState(true);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [showHints, setShowHints] = React.useState(false);
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

    const skipSeconds = (s: number) => {
      const v = videoRef.current;
      if (!v) return;
      const next = Math.max(0, Math.min(v.duration, v.currentTime + s));
      v.currentTime = next;
      setCurrentTime(next);
    };

    const toggleFullscreen = () => {
      const el = containerRef.current;
      if (!el) return;
      if (!document.fullscreenElement) {
        el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
      } else {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
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
      return () => {
        v.removeEventListener('timeupdate', onTime);
        v.removeEventListener('loadedmetadata', onMeta);
        v.removeEventListener('ended', onEnded);
      };
    }, []);

    // Keyboard shortcuts
    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const handler = (e: KeyboardEvent) => {
        if (!el.contains(document.activeElement) && document.activeElement !== el) return;
        switch (e.key) {
          case ' ':
          case 'k':
            e.preventDefault();
            togglePlay();
            break;
          case 'ArrowRight':
          case 'l':
            e.preventDefault();
            skipSeconds(5);
            break;
          case 'ArrowLeft':
          case 'j':
            e.preventDefault();
            skipSeconds(-5);
            break;
          case 'm':
            e.preventDefault();
            toggleMute();
            break;
          case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
        }
      };
      el.addEventListener('keydown', handler);
      return () => el.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playing, isMuted]);

    const progress = duration ? (currentTime / duration) * 100 : 0;

    const ratioClass = ratio === '16/9' ? 'aspect-video' : ratio === '4/3' ? 'aspect-[4/3]' : ratio === '9/16' ? 'aspect-[9/16]' : ratio === '1/1' ? 'aspect-square' : '';

    return (
      <figure className={cn('flex flex-col gap-2', className)} ref={ref} {...props}>
        <div
          ref={containerRef}
          tabIndex={0}
          className={cn(
            'relative overflow-hidden bg-fx-black',
            'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx',
            'group outline-none focus-visible:ring-2 focus-visible:ring-fx-yellow',
            ratioClass,
          )}
          onMouseMove={resetHideTimer}
          onMouseLeave={() => playing && setShowControls(false)}
          onMouseEnter={() => setShowControls(true)}
          onClick={(e) => { if (e.target === e.currentTarget) togglePlay(); }}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            muted={isMuted}
            playsInline
            className={cn('w-full h-full block', ratioClass ? 'object-contain' : '')}
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
                'bg-fx-black/20 hover:bg-fx-black/30 transition-colors duration-150',
              )}
            >
              <span className="border-2 border-fx-white rounded-[4px] bg-fx-black/60 w-14 h-14 flex items-center justify-center text-white text-xl shadow-fx">▶</span>
            </button>
          )}

          {/* Controls bar */}
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6',
              'bg-gradient-to-t from-fx-black/90 via-fx-black/40 to-transparent',
              'transition-opacity duration-200',
              showControls || !playing ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
          >
            {/* Progress bar */}
            <div className="relative mb-2 group/seek">
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.1}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                aria-label="Seek"
                className={cn('w-full h-1 cursor-pointer rounded-full', themeAccent[theme])}
              />
              {/* Buffered track visual */}
              <div
                className="absolute top-1/2 left-0 h-1 bg-white/20 rounded-full pointer-events-none -translate-y-1/2 z-[-1]"
                style={{ width: '100%' }}
              />
              <div
                className="absolute top-1/2 left-0 h-1 pointer-events-none -translate-y-1/2 z-[-1] rounded-full transition-all bg-white/40"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center gap-2.5">
              {/* Prev 5s */}
              <button type="button" onClick={() => skipSeconds(-5)} aria-label="Rewind 5 seconds"
                className={cn('text-fx-white/80 text-xs font-mono transition-colors', themeHighlight[theme])}>
                ⟨5
              </button>

              {/* Play/pause */}
              <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}
                className={cn('text-fx-white text-sm font-bold w-6 text-center transition-colors', themeHighlight[theme])}>
                {playing ? '⏸' : '▶'}
              </button>

              {/* Next 5s */}
              <button type="button" onClick={() => skipSeconds(5)} aria-label="Skip 5 seconds"
                className={cn('text-fx-white/80 text-xs font-mono transition-colors', themeHighlight[theme])}>
                5⟩
              </button>

              {/* Time */}
              <span className="text-[11px] font-mono text-fx-white/70">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex-1" />

              {/* Keyboard hint */}
              {showShortcuts && (
                <div className="relative">
                  <button type="button" onMouseEnter={() => setShowHints(true)} onMouseLeave={() => setShowHints(false)}
                    className={cn('text-fx-white/60 text-xs transition-colors', themeHighlight[theme])} aria-label="Keyboard shortcuts">
                    ⌨
                  </button>
                  {showHints && (
                    <div className="absolute bottom-7 right-0 bg-fx-black border-2 border-fx-white/20 rounded-[4px] p-2.5 text-[10px] font-mono text-fx-white/80 whitespace-nowrap space-y-1 z-20">
                      <div><span className="text-fx-yellow">Space / K</span> — play/pause</div>
                      <div><span className="text-fx-yellow">← / J</span> — rewind 5s</div>
                      <div><span className="text-fx-yellow">→ / L</span> — skip 5s</div>
                      <div><span className="text-fx-yellow">M</span> — mute</div>
                      <div><span className="text-fx-yellow">F</span> — fullscreen</div>
                    </div>
                  )}
                </div>
              )}

              {/* Mute */}
              <button type="button" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}
                className={cn('text-fx-white text-sm transition-colors', themeHighlight[theme])}>
                {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
              </button>

              {/* Volume slider */}
              <input type="range" min={0} max={1} step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                aria-label="Volume"
                className={cn('w-16 h-1 cursor-pointer', themeAccent[theme])}
              />

              {/* Fullscreen */}
              <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className={cn('text-fx-white/80 text-xs transition-colors', themeHighlight[theme])}>
                {isFullscreen ? '⊠' : '⊡'}
              </button>
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
