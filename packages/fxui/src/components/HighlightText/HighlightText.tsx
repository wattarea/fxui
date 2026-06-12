import React from 'react';
import { cn } from '../../utils/cn';

export interface HighlightTextProps {
  text: string;
  highlight: string | string[];
  caseSensitive?: boolean;
  className?: string;
  highlightClassName?: string;
}

const HighlightText = React.forwardRef<HTMLSpanElement, HighlightTextProps>(
  (
    {
      text,
      highlight,
      caseSensitive = false,
      className,
      highlightClassName,
    },
    ref
  ) => {
    const terms = Array.isArray(highlight) ? highlight : [highlight];
    const filtered = terms.filter(Boolean);

    if (!filtered.length) {
      return <span ref={ref} className={className}>{text}</span>;
    }

    const flags = caseSensitive ? 'g' : 'gi';
    const escaped = filtered.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escaped.join('|')})`, flags);

    const parts = text.split(regex);

    return (
      <span ref={ref} className={className}>
        {parts.map((part, i) => {
          const isMatch = filtered.some((term) =>
            caseSensitive ? part === term : part.toLowerCase() === term.toLowerCase()
          );
          return isMatch ? (
            <mark
              key={i}
              className={cn(
                'bg-fx-yellow text-fx-black px-0.5 rounded-[2px] not-italic',
                highlightClassName,
              )}
            >
              {part}
            </mark>
          ) : (
            part
          );
        })}
      </span>
    );
  }
);

HighlightText.displayName = 'HighlightText';
export { HighlightText };
export default HighlightText;
