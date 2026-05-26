import React from 'react';
import { cn } from '../../utils/cn';

export interface TreeViewNode {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: TreeViewNode[];
  data?: unknown;
}

export interface TreeViewProps {
  nodes: TreeViewNode[];
  defaultExpanded?: string[];
  defaultSelected?: string;
  onSelect?: (id: string, node: TreeViewNode) => void;
  onExpand?: (id: string, expanded: boolean) => void;
  selectable?: boolean;
  className?: string;
  'aria-label'?: string;
}

interface NodeItemProps {
  node: TreeViewNode;
  depth: number;
  selectedId: string | undefined;
  expandedSet: Set<string>;
  onSelect: (id: string, node: TreeViewNode) => void;
  onToggle: (id: string) => void;
  selectable: boolean;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
    className={cn('shrink-0 transition-transform duration-150', open && 'rotate-90')}
  >
    <path d="M4 2l4 4-4 4" />
  </svg>
);

const FolderIcon = ({ open }: { open: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    {open ? (
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    ) : (
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    )}
  </svg>
);

const FileIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

function NodeItem({ node, depth, selectedId, expandedSet, onSelect, onToggle, selectable }: NodeItemProps) {
  const hasChildren = !!node.children?.length;
  const expanded = expandedSet.has(node.id);
  const isSelected = selectedId === node.id;

  const handleClick = () => {
    if (hasChildren) onToggle(node.id);
    if (selectable) onSelect(node.id, node);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
    if (e.key === 'ArrowRight' && hasChildren && !expanded) onToggle(node.id);
    if (e.key === 'ArrowLeft' && hasChildren && expanded) onToggle(node.id);
  };

  return (
    <li role="treeitem" aria-expanded={hasChildren ? expanded : undefined} aria-selected={selectable ? isSelected : undefined}>
      <div
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center gap-1.5 py-1 px-2 rounded-[4px] cursor-pointer text-sm font-sans',
          'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
          'focus:outline-none focus:ring-1 focus:ring-fx-black dark:focus:ring-fx-white',
          isSelected && 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black font-bold',
        )}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {hasChildren ? (
          <ChevronIcon open={expanded} />
        ) : (
          <span className="w-3 shrink-0" />
        )}
        <span className={cn('shrink-0', isSelected ? 'text-current' : 'text-gray-400')}>
          {node.icon ?? (hasChildren ? <FolderIcon open={expanded} /> : <FileIcon />)}
        </span>
        <span className="truncate">{node.label}</span>
      </div>

      {hasChildren && expanded && (
        <ul role="group">
          {node.children!.map((child) => (
            <NodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              expandedSet={expandedSet}
              onSelect={onSelect}
              onToggle={onToggle}
              selectable={selectable}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      nodes,
      defaultExpanded = [],
      defaultSelected,
      onSelect,
      onExpand,
      selectable = true,
      className,
      'aria-label': ariaLabel = 'Tree view',
    },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState<Set<string>>(new Set(defaultExpanded));
    const [selected, setSelected] = React.useState<string | undefined>(defaultSelected);

    const toggleExpand = (id: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        const wasExpanded = next.has(id);
        if (wasExpanded) next.delete(id); else next.add(id);
        onExpand?.(id, !wasExpanded);
        return next;
      });
    };

    const handleSelect = (id: string, node: TreeViewNode) => {
      setSelected(id);
      onSelect?.(id, node);
    };

    return (
      <div ref={ref} className={cn('font-sans', className)}>
        <ul role="tree" aria-label={ariaLabel} className="flex flex-col gap-0.5">
          {nodes.map((node) => (
            <NodeItem
              key={node.id}
              node={node}
              depth={0}
              selectedId={selected}
              expandedSet={expanded}
              onSelect={handleSelect}
              onToggle={toggleExpand}
              selectable={selectable}
            />
          ))}
        </ul>
      </div>
    );
  }
);

TreeView.displayName = 'TreeView';
export { TreeView };
export default TreeView;
