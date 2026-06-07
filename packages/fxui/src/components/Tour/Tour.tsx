import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface TourStep {
  target?: string;
  title: string;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TourProps {
  steps: TourStep[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onComplete?: () => void;
  showProgress?: boolean;
  showSkip?: boolean;
  spotlightPadding?: number;
}

// ─── Context ───────────────────────────────────────────────────────────────

interface TourContextValue {
  start: () => void;
  stop: () => void;
  isOpen: boolean;
}
const TourContext = React.createContext<TourContextValue>({ start: () => {}, stop: () => {}, isOpen: false });
export function useTour() { return React.useContext(TourContext); }

export interface TourProviderProps { children: React.ReactNode }
export function TourProvider({ children }: TourProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <TourContext.Provider value={{ start: () => setIsOpen(true), stop: () => setIsOpen(false), isOpen }}>
      {children}
    </TourContext.Provider>
  );
}

// ─── Rect helper ───────────────────────────────────────────────────────────

interface Rect { top: number; left: number; width: number; height: number }
const ZERO: Rect = { top: 0, left: 0, width: 0, height: 0 };

function getTooltipStyle(rect: Rect, placement: TourStep['placement'], pad: number): React.CSSProperties {
  const TOOLTIP_W = 320;
  const TOOLTIP_H = 160; // approximate
  const GAP = 12;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top = 0, left = 0;
  const p = placement ?? autoPlace(rect, vh);

  if (p === 'bottom') { top = rect.top + rect.height + pad + GAP; left = rect.left + rect.width / 2 - TOOLTIP_W / 2; }
  else if (p === 'top') { top = rect.top - pad - TOOLTIP_H - GAP; left = rect.left + rect.width / 2 - TOOLTIP_W / 2; }
  else if (p === 'right') { top = rect.top + rect.height / 2 - TOOLTIP_H / 2; left = rect.left + rect.width + pad + GAP; }
  else { top = rect.top + rect.height / 2 - TOOLTIP_H / 2; left = rect.left - TOOLTIP_W - pad - GAP; }

  // clamp to viewport
  left = Math.max(12, Math.min(left, vw - TOOLTIP_W - 12));
  top = Math.max(12, Math.min(top, vh - TOOLTIP_H - 12));

  return { position: 'fixed', top, left, width: TOOLTIP_W, zIndex: 9999 };
}

function autoPlace(rect: Rect, vh: number): TourStep['placement'] {
  return rect.top + rect.height / 2 > vh / 2 ? 'top' : 'bottom';
}

// ─── Tour Component ────────────────────────────────────────────────────────

export function Tour({
  steps,
  open: controlledOpen,
  onOpenChange,
  onComplete,
  showProgress = true,
  showSkip = true,
  spotlightPadding = 8,
}: TourProps) {
  const ctx = React.useContext(TourContext);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen! : ctx.isOpen;
  const setOpen = isControlled ? (onOpenChange ?? (() => {})) : ctx.stop;

  const [step, setStep] = React.useState(0);
  const [rect, setRect] = React.useState<Rect | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => { setMounted(true); }, []);

  const current = steps[step];

  React.useEffect(() => {
    if (!open) { setStep(0); return; }
    if (!current?.target) { setRect(null); return; }

    const update = () => {
      const el = document.querySelector(current.target!);
      if (!el) { setRect(null); return; }
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };

    const timer = setTimeout(update, 80);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => { clearTimeout(timer); window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true); };
  }, [open, step, current?.target]);

  const close = () => { setOpen(false); };
  const finish = () => { close(); onComplete?.(); };
  const goNext = () => { if (step < steps.length - 1) setStep((s) => s + 1); else finish(); };
  const goPrev = () => { if (step > 0) setStep((s) => s - 1); };

  if (!open || !mounted || !current) return null;

  const pad = spotlightPadding;
  const spotlightRect = rect
    ? { top: rect.top - pad, left: rect.left - pad, width: rect.width + pad * 2, height: rect.height + pad * 2 }
    : null;

  const tooltipStyle = rect
    ? getTooltipStyle(rect, current.placement, pad)
    : { position: 'fixed' as const, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 360, zIndex: 9999 };

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[9997] bg-fx-black/50"
        onClick={close}
        aria-hidden="true"
      />

      {/* Spotlight cutout */}
      {spotlightRect && (
        <div
          aria-hidden="true"
          className="fixed z-[9998] rounded-[4px] pointer-events-none"
          style={{
            top: spotlightRect.top,
            left: spotlightRect.left,
            width: spotlightRect.width,
            height: spotlightRect.height,
            boxShadow: '0 0 0 9999px rgba(0,0,0,0)',
            outline: '2px solid #FFE500',
            outlineOffset: 2,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={current.title}
        style={tooltipStyle}
        className={cn(
          'border-2 border-fx-black bg-fx-white shadow-fx-xl rounded-[4px]',
          'animate-in fade-in-0 zoom-in-95 duration-150',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h3 className="font-display text-lg font-black text-fx-black">{current.title}</h3>
          <button
            type="button"
            onClick={close}
            aria-label="Close tour"
            className="h-6 w-6 flex items-center justify-center text-gray-400 hover:text-fx-black transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-4 text-sm text-gray-600 font-sans leading-relaxed">{current.content}</div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-4 py-3 border-t-2 border-fx-black/10">
          {showProgress && (
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans mr-auto">
              {step + 1} / {steps.length}
            </span>
          )}
          {!showProgress && <div className="flex-1" />}

          {showSkip && step < steps.length - 1 && (
            <button
              type="button"
              onClick={close}
              className="px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-fx-black transition-colors font-sans"
            >
              Skip
            </button>
          )}

          {step > 0 && (
            <button
              type="button"
              onClick={goPrev}
              className={cn(
                'px-3 py-1.5 text-xs font-black font-sans rounded-[4px]',
                'border-2 border-fx-black bg-fx-white shadow-fx-sm',
                'hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150',
              )}
            >
              ← Back
            </button>
          )}

          <button
            type="button"
            onClick={goNext}
            className={cn(
              'px-4 py-1.5 text-xs font-black font-sans rounded-[4px]',
              'border-2 border-fx-black bg-fx-black text-fx-white shadow-fx-sm',
              'hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150',
            )}
          >
            {step === steps.length - 1 ? 'Finish ✓' : 'Next →'}
          </button>
        </div>

        {/* Progress dots */}
        {steps.length > 1 && (
          <div className="flex justify-center gap-1.5 pb-3">
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                aria-label={`Go to step ${i + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-200',
                  i === step ? 'w-4 bg-fx-black' : 'w-1.5 bg-gray-200 hover:bg-gray-400',
                )}
              />
            ))}
          </div>
        )}
      </div>
    </>,
    document.body
  );
}

Tour.displayName = 'Tour';
export default Tour;
