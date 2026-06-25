# FXUI

**Brutal by design. Yours to own.**

> No apologies. No compromise. Just raw, unapologetic components that mean business.

[![npm version](https://img.shields.io/npm/v/fxui-core?style=for-the-badge&color=ff2d78)](https://www.npmjs.com/package/fxui-core)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=for-the-badge)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind)](https://tailwindcss.com)

---

## Install

```bash
pnpm add fxui-core
npm install fxui-core
yarn add fxui-core
```

> **Requires:** React 18+ · Tailwind CSS 3+

---

## Quick Start

```tsx
import { Button, Card, Input } from 'fxui-core';
import 'fxui-core/styles';

export default function App() {
  return (
    <Card variant="elevated" className="w-96">
      <Card.Header>Get Started</Card.Header>
      <Card.Body className="space-y-4">
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" />
      </Card.Body>
      <Card.Footer>
        <Button className="w-full">Sign In</Button>
      </Card.Footer>
    </Card>
  );
}
```

---

## Why FXUI?

| | |
|---|---|
| ⚡ **No runtime** | Pure Tailwind utilities. Zero CSS-in-JS. No style injection at runtime. |
| ♿ **Accessible** | Built on Radix UI primitives. ARIA roles, keyboard nav, focus management — all included. |
| 🎨 **Customizable** | Override anything via `className`. CVA variants for every component. |
| 📦 **Tree-shakeable** | Only ship what you use. ESM + CJS + full type declarations. |
| 🌙 **Dark mode** | Full `dark:` support. Switch modes with `ThemeProvider`. |
| 🔒 **Strict TypeScript** | Typed props everywhere. `forwardRef` throughout. No `any`. |

---

## 117 Components · 15 Categories

| Category | Components |
|----------|-----------|
| **Core** | Button, Badge, Chip, Tag, Kbd, Divider, Spinner, FloatingActionButton |
| **Layout** | Container, Stack, Flex, Grid, AspectRatio, ScrollArea, SplitLayout, Masonry |
| **Typography** | Heading, Text, Label, Caption, Blockquote, Code, PullQuote, GradientText |
| **Form** | Input, PasswordInput, SearchInput, Textarea, Select, NumberInput, Slider, Checkbox, CheckboxGroup, Switch, SwitchGroup, RadioGroup, SegmentedControl, OTPInput, Rating, FormField, InputGroup |
| **Form Advanced** | DatePicker, TagInput, ComboBox, FileUpload, ColorPicker, PhoneInput, MaskInput, TreeSelect, PinInput, AutoComplete |
| **Data Display** | Table, Card, Avatar, Stat, Timeline, Progress, Skeleton, TreeView, DataList, List, AvatarGroup, TimeAgo, Countdown |
| **Feedback** | Toast, Alert, EmptyState, Banner, ConfirmDialog, Notification, Callout, LoadingOverlay |
| **Navigation** | Tabs, Breadcrumb, Pagination, Stepper, Navbar, NavMenu, AppSidebar, ScrollProgress |
| **Overlay** | Modal, Drawer, Tooltip, Popover, DropdownMenu, ContextMenu, CommandPalette, HoverCard, SheetDialog, Popconfirm |
| **Interaction** | Collapsible, InlineEdit |
| **Media & Chart** | Image, Carousel, VideoPlayer, LineChart, BarChart, AreaChart, DonutChart, SparkLine, ProgressRing, AnimatedCounter |
| **Utility** | CopyButton, ColorSwatch, Marquee, ReadMore, HighlightText, ScrollToTop, QRCode, ClipboardInput |
| **Special** | GlitchText, TypewriterText, NoiseBg, BrutalistCard |
| **Theme** | ThemeProvider |
| **Misc** | Accordion, Tour |

---

## Design Tokens

```
Colors
  fx-black   #0a0a0a     fx-white    #fafafa
  fx-yellow  #FFE500     fx-pink     #FF2D78
  fx-green   #00FF94     fx-blue     #0066FF     fx-purple #7C3AED

Shadows
  shadow-fx-sm  shadow-fx  shadow-fx-lg  shadow-fx-xl
  shadow-fx-dark  shadow-fx-dark-sm  (dark mode)

Fonts
  Space Grotesk  (sans)     Space Mono  (mono)
  Archivo Black  (display)
```

---

## Neo-Brutalism Rules

Every FXUI component follows these rules — no exceptions:

| Rule | Value |
|------|-------|
| **Border** | `border-2 border-fx-black` · `dark:border-fx-white` |
| **Shadow** | `shadow-fx` → hover `shadow-fx-sm + translate(2px,2px)` → active `shadow-none + translate(4px,4px)` |
| **Radius** | `rounded-[4px]` maximum |
| **Transition** | `transition-all duration-150 ease-in-out` |
| **Dark mode** | `dark:` prefix throughout · `#fafafa` shadows |

---

## Resources

| | |
|---|---|
| 📖 **Docs** | [fxui-docs.vercel.app](https://fxui-docs.vercel.app) |
| 🎭 **Showcase** | [fxui-docs.vercel.app/showcase](https://fxui-docs.vercel.app/showcase) |
| 🧪 **Storybook** | Run `pnpm storybook` in the repo |
| 🐛 **Issues** | [github.com/wattarea/fxui/issues](https://github.com/wattarea/fxui/issues) |

---

## Development

```bash
git clone https://github.com/wattarea/fxui.git
cd fxui
pnpm install

pnpm dev          # Docs site at localhost:3000
pnpm storybook    # Storybook at localhost:6006
pnpm build        # Build all packages
pnpm type-check   # TypeScript validation
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for component authoring guidelines and PR process.

---

MIT License · Built with sharp corners and zero apologies · 2026
