import React from 'react';
import { cn } from '../../utils/cn';

export interface ReadMoreProps {
  children: string;
  maxChars?: number;
  maxLines?: number;
  moreLabel?: string;
  lessLabel?: string;
  className?: string;
}

const ReadMore = React.forwardRef<HTMLDivElement, ReadMoreProps>(
  (
    {
      children,
      maxChars,
      maxLines,
      moreLabel = 'Read more',
      lessLabel = 'Show less',
      className,
    },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(false);
    const textRef = React.useRef<HTMLSpanElement>(null);

    const isCharTruncated = maxChars !== undefined && children.length > maxChars;
    const isTruncated = isCharTruncated;
    const needsToggle = isTruncated;

    const displayText =
      !expanded && isCharTruncated
        ? children.slice(0, maxChars) + '…'
        : children;

    return (
      <div ref={ref} className={cn('font-sans', className)}>
        <span ref={textRef}>{displayText}</span>
        {needsToggle && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="ml-1 text-fx-blue font-bold text-sm hover:underline focus:outline-none focus:underline"
            aria-expanded={expanded}
          >
            {expanded ? lessLabel : moreLabel}
          </button>
        )}
      </div>
    );
  }
);

ReadMore.displayName = 'ReadMore';
export { ReadMore };
export default ReadMore;
