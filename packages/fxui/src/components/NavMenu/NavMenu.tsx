import React from 'react';
import { cn } from '../../utils/cn';

export interface NavMenuLink {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface NavMenuGroup {
  trigger: string;
  links: NavMenuLink[];
}

export interface NavMenuItem {
  label: string;
  href?: string;
  group?: NavMenuGroup;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface NavMenuProps {
  items: NavMenuItem[];
  className?: string;
}

const NavMenu = ({ items, className }: NavMenuProps) => {
  const [open, setOpen] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  const openMenu = (label: string) => {
    clearTimeout(timeoutRef.current);
    setOpen(label);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setOpen(null), 150);
  };

  const cancelClose = () => clearTimeout(timeoutRef.current);

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <nav className={cn('flex items-center gap-1 font-sans', className)} aria-label="Navigation menu">
      {items.map((item) => {
        const hasDropdown = !!item.group;
        const isOpen = open === item.label;

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => hasDropdown && openMenu(item.label)}
            onMouseLeave={hasDropdown ? closeMenu : undefined}
          >
            {item.href ? (
              <a
                href={item.href}
                onClick={item.onClick}
                className={cn(
                  'flex items-center gap-1 px-3 py-1.5 rounded-[4px] text-sm font-bold transition-all duration-150',
                  item.active
                    ? 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black shadow-fx-sm translate-x-[1px] translate-y-[1px]'
                    : 'text-fx-black dark:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800',
                )}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
                {hasDropdown && (
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cn('transition-transform', isOpen && 'rotate-180')} aria-hidden="true">
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                )}
              </a>
            ) : (
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
                className={cn(
                  'flex items-center gap-1 px-3 py-1.5 rounded-[4px] text-sm font-bold transition-all duration-150',
                  'text-fx-black dark:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800',
                  isOpen && 'bg-gray-100 dark:bg-gray-800',
                )}
              >
                {item.label}
                {hasDropdown && (
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cn('transition-transform', isOpen && 'rotate-180')} aria-hidden="true">
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                )}
              </button>
            )}

            {hasDropdown && isOpen && (
              <div
                onMouseEnter={cancelClose}
                onMouseLeave={closeMenu}
                className="absolute top-full left-0 mt-2 z-50 min-w-[200px] border-2 border-fx-black dark:border-fx-white rounded-[4px] bg-fx-white dark:bg-fx-black shadow-fx p-2"
              >
                {item.group!.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={link.onClick}
                    className="flex items-start gap-2.5 px-3 py-2 rounded-[4px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {link.icon && <span className="shrink-0 mt-0.5" aria-hidden="true">{link.icon}</span>}
                    <span className="flex flex-col">
                      <span className="text-sm font-bold text-fx-black dark:text-fx-white">{link.label}</span>
                      {link.description && (
                        <span className="text-xs text-gray-400 mt-0.5">{link.description}</span>
                      )}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

NavMenu.displayName = 'NavMenu';
export { NavMenu };
export default NavMenu;
