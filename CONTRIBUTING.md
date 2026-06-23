# Contributing to FXUI

Thank you for your interest in contributing! FXUI is a neo-brutalist React component library and we welcome all kinds of contributions.

## Development Setup

```bash
# Clone the repo
git clone https://github.com/wattarea/fxui.git
cd fxui

# Install dependencies (requires pnpm)
pnpm install

# Start development
pnpm dev          # Docs site at localhost:3000
pnpm storybook    # Storybook at localhost:6006
pnpm type-check   # TypeScript validation
pnpm build        # Build all packages
```

## Adding a New Component

Every component lives in `packages/fxui/src/components/<ComponentName>/` and requires exactly 3 files:

### 1. `ComponentName.tsx`

- Use `React.forwardRef` — required for all components
- Set `ComponentName.displayName = 'ComponentName'`
- Use `cva` (class-variance-authority) for variant management
- Use `cn` from `../../utils/cn` for class merging
- No `any` types — strict TypeScript

### 2. `index.ts`

```ts
export * from './ComponentName';
export { default } from './ComponentName';
```

### 3. `ComponentName.stories.tsx`

Include at minimum: `Default`, `AllVariants`, and one interactive story.

### Neo-Brutalism Rules (required)

| Rule | Value |
|------|-------|
| Border | `border-2 border-fx-black` (`dark:border-fx-white`) |
| Shadow | `shadow-fx` → hover: `shadow-fx-sm + translate(2px,2px)` → active: `shadow-none + translate(4px,4px)` |
| Radius | `rounded-[4px]` maximum |
| Transition | `transition-all duration-150 ease-in-out` |

### After Creating the Component

Register it in 4 places:

1. `packages/fxui/src/components/index.ts` — add export
2. `apps/docs/content/<componentname>.mdx` — write docs
3. `apps/docs/app/page.tsx` — add to relevant category
4. `apps/docs/components/Sidebar.tsx` — add to navigation

## Interactive Components

Use Radix UI primitives for anything that involves accessibility concerns (Dialog, Tooltip, Accordion, etc.):

```bash
pnpm add @radix-ui/react-<name> --filter @fxui/core
```

## Pull Request Guidelines

1. Fork the repository and create a branch from `main`
2. Keep PRs focused — one component or bug fix per PR
3. Run `pnpm type-check` before opening a PR
4. Include Storybook stories that demonstrate all variants
5. Write the MDX doc page for new components
6. No Turkish or non-English content in code, comments, or docs

## Reporting Issues

Please use [GitHub Issues](https://github.com/wattarea/fxui/issues) for bug reports and feature requests.
