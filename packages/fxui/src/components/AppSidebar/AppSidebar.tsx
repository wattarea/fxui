import React from 'react';
import { cn } from '../../utils/cn';

export interface AppSidebarSection {
  title?: string;
  items: AppSidebarItem[];
}

export interface AppSidebarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
  as?: React.ElementType;
}

export interface AppSidebarProps {
  sections: AppSidebarSection[];
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  width?: number;
  collapsedWidth?: number;
  className?: string;
}

const AppSidebar = React.forwardRef<HTMLElement, AppSidebarProps>(
  (
    {
      sections,
      logo,
      footer,
      collapsible = false,
      defaultCollapsed = false,
      width = 240,
      collapsedWidth = 56,
      className,
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
    const w = collapsed ? collapsedWidth : width;

    return (
      <aside
        ref={ref}
        className={cn(
          'flex flex-col h-full border-r-2 border-fx-black dark:border-fx-white',
          'bg-fx-white dark:bg-fx-black font-sans',
          'transition-all duration-200',
          className,
        )}
        style={{ width: w }}
        aria-label="Navigation sidebar"
      >
        {/* Logo + collapse toggle */}
        {(logo || collapsible) && (
          <div className={cn(
            'flex items-center gap-2 px-4 py-4 border-b-2 border-fx-black dark:border-fx-white',
            collapsed ? 'justify-center' : 'justify-between',
          )}>
            {logo && !collapsed && <div className="flex-1 min-w-0">{logo}</div>}
            {collapsible && (
              <button
                type="button"
                onClick={() => setCollapsed((c) => !c)}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="p-1.5 rounded-[4px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  {collapsed ? (
                    <path d="M9 18l6-6-6-6" />
                  ) : (
                    <path d="M15 18l-6-6 6-6" />
                  )}
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Sections */}
        <nav className="flex-1 overflow-y-auto py-3 px-2" aria-label="Sidebar navigation">
          {sections.map((section, si) => (
            <div key={si} className={cn('mb-4', si > 0 && 'mt-4 pt-4 border-t-2 border-fx-black/10 dark:border-fx-white/10')}>
              {section.title && !collapsed && (
                <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1.5 px-2">
                  {section.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item, ii) => {
                  const Tag = item.as ?? (item.href ? 'a' : 'button');
                  return (
                    <li key={ii}>
                      <Tag
                        href={item.href}
                        type={Tag === 'button' ? 'button' : undefined}
                        onClick={item.onClick}
                        aria-current={item.active ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-2.5 w-full text-sm font-medium rounded-[4px] transition-all duration-100',
                          collapsed ? 'justify-center p-2' : 'px-3 py-2',
                          item.active
                            ? 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black font-bold shadow-fx-sm translate-x-[1px] translate-y-[1px]'
                            : 'text-fx-black dark:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800',
                        )}
                        title={collapsed ? String(item.label) : undefined}
                      >
                        {item.icon && <span className="shrink-0" aria-hidden="true">{item.icon}</span>}
                        {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                        {!collapsed && item.badge !== undefined && (
                          <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-black rounded-full bg-fx-pink text-fx-white">
                            {item.badge}
                          </span>
                        )}
                      </Tag>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        {footer && !collapsed && (
          <div className="px-3 py-3 border-t-2 border-fx-black dark:border-fx-white">
            {footer}
          </div>
        )}
      </aside>
    );
  }
);

AppSidebar.displayName = 'AppSidebar';
export { AppSidebar };
export default AppSidebar;
