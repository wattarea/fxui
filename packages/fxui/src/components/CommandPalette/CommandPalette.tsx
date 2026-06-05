import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../utils/cn';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  group?: string;
  action: () => void;
  keywords?: string[];
}

// ─── Context ───────────────────────────────────────────────────────────────

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommandPaletteContext = React.createContext<CommandPaletteContextValue>({
  open: false,
  setOpen: () => {},
});

export function useCommandPalette() {
  return React.useContext(CommandPaletteContext);
}

// ─── Provider ──────────────────────────────────────────────────────────────

export interface CommandPaletteProviderProps {
  children: React.ReactNode;
  shortcut?: string;
}

export function CommandPaletteProvider({ children, shortcut = 'k' }: CommandPaletteProviderProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === shortcut) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [shortcut]);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

// ─── CommandPalette ────────────────────────────────────────────────────────

export interface CommandPaletteProps {
  items: CommandItem[];
  placeholder?: string;
  emptyText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({
  items,
  placeholder = 'Search commands…',
  emptyText = 'No results found.',
  open: controlledOpen,
  onOpenChange,
}: CommandPaletteProps) {
  const ctx = React.useContext(CommandPaletteContext);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : ctx.open;
  const setOpen = isControlled ? (onOpenChange ?? (() => {})) : ctx.setOpen;

  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.group?.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }, [items, query]);

  const groups = React.useMemo(
    () =>
      filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
        const g = item.group ?? '';
        if (!acc[g]) acc[g] = [];
        acc[g].push(item);
        return acc;
      }, {}),
    [filtered]
  );

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  React.useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const runItem = (item: CommandItem) => {
    item.action();
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      e.preventDefault();
      runItem(filtered[activeIndex]);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-fx-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2',
            'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx-xl',
            'bg-fx-white dark:bg-fx-black',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          )}
          onKeyDown={handleKeyDown}
          aria-label="Command palette"
        >
          {/* Search */}
          <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-fx-black dark:border-fx-white">
            <span className="text-gray-400 shrink-0" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-sm font-sans text-fx-black dark:text-fx-white placeholder:text-gray-400"
              aria-label={placeholder}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-gray-400 hover:text-fx-black dark:hover:text-fx-white transition-colors text-xs"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto py-2" role="listbox" aria-label="Command results">
            {filtered.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-gray-400 font-sans">{emptyText}</p>
            ) : (
              Object.entries(groups).map(([group, groupItems]) => (
                <div key={group}>
                  {group && (
                    <p className="px-4 pt-2 pb-1 text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans">
                      {group}
                    </p>
                  )}
                  {groupItems.map((item) => {
                    const globalIdx = filtered.indexOf(item);
                    const isActive = globalIdx === activeIndex;
                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => runItem(item)}
                        onMouseEnter={() => setActiveIndex(globalIdx)}
                        className={cn(
                          'flex items-center gap-3 mx-2 px-3 py-2.5 rounded-[4px] cursor-pointer transition-colors duration-100',
                          isActive
                            ? 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black'
                            : 'text-fx-black dark:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800',
                        )}
                      >
                        {item.icon && (
                          <span className="shrink-0 text-base" aria-hidden="true">{item.icon}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold font-sans truncate">{item.label}</p>
                          {item.description && (
                            <p className={cn('text-xs font-sans truncate', isActive ? 'opacity-70' : 'text-gray-400')}>
                              {item.description}
                            </p>
                          )}
                        </div>
                        {item.shortcut && (
                          <span className={cn('shrink-0 text-xs font-mono opacity-50', isActive && 'opacity-80')}>
                            {item.shortcut}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 px-4 py-2.5 border-t-2 border-fx-black/10 dark:border-fx-white/10">
            {[
              { keys: ['↑', '↓'], label: 'navigate' },
              { keys: ['↵'], label: 'select' },
              { keys: ['Esc'], label: 'close' },
            ].map(({ keys, label }) => (
              <span key={label} className="flex items-center gap-1 text-[10px] text-gray-400 font-sans">
                {keys.map((k) => (
                  <kbd key={k} className="px-1 py-0.5 border border-gray-200 dark:border-gray-700 rounded text-[10px] font-mono bg-gray-50 dark:bg-gray-900">
                    {k}
                  </kbd>
                ))}
                <span>{label}</span>
              </span>
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

CommandPalette.displayName = 'CommandPalette';
export default CommandPalette;
