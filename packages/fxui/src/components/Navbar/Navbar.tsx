import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const navbarVariants = cva(
  'flex items-center gap-4 px-4 border-b-2 border-fx-black dark:border-fx-white font-sans',
  {
    variants: {
      variant: {
        default: 'bg-fx-white dark:bg-fx-black',
        black: 'bg-fx-black dark:bg-fx-black border-fx-white',
        yellow: 'bg-fx-yellow border-fx-black',
        blur: 'bg-fx-white/70 dark:bg-fx-black/70 backdrop-blur-md',
      },
      size: {
        sm: 'h-12',
        md: 'h-14',
        lg: 'h-16',
      },
      sticky: {
        true: 'sticky top-0 z-40',
        false: '',
      },
    },
    defaultVariants: { variant: 'default', size: 'md', sticky: false },
  }
);

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
  logo?: React.ReactNode;
  actions?: React.ReactNode;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, variant, size, sticky, logo, actions, children, ...props }, ref) => (
    <header ref={ref} className={cn(navbarVariants({ variant, size, sticky }), className)} {...props}>
      {/* Logo */}
      {logo && <div className="shrink-0">{logo}</div>}

      {/* Nav items */}
      {children && (
        <nav className="flex-1 flex items-center gap-1" aria-label="Main navigation">
          {children}
        </nav>
      )}

      {/* Actions */}
      {actions && <div className="ml-auto shrink-0 flex items-center gap-2">{actions}</div>}
    </header>
  )
);

Navbar.displayName = 'Navbar';

// Nav item subcomponent
export interface NavbarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  as?: React.ElementType;
}

const NavbarItem = React.forwardRef<HTMLAnchorElement, NavbarItemProps>(
  ({ className, active, as: Tag = 'a', children, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        'px-3 py-1.5 rounded-[4px] text-sm font-bold transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-fx-black',
        active
          ? 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black shadow-fx-sm translate-x-[1px] translate-y-[1px]'
          : 'text-fx-black dark:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800',
        className,
      )}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {children}
    </Tag>
  )
);

NavbarItem.displayName = 'NavbarItem';

export { Navbar, NavbarItem, navbarVariants };
export default Navbar;
