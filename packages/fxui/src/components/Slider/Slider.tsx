import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { cn } from '../../utils/cn';

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixSlider.Root>, 'children'> {
  label?: string;
  hint?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof RadixSlider.Root>,
  SliderProps
>(
  (
    {
      className,
      label,
      hint,
      showValue = false,
      formatValue = (v) => String(v),
      value,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? [min]);
    const controlled = value !== undefined;
    const current = controlled ? value : internalValue;

    return (
      <div className="flex flex-col gap-3 w-full">
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <span className="font-bold text-sm text-fx-black dark:text-fx-white">
                {label}
              </span>
            )}
            {showValue && (
              <span className="font-mono font-bold text-sm text-fx-black dark:text-fx-white border-2 border-fx-black dark:border-fx-white px-2 py-0.5 rounded-[4px] shadow-fx-sm">
                {current?.map(formatValue).join(' – ')}
              </span>
            )}
          </div>
        )}
        <RadixSlider.Root
          ref={ref}
          value={controlled ? value : undefined}
          defaultValue={!controlled ? (defaultValue ?? [min]) : undefined}
          min={min}
          max={max}
          step={step}
          onValueChange={(v) => {
            if (!controlled) setInternalValue(v);
            props.onValueChange?.(v);
          }}
          className={cn(
            'relative flex items-center select-none touch-none w-full h-6',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        >
          <RadixSlider.Track className="relative grow rounded-full h-3 border-2 border-fx-black bg-gray-100 dark:border-fx-white dark:bg-gray-800">
            <RadixSlider.Range className="absolute rounded-full h-full bg-fx-black dark:bg-fx-white" />
          </RadixSlider.Track>
          {(current ?? [min]).map((_, i) => (
            <RadixSlider.Thumb
              key={i}
              className={cn(
                'block h-5 w-5 rounded-full',
                'bg-fx-white border-2 border-fx-black',
                'shadow-fx-sm',
                'transition-all duration-150',
                'hover:shadow-fx hover:translate-x-[-1px] hover:translate-y-[-1px]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fx-black focus-visible:ring-offset-2',
                'dark:bg-fx-black dark:border-fx-white dark:shadow-fx-dark-sm dark:hover:shadow-fx-dark',
              )}
              aria-label={label ? `${label} ${i + 1}` : `Slider thumb ${i + 1}`}
            />
          ))}
        </RadixSlider.Root>
        {hint && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{hint}</p>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
export default Slider;
