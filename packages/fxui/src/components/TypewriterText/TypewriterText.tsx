'use client';
import React from 'react';
import { cn } from '../../utils/cn';

export interface TypewriterTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
  onComplete?: () => void;
}

const TypewriterText = React.forwardRef<HTMLSpanElement, TypewriterTextProps>(
  (
    {
      texts,
      speed = 60,
      deleteSpeed = 35,
      pauseMs = 1800,
      loop = true,
      cursor = true,
      cursorChar = '|',
      cursorClassName,
      onComplete,
      className,
      ...props
    },
    ref
  ) => {
    const [displayed, setDisplayed] = React.useState('');
    const [textIdx, setTextIdx] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const [done, setDone] = React.useState(false);

    React.useEffect(() => {
      if (done) return;
      if (isPaused) return;

      const current = texts[textIdx] ?? '';

      if (!isDeleting && displayed === current) {
        // Finished typing — pause then delete (or stop if last & no loop)
        if (!loop && textIdx === texts.length - 1) {
          setDone(true);
          onComplete?.();
          return;
        }
        setIsPaused(true);
        const t = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseMs);
        return () => clearTimeout(t);
      }

      if (isDeleting && displayed === '') {
        setIsDeleting(false);
        setTextIdx((i) => (i + 1) % texts.length);
        return;
      }

      const delay = isDeleting ? deleteSpeed : speed;
      const t = setTimeout(() => {
        setDisplayed((s) =>
          isDeleting ? s.slice(0, -1) : current.slice(0, s.length + 1)
        );
      }, delay);
      return () => clearTimeout(t);
    }, [displayed, isDeleting, isPaused, textIdx, done, texts, speed, deleteSpeed, pauseMs, loop, onComplete]);

    return (
      <span ref={ref} className={cn('inline-flex items-baseline gap-[1px]', className)} {...props}>
        <span>{displayed}</span>
        {cursor && (
          <span
            aria-hidden="true"
            className={cn('animate-fx-cursor leading-none', cursorClassName)}
          >
            {cursorChar}
          </span>
        )}
      </span>
    );
  }
);
TypewriterText.displayName = 'TypewriterText';
export { TypewriterText };
export default TypewriterText;
