'use client';
import React from 'react';
import { cn } from '../../utils/cn';

type GlitchIntensity = 'low' | 'medium' | 'high';
type GlitchColor = 'pink' | 'yellow' | 'green' | 'blue' | 'purple';
type GlitchAs = 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';

export interface GlitchTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: GlitchAs;
  intensity?: GlitchIntensity;
  color?: GlitchColor;
  paused?: boolean;
  triggerOnHover?: boolean;
}

const COLORS: Record<GlitchColor, [string, string]> = {
  pink:   ['#FF2D78', '#00FF94'],
  yellow: ['#FFE500', '#FF2D78'],
  green:  ['#00FF94', '#0066FF'],
  blue:   ['#0066FF', '#FF2D78'],
  purple: ['#7C3AED', '#FFE500'],
};

const DURATION: Record<GlitchIntensity, [string, string]> = {
  low:    ['3s', '4.5s'],
  medium: ['1.5s', '2s'],
  high:   ['0.6s', '0.9s'],
};

let counter = 0;
function getGlitchId() {
  return `fx-glitch-${++counter}`;
}

const GlitchText = React.forwardRef<HTMLElement, GlitchTextProps>(
  (
    {
      text,
      as: Tag = 'span',
      intensity = 'medium',
      color = 'pink',
      paused = false,
      triggerOnHover = false,
      className,
      ...props
    },
    ref
  ) => {
    const id = React.useRef(getGlitchId()).current;
    const [hovered, setHovered] = React.useState(false);

    const [c1, c2] = COLORS[color];
    const [d1, d2] = DURATION[intensity];
    const isPaused = paused || (triggerOnHover && !hovered);

    const css = `
      #${id} { position: relative; display: inline-block; }
      #${id}::before,
      #${id}::after {
        content: attr(data-text);
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        font: inherit;
        overflow: hidden;
        pointer-events: none;
      }
      #${id}::before {
        color: ${c1};
        animation: fxg1-${id} ${d1} steps(1) infinite;
        animation-play-state: ${isPaused ? 'paused' : 'running'};
        left: -2px;
      }
      #${id}::after {
        color: ${c2};
        animation: fxg2-${id} ${d2} steps(1) infinite;
        animation-play-state: ${isPaused ? 'paused' : 'running'};
        left: 2px;
      }
      @keyframes fxg1-${id} {
        0%   { clip-path: inset(0 0 95% 0); transform: translate(-2px, 0); opacity: 0.9; }
        10%  { clip-path: inset(30% 0 50% 0); }
        20%  { clip-path: inset(70% 0 15% 0); transform: translate(2px, 0); }
        30%  { clip-path: inset(10% 0 75% 0); transform: translate(-1px, 0); }
        40%  { clip-path: inset(55% 0 30% 0); transform: translate(3px, 0); }
        50%  { clip-path: inset(85% 0 5% 0);  transform: translate(-2px, 0); }
        60%  { clip-path: inset(20% 0 65% 0); transform: translate(1px, 0); opacity: 0.7; }
        70%  { clip-path: inset(45% 0 40% 0); transform: translate(-3px, 0); }
        80%  { clip-path: inset(0 0 90% 0);   transform: translate(2px, 0); }
        90%  { clip-path: inset(60% 0 25% 0); transform: translate(-1px, 0); opacity: 0; }
        100% { clip-path: inset(0 0 95% 0);   transform: translate(-2px, 0); opacity: 0; }
      }
      @keyframes fxg2-${id} {
        0%   { clip-path: inset(50% 0 35% 0); transform: translate(2px, 0); opacity: 0.8; }
        15%  { clip-path: inset(80% 0 8% 0);  transform: translate(-3px, 0); }
        30%  { clip-path: inset(5% 0 88% 0);  transform: translate(1px, 0); opacity: 0; }
        45%  { clip-path: inset(65% 0 20% 0); transform: translate(-2px, 0); opacity: 0.9; }
        60%  { clip-path: inset(25% 0 60% 0); transform: translate(3px, 0); }
        75%  { clip-path: inset(90% 0 2% 0);  transform: translate(-1px, 0); opacity: 0.6; }
        90%  { clip-path: inset(40% 0 45% 0); transform: translate(2px, 0); }
        100% { clip-path: inset(50% 0 35% 0); transform: translate(2px, 0); opacity: 0; }
      }
    `;

    const element = React.createElement(
      Tag,
      {
        id,
        ref,
        'data-text': text,
        className: cn('select-none', className),
        onMouseEnter: triggerOnHover ? () => setHovered(true) : undefined,
        onMouseLeave: triggerOnHover ? () => setHovered(false) : undefined,
        ...props,
      },
      text
    );

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        {element}
      </>
    );
  }
);
GlitchText.displayName = 'GlitchText';
export { GlitchText };
export default GlitchText;
