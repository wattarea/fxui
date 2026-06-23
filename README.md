# FXUI — Neo-brutalist React UI Library

> Bold. Raw. Unapologetically different.

[![npm version](https://img.shields.io/npm/v/@fxui/core)](https://www.npmjs.com/package/@fxui/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)

FXUI is a **neo-brutalist React component library** — 117 components built on TypeScript, Tailwind CSS, and Radix UI. Every component follows the same design rules: bold borders, hard shadows, minimal radius, deliberate hover states.

---

## Installation

```bash
pnpm add @fxui/core
# or
npm install @fxui/core
# or
yarn add @fxui/core
```

> **Requires:** React 18+, Tailwind CSS 3+

---

## Quick Start

```tsx
import { Button, Card, ThemeProvider } from '@fxui/core';
import '@fxui/core/styles';

export default function App() {
  return (
    <ThemeProvider defaultColorMode="system">
      <Card>
        <Card.Header>Hello FXUI</Card.Header>
        <Card.Body>
          <Button variant="neon">Click me</Button>
        </Card.Body>
      </Card>
    </ThemeProvider>
  );
}
```

---

## Components (117 total)

| Category | Count | Examples |
|----------|-------|---------|
| Core | 8 | Button, Badge, Chip, Spinner, Kbd |
| Layout | 8 | Container, Stack, Flex, Grid, Masonry |
| Typography | 8 | Heading, Text, Code, GradientText |
| Form | 17 | Input, Select, Checkbox, Switch, Rating |
| Form Advanced | 10 | DatePicker, ColorPicker, AutoComplete |
| Data Display | 13 | Table, Card, Avatar, Timeline, Countdown |
| Feedback | 8 | Toast, Alert, EmptyState, ConfirmDialog |
| Navigation | 8 | Tabs, Breadcrumb, Navbar, Pagination |
| Overlay | 10 | Modal, Drawer, Tooltip, CommandPalette |
| Interaction | 2 | Collapsible, InlineEdit |
| Media & Chart | 10 | LineChart, BarChart, Carousel, VideoPlayer |
| Utility | 8 | CopyButton, QRCode, ClipboardInput, Marquee |
| Special | 4 | GlitchText, TypewriterText, NoiseBg, BrutalistCard |
| Theme | 1 | ThemeProvider |
| Misc | 2 | Accordion, Tour |

---

## Design System Tokens

```
Colors:   fx-black(#0a0a0a)  fx-white(#fafafa)
          fx-yellow(#FFE500)  fx-pink(#FF2D78)
          fx-green(#00FF94)   fx-blue(#0066FF)   fx-purple(#7C3AED)

Shadows:  shadow-fx-sm  shadow-fx  shadow-fx-lg  shadow-fx-xl
          shadow-fx-dark  shadow-fx-dark-sm  (dark mode)

Fonts:    Space Grotesk (sans)  Space Mono (mono)  Archivo Black (display)
```

---

## Neo-Brutalism Rules

Every FXUI component follows these rules — consistently, without exception:

| Rule | Value |
|------|-------|
| Border | `border-2 border-fx-black` |
| Shadow | `shadow-fx` → hover `shadow-fx-sm + translate(2px,2px)` → active `shadow-none + translate(4px,4px)` |
| Radius | `rounded-[4px]` maximum |
| Transition | `transition-all duration-150 ease-in-out` |
| Dark mode | `dark:` prefix throughout |

---

## Development

```bash
git clone https://github.com/wattarea/fxui.git
cd fxui
pnpm install

pnpm dev          # Docs at localhost:3000
pnpm storybook    # Storybook at localhost:6006
pnpm build        # Build all packages
pnpm type-check   # TypeScript check
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for component authoring guidelines and PR process.

---

## License

[MIT](./LICENSE) © 2024 wattarea
