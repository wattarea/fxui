import React from 'react';
import { cn } from '../../utils/cn';

type ColorFormat = 'hex' | 'rgb' | 'hsl';

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace('#', '');
  const n = parseInt(c.length === 3 ? c.split('').map((x) => x + x).join('') : c, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function formatColor(hex: string, fmt: ColorFormat) {
  const [r, g, b] = hexToRgb(hex);
  if (fmt === 'rgb') return `rgb(${r}, ${g}, ${b})`;
  if (fmt === 'hsl') {
    const [h, s, l] = rgbToHsl(r, g, b);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  return hex;
}

const PRESETS = [
  '#0a0a0a', '#fafafa', '#FFE500', '#FF2D78', '#00FF94', '#0066FF', '#7C3AED',
  '#FF6B35', '#00C9FF', '#FF4757', '#2ED573', '#FFA502', '#747d8c', '#a29bfe',
];

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, formatted: string) => void;
  format?: ColorFormat;
  presets?: string[];
  showPresets?: boolean;
  showInput?: boolean;
  label?: string;
  className?: string;
}

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value,
      defaultValue = '#FFE500',
      onChange,
      format = 'hex',
      presets = PRESETS,
      showPresets = true,
      showInput = true,
      label,
      className,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [inner, setInner] = React.useState(defaultValue);
    const current = isControlled ? value! : inner;

    const [inputVal, setInputVal] = React.useState(() => formatColor(current, format));

    const update = (hex: string) => {
      if (!isControlled) setInner(hex);
      setInputVal(formatColor(hex, format));
      onChange?.(hex, formatColor(hex, format));
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setInputVal(raw);
      const hex = raw.startsWith('#') && /^#[0-9a-fA-F]{6}$/.test(raw) ? raw : null;
      if (hex) update(hex);
    };

    return (
      <div ref={ref} className={cn('font-sans flex flex-col gap-3', className)}>
        {label && <p className="text-sm font-bold text-fx-black dark:text-fx-white">{label}</p>}

        {/* Native picker + swatch */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 border-2 border-fx-black dark:border-fx-white rounded-[4px] overflow-hidden shadow-fx-sm flex-shrink-0">
            <input
              type="color"
              value={current}
              onChange={(e) => update(e.target.value)}
              className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
              aria-label="Choose color"
            />
            <div
              className="w-full h-full"
              style={{ backgroundColor: current }}
              aria-hidden="true"
            />
            <div className="absolute bottom-0.5 right-0.5 w-3 h-3 flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1 1h6v6H1z" fill="white" opacity="0.7" />
                <path d="M2 2h4v4H2z" fill="black" opacity="0.5" />
              </svg>
            </div>
          </div>

          {showInput && (
            <input
              type="text"
              value={inputVal}
              onChange={handleInput}
              spellCheck={false}
              className={cn(
                'flex-1 px-3 py-2 text-sm font-mono',
                'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
                'bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white',
                'focus:outline-none focus:ring-2 focus:ring-fx-black',
              )}
              aria-label="Color value"
            />
          )}
        </div>

        {/* Presets */}
        {showPresets && (
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => update(p)}
                aria-label={p}
                className={cn(
                  'w-7 h-7 rounded-[4px] border-2 transition-all duration-150',
                  current.toLowerCase() === p.toLowerCase()
                    ? 'border-fx-black dark:border-fx-white shadow-fx-sm translate-x-[1px] translate-y-[1px]'
                    : 'border-gray-300 dark:border-gray-600 hover:border-fx-black dark:hover:border-fx-white',
                )}
                style={{ backgroundColor: p }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';
export { ColorPicker };
export default ColorPicker;
