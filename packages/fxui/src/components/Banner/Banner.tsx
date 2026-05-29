import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const bannerVariants = cva(
  'w-full flex items-center gap-3 px-4 py-3 border-b-2 font-sans text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-fx-black text-fx-white border-fx-black dark:bg-fx-white dark:text-fx-black',
        yellow: 'bg-fx-yellow text-fx-black border-fx-black',
        pink: 'bg-fx-pink text-fx-white border-fx-black',
        green: 'bg-fx-green text-fx-black border-fx-black',
        blue: 'bg-fx-blue text-fx-white border-fx-black',
        purple: 'bg-fx-purple text-fx-white border-fx-black',
        warning: 'bg-fx-yellow text-fx-black border-fx-black',
        error: 'bg-fx-pink text-fx-white border-fx-black',
        success: 'bg-fx-green text-fx-black border-fx-black',
        info: 'bg-fx-blue text-fx-white border-fx-black',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const iconMap: Record<string, string> = {
  warning: '⚠️',
  error: '❌',
  success: '✅',
  info: 'ℹ️',
};

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode;
  action?: React.ReactNode;
  closeable?: boolean;
  onClose?: () => void;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, icon, action, closeable = false, onClose, children, ...props }, ref) => {
    const [visible, setVisible] = React.useState(true);
    if (!visible) return null;

    const defaultIcon = variant ? iconMap[variant] : null;
    const displayIcon = icon !== undefined ? icon : defaultIcon;

    const handleClose = () => {
      setVisible(false);
      onClose?.();
    };

    return (
      <div ref={ref} role="alert" className={cn(bannerVariants({ variant }), className)} {...props}>
        {displayIcon && <span aria-hidden="true" className="shrink-0">{displayIcon}</span>}
        <span className="flex-1 min-w-0">{children}</span>
        {action && <span className="shrink-0 ml-2">{action}</span>}
        {closeable && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Dismiss banner"
            className="shrink-0 ml-1 p-1 rounded-[4px] opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-1 focus:ring-current"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Banner.displayName = 'Banner';
export { Banner, bannerVariants };
export default Banner;
