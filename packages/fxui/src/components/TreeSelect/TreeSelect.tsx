import React from 'react';
import { cn } from '../../utils/cn';

export interface TreeSelectNode {
  value: string;
  label: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

export interface TreeSelectProps {
  options: TreeSelectNode[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, node: TreeSelectNode) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

function findNode(nodes: TreeSelectNode[], val: string): TreeSelectNode | null {
  for (const n of nodes) {
    if (n.value === val) return n;
    if (n.children) {
      const found = findNode(n.children, val);
      if (found) return found;
    }
  }
  return null;
}

interface TreeNodeProps {
  node: TreeSelectNode;
  depth: number;
  selectedValue: string | undefined;
  onSelect: (node: TreeSelectNode) => void;
  expandedSet: Set<string>;
  toggleExpand: (v: string) => void;
}

function TreeNode({ node, depth, selectedValue, onSelect, expandedSet, toggleExpand }: TreeNodeProps) {
  const hasChildren = !!node.children?.length;
  const expanded = expandedSet.has(node.value);
  const isSelected = selectedValue === node.value;

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-1.5 px-2 py-1.5 rounded-[4px] cursor-pointer text-sm',
          'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors select-none',
          isSelected && 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black font-bold',
          node.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          if (hasChildren) toggleExpand(node.value);
          if (!hasChildren && !node.disabled) onSelect(node);
        }}
        role="option"
        aria-selected={isSelected}
        aria-disabled={node.disabled}
      >
        {hasChildren ? (
          <span className={cn('shrink-0 transition-transform text-xs', expanded && 'rotate-90')}>▶</span>
        ) : (
          <span className="w-3 shrink-0" />
        )}
        <span className="truncate">{node.label}</span>
      </div>

      {hasChildren && expanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.value}
              node={child}
              depth={depth + 1}
              selectedValue={selectedValue}
              onSelect={onSelect}
              expandedSet={expandedSet}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const TreeSelect = React.forwardRef<HTMLDivElement, TreeSelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = 'Select...',
      label,
      error,
      hint,
      disabled = false,
      className,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [inner, setInner] = React.useState(defaultValue);
    const selected = isControlled ? value : inner;

    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

    const selectedNode = selected ? findNode(options, selected) : null;

    const toggleExpand = (v: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(v)) next.delete(v); else next.add(v);
        return next;
      });
    };

    const handleSelect = (node: TreeSelectNode) => {
      if (!isControlled) setInner(node.value);
      onChange?.(node.value, node);
      setOpen(false);
    };

    React.useEffect(() => {
      if (!open) return;
      const close = (e: MouseEvent) => {
        const el = document.getElementById('treeselect-dropdown');
        if (!el?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener('mousedown', close);
      return () => document.removeEventListener('mousedown', close);
    }, [open]);

    return (
      <div ref={ref} className={cn('font-sans flex flex-col gap-1.5 relative', className)}>
        {label && <label className="text-sm font-bold text-fx-black dark:text-fx-white">{label}</label>}

        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2 text-sm text-left',
            'border-2 rounded-[4px] bg-fx-white dark:bg-fx-black',
            error ? 'border-fx-pink' : 'border-fx-black dark:border-fx-white',
            'focus:outline-none focus:ring-2 focus:ring-fx-black',
            'transition-all duration-150',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <span className={cn(selectedNode ? 'text-fx-black dark:text-fx-white' : 'text-gray-400')}>
            {selectedNode?.label ?? placeholder}
          </span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cn('shrink-0 transition-transform', open && 'rotate-180')} aria-hidden="true">
            <path d="M1 1l4 4 4-4" />
          </svg>
        </button>

        {open && (
          <div
            id="treeselect-dropdown"
            role="listbox"
            className="absolute top-full mt-1 left-0 right-0 z-50 max-h-56 overflow-y-auto border-2 border-fx-black dark:border-fx-white rounded-[4px] bg-fx-white dark:bg-fx-black shadow-fx p-1"
          >
            {options.map((node) => (
              <TreeNode
                key={node.value}
                node={node}
                depth={0}
                selectedValue={selected}
                onSelect={handleSelect}
                expandedSet={expanded}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>
        )}

        {error && <p className="text-xs text-fx-pink font-medium">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
    );
  }
);

TreeSelect.displayName = 'TreeSelect';
export { TreeSelect };
export default TreeSelect;
