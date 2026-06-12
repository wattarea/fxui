'use client';
import React from 'react';
import { cn } from '../../utils/cn';

export interface QRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  size?: number;
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
  foreground?: string;
  background?: string;
  label?: string;
  logo?: string;
  logoSize?: number;
  bordered?: boolean;
}

const QRCode = React.forwardRef<HTMLDivElement, QRCodeProps>(
  (
    {
      value,
      size = 200,
      errorLevel = 'M',
      foreground = '#0a0a0a',
      background = '#fafafa',
      label,
      logo,
      logoSize = 36,
      bordered = true,
      className,
      ...props
    },
    ref
  ) => {
    const [svgContent, setSvgContent] = React.useState<string | null>(null);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
      if (!value) return;
      let cancelled = false;
      import('qrcode')
        .then((QR) =>
          QR.toString(value, {
            type: 'svg',
            errorCorrectionLevel: errorLevel,
            color: { dark: foreground, light: background },
            margin: 1,
          })
        )
        .then((svg) => { if (!cancelled) setSvgContent(svg); })
        .catch(() => { if (!cancelled) setError(true); });
      return () => { cancelled = true; };
    }, [value, errorLevel, foreground, background]);

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex flex-col items-center gap-2',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'relative inline-flex items-center justify-center',
            bordered && 'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx dark:shadow-fx-dark p-2',
          )}
          style={{ width: size + (bordered ? 20 : 0), height: size + (bordered ? 20 : 0) }}
        >
          {error ? (
            <div
              className="flex flex-col items-center justify-center text-center gap-1"
              style={{ width: size, height: size }}
            >
              <span className="text-2xl">⚠️</span>
              <span className="text-xs font-sans text-gray-400">QR Error</span>
            </div>
          ) : svgContent ? (
            <>
              <div
                style={{ width: size, height: size }}
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
              {logo && (
                <img
                  src={logo}
                  alt="QR logo"
                  className="absolute rounded-[4px] border-2 border-fx-black"
                  style={{
                    width: logoSize,
                    height: logoSize,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}
            </>
          ) : (
            <div
              className="flex items-center justify-center"
              style={{ width: size, height: size }}
            >
              <span className="inline-block h-6 w-6 border-2 border-fx-black border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {label && (
          <span className="text-xs font-sans font-bold text-gray-400 tracking-wide text-center max-w-[180px] truncate">
            {label}
          </span>
        )}
      </div>
    );
  }
);
QRCode.displayName = 'QRCode';
export { QRCode };
export default QRCode;
