'use client';

import React, { useState } from 'react';
import {
  Button, Badge, Chip, Tag, Kbd, Divider, Spinner, FloatingActionButton,
  Container, Stack, Flex, Grid, AspectRatio, ScrollArea, SplitLayout, Masonry,
  Heading, Text, Label, Caption, Blockquote, Code, PullQuote, GradientText,
  Input, PasswordInput, SearchInput, Textarea, Select, NumberInput,
  Slider, Checkbox, CheckboxGroup, Switch, SwitchGroup, RadioGroup,
  SegmentedControl, OTPInput, Rating, FormField, InputGroup,
  DatePicker, TagInput, ComboBox, FileUpload, ColorPicker,
  MaskInput, TreeSelect, PinInput, AutoComplete,
  Table, Card, Avatar, AvatarGroup, Stat, Timeline, Progress,
  Skeleton, TreeView, DataList, List, TimeAgo, Countdown,
  Alert, EmptyState, Banner, ConfirmDialog, Notification, Callout, LoadingOverlay,
  Tabs, Breadcrumb, Pagination, Stepper, Navbar, NavMenu, AppSidebar, ScrollProgress,
  Modal, Drawer, Tooltip, Popover, DropdownMenu, ContextMenu,
  CommandPalette, HoverCard, SheetDialog, Popconfirm,
  Collapsible, InlineEdit,
  Image, Carousel, VideoPlayer, LineChart, BarChart, AreaChart,
  DonutChart, SparkLine, ProgressRing, AnimatedCounter,
  CopyButton, ColorSwatch, Marquee, ReadMore, HighlightText,
  ScrollToTop, QRCode, ClipboardInput,
  GlitchText, TypewriterText, NoiseBg, BrutalistCard, type NoiseBlendMode,
  ThemeProvider, Accordion, Tour,
  useToast,
} from 'fxui-core';

// ── Data ─────────────────────────────────────────────────────────────────────

const chartData = [
  { month: 'Jan', revenue: 4200, users: 820, expenses: 3100 },
  { month: 'Feb', revenue: 5800, users: 1100, expenses: 3600 },
  { month: 'Mar', revenue: 4900, users: 960, expenses: 3400 },
  { month: 'Apr', revenue: 7200, users: 1380, expenses: 4100 },
  { month: 'May', revenue: 6500, users: 1250, expenses: 3900 },
  { month: 'Jun', revenue: 8900, users: 1720, expenses: 4700 },
];

const donutData = [
  { label: 'TypeScript', value: 62, color: '#0066FF' },
  { label: 'React', value: 21, color: '#FFE500' },
  { label: 'CSS', value: 11, color: '#FF2D78' },
  { label: 'Other', value: 6, color: '#00FF94' },
];

const tableData = [
  { id: 1, name: 'Alice Park', role: 'Admin', status: 'Active', joined: '2024-01' },
  { id: 2, name: 'Bob Chen', role: 'Editor', status: 'Away', joined: '2024-03' },
  { id: 3, name: 'Carol Wu', role: 'Viewer', status: 'Offline', joined: '2024-05' },
  { id: 4, name: 'Dan Lee', role: 'Admin', status: 'Active', joined: '2023-11' },
];

const treeNodes = [
  { id: '1', label: 'packages/', children: [
    { id: '1-1', label: 'fxui/', children: [
      { id: '1-1-1', label: 'src/', children: [
        { id: '1-1-1-1', label: 'components/' },
        { id: '1-1-1-2', label: 'index.ts' },
      ]},
    ]},
  ]},
  { id: '2', label: 'apps/', children: [
    { id: '2-1', label: 'docs/', children: [
      { id: '2-1-1', label: 'app/' },
    ]},
  ]},
  { id: '3', label: 'package.json' },
];

const timelineItems = [
  { title: 'v2.0 shipped', description: '117 components, full TypeScript', timestamp: 'Today', status: 'success' as const },
  { title: 'Beta released', description: 'Public testing phase', timestamp: '3 days ago', status: 'default' as const },
  { title: 'Alpha build', description: 'Internal testing', timestamp: '2 weeks ago', status: 'default' as const },
  { title: 'Project started', description: 'First commit', timestamp: '3 months ago', status: 'default' as const },
];

// ── Layout primitives ─────────────────────────────────────────────────────────

function Section({ title, accent = 'yellow', children }: {
  title: string;
  accent?: 'yellow' | 'pink' | 'green' | 'blue' | 'purple';
  children: React.ReactNode;
}) {
  const accentMap = {
    yellow: 'border-fx-yellow bg-fx-yellow',
    pink: 'border-fx-pink bg-fx-pink',
    green: 'border-fx-green bg-fx-green',
    blue: 'border-fx-blue bg-fx-blue',
    purple: 'border-fx-purple bg-fx-purple',
  };
  return (
    <section className="mt-20 first:mt-0">
      <div className="flex items-center gap-4 mb-8">
        <div className={`h-5 w-5 border-2 border-fx-black rounded-[2px] shrink-0 ${accentMap[accent]}`} />
        <h2 className="font-display font-black text-3xl text-fx-black uppercase tracking-wider">{title}</h2>
        <div className="flex-1 border-t-2 border-fx-black opacity-10" />
      </div>
      <div className="space-y-0">
        {children}
      </div>
    </section>
  );
}

function Row({ name, wide, children }: {
  name: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`group py-7 border-b border-gray-100 last:border-0 ${wide ? 'flex flex-col gap-4' : 'flex gap-8 items-start'}`}>
      {wide ? (
        <>
          <span className="font-mono text-[11px] font-black uppercase tracking-[0.15em] text-gray-400">{name}</span>
          <div className="w-full">{children}</div>
        </>
      ) : (
        <>
          <span className="font-mono text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 w-32 sm:w-44 shrink-0 pt-0.5">{name}</span>
          <div className="flex-1 flex flex-wrap gap-3 items-center min-w-0">{children}</div>
        </>
      )}
    </div>
  );
}

// ── Sub-component demos ───────────────────────────────────────────────────────

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => toast({ title: 'Saved!', variant: 'success', description: 'Your changes were saved.' })}>Success</Button>
      <Button size="sm" variant="outline" onClick={() => toast({ title: 'Heads up', variant: 'warning', description: 'Review before publishing.' })}>Warning</Button>
      <Button size="sm" variant="destructive" onClick={() => toast({ title: 'Error', variant: 'error', description: 'Something went wrong.' })}>Error</Button>
      <Button size="sm" variant="ghost" onClick={() => toast({ title: 'FYI', description: 'Just letting you know.' })}>Default</Button>
    </div>
  );
}

function CmdDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Kbd className="text-[10px] mr-1.5">⌘K</Kbd> Open palette
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={[
          { id: '1', label: 'Button', group: 'Components', action: () => {} },
          { id: '2', label: 'Badge', group: 'Components', action: () => {} },
          { id: '3', label: 'LineChart', group: 'Charts', action: () => {} },
          { id: '4', label: 'Go to Showcase', group: 'Pages', action: () => {} },
          { id: '5', label: 'Toggle dark mode', group: 'Actions', action: () => {} },
        ]}
      />
    </>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ShowcasePage() {
  // mounted guard — prevents Date.now() hydration mismatch (#425)
  const [mounted, setMounted] = useState(false);
  const nowRef = React.useRef(0);
  React.useEffect(() => { nowRef.current = Date.now(); setMounted(true); }, []);

  // shared state
  const [sliderVal, setSliderVal] = useState(65);
  const [checkA, setCheckA] = useState(true);
  const [checkB, setCheckB] = useState(false);
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(false);
  const [ratingVal, setRatingVal] = useState(4);
  const [radioVal, setRadioVal] = useState('pro');
  const [segVal, setSegVal] = useState('preview');
  const [otpVal, setOtpVal] = useState('');
  const [pinVal, setPinVal] = useState('');
  const [tagsVal, setTagsVal] = useState(['fxui', 'react', 'typescript']);
  const [comboVal, setComboVal] = useState<string | null>(null);
  const [colorVal, setColorVal] = useState('#FFE500');
  const [page, setPage] = useState(3);
  const [stepperStep, setStepperStep] = useState(1);
  const [inlineVal, setInlineVal] = useState('Click to edit this text');
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-16">

      {/* Hero */}
      <div className="mb-20">
        <div className="inline-block bg-fx-yellow border-2 border-fx-black px-3 py-0.5 font-mono text-xs font-black uppercase mb-4">
          117 components · Live demos
        </div>
        <h1 className="font-display text-[3rem] sm:text-[5rem] md:text-[88px] font-black text-fx-black leading-none tracking-tight">Showcase</h1>
        <p className="text-gray-500 font-sans mt-4 text-xl max-w-lg">
          Every FXUI component, all variants, fully interactive.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════ CORE */}
      <Section title="Core" accent="yellow">

        <Row name="Button">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="neon">Neon</Button>
          <Button variant="destructive">Destructive</Button>
          <Divider orientation="vertical" className="h-6 mx-1" />
          <Button size="sm">sm</Button>
          <Button size="md">md</Button>
          <Button size="lg">lg</Button>
          <Button size="icon">⚡</Button>
          <Divider orientation="vertical" className="h-6 mx-1" />
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button leftIcon={<span>⚡</span>}>With icon</Button>
          <Button rightIcon={<span>→</span>}>Right icon</Button>
        </Row>

        <Row name="Badge">
          <Badge>Default</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
          <Badge color="info">Info</Badge>
          <Divider orientation="vertical" className="h-6 mx-1" />
          <Badge variant="outline">Outline</Badge>
          <Badge variant="outline" color="success">Outline success</Badge>
          <Badge variant="outline" color="error">Outline error</Badge>
          <Divider orientation="vertical" className="h-6 mx-1" />
          <Badge variant="neon">Neon</Badge>
          <Badge variant="neon" color="success">Neon success</Badge>
          <Badge variant="neon" color="error">Neon error</Badge>
          <Divider orientation="vertical" className="h-6 mx-1" />
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </Row>

        <Row name="Chip">
          <Chip>Default</Chip>
          <Chip variant="filled">Filled</Chip>
          <Chip variant="yellow">Yellow</Chip>
          <Chip variant="pink">Pink</Chip>
          <Chip variant="green">Green</Chip>
          <Chip variant="blue">Blue</Chip>
          <Chip variant="purple">Purple</Chip>
          <Divider orientation="vertical" className="h-6 mx-1" />
          <Chip size="sm">Small</Chip>
          <Chip size="md">Medium</Chip>
          <Chip size="lg">Large</Chip>
          <Divider orientation="vertical" className="h-6 mx-1" />
          <Chip variant="yellow" onClose={() => {}}>Closeable</Chip>
          <Chip variant="pink" onClose={() => {}} icon="🚀">With icon</Chip>
        </Row>

        <Row name="Tag">
          <Tag>Default</Tag>
          <Tag variant="outline">Outline</Tag>
          <Tag variant="neon">Neon</Tag>
          <Tag variant="ghost">Ghost</Tag>
          <Divider orientation="vertical" className="h-6 mx-1" />
          <Tag variant="outline" color="success">Success</Tag>
          <Tag variant="outline" color="warning">Warning</Tag>
          <Tag variant="outline" color="error">Error</Tag>
          <Tag variant="outline" color="info">Info</Tag>
          <Divider orientation="vertical" className="h-6 mx-1" />
          <Tag size="sm" variant="outline">Small</Tag>
          <Tag size="md" variant="outline">Medium</Tag>
          <Divider orientation="vertical" className="h-6 mx-1" />
          <Tag closeable onClose={() => {}}>Closeable</Tag>
        </Row>

        <Row name="Kbd">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></div>
            <div className="flex items-center gap-1"><Kbd>Ctrl</Kbd><span className="text-gray-400 text-xs">+</span><Kbd>Shift</Kbd><span className="text-gray-400 text-xs">+</span><Kbd>P</Kbd></div>
            <div className="flex items-center gap-1"><Kbd>Alt</Kbd><span className="text-gray-400 text-xs">+</span><Kbd>F4</Kbd></div>
            <div className="flex items-center gap-1"><Kbd size="sm">⌘</Kbd><Kbd size="sm">Z</Kbd></div>
            <div className="flex items-center gap-1"><Kbd size="lg">Space</Kbd></div>
          </div>
        </Row>

        <Row name="Divider">
          <div className="w-full space-y-4">
            <Divider />
            <Divider label="or continue with" />
            <Divider label="Section title" labelPlacement="start" />
            <Divider label="Section title" labelPlacement="end" />
            <Divider variant="dashed" />
            <div className="flex gap-3 items-stretch h-10">
              <span className="text-sm text-gray-500 self-center">Left</span>
              <Divider orientation="vertical" />
              <span className="text-sm text-gray-500 self-center">Center</span>
              <Divider orientation="vertical" />
              <span className="text-sm text-gray-500 self-center">Right</span>
            </div>
          </div>
        </Row>

        <Row name="Spinner">
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
          <Divider orientation="vertical" className="h-8 mx-1" />
          <Spinner variant="default" size="md" />
          <Spinner variant="primary" size="md" />
          <Spinner variant="neon" size="md" />
          <span className="bg-fx-black rounded-full p-0.5"><Spinner variant="white" size="md" /></span>
        </Row>

        <Row name="FloatingActionButton">
          <div className="relative h-28 w-full sm:w-72 border-2 border-dashed border-gray-300 rounded-[4px] overflow-hidden bg-gray-50 flex items-center justify-center">
            <span className="text-xs text-gray-400">Position demo</span>
            <FloatingActionButton icon="+" label="Add item" position="bottom-right" style={{ position: 'absolute' }} />
            <FloatingActionButton icon="★" label="Favourite" variant="yellow" position="bottom-left" style={{ position: 'absolute' }} />
            <FloatingActionButton icon="↑" label="Scroll up" variant="default" position="top-right" style={{ position: 'absolute' }} />
          </div>
        </Row>
      </Section>

      {/* ══════════════════════════════════════════════════════ TYPOGRAPHY */}
      <Section title="Typography" accent="blue">

        <Row name="Heading" wide>
          <div className="space-y-2">
            <Heading as="h1" size="display">Display heading</Heading>
            <Heading as="h1" size="h1">H1 — Page title</Heading>
            <Heading as="h2" size="h2">H2 — Section title</Heading>
            <Heading as="h3" size="h3">H3 — Subsection</Heading>
            <Heading as="h4" size="h4">H4 — Group label</Heading>
            <Heading as="h5" size="h5">H5 — Small heading</Heading>
            <Heading as="h6" size="h6" color="muted">H6 — Caption label</Heading>
          </div>
        </Row>

        <Row name="Text">
          <Text size="xl" weight="black">Extra large black</Text>
          <Text size="lg" weight="bold">Large bold</Text>
          <Text size="base">Regular body text</Text>
          <Text size="sm" color="muted">Small muted helper</Text>
          <Text size="xs" color="muted" className="font-mono">xs monospace</Text>
          <Divider orientation="vertical" className="h-8 mx-1" />
          <Text className="italic">Italic text</Text>
          <Text className="underline">Underlined</Text>
          <Text className="line-through">Strikethrough</Text>
        </Row>

        <Row name="GradientText">
          <GradientText gradient="sunset" as="p" className="font-black text-2xl">Sunset gradient</GradientText>
          <GradientText gradient="ocean" as="p" className="font-black text-2xl">Ocean gradient</GradientText>
          <GradientText gradient="neon" as="p" className="font-black text-2xl">Neon gradient</GradientText>
          <GradientText gradient="fire" as="p" className="font-black text-2xl">Fire gradient</GradientText>
          <GradientText gradient="electric" as="p" className="font-black text-2xl">Electric gradient</GradientText>
        </Row>

        <Row name="Label">
          <Label>Default label</Label>
          <Label required>Required *</Label>
          <Label optional>Optional</Label>
          <Label size="sm">Small</Label>
          <Label size="lg">Large</Label>
        </Row>

        <Row name="Caption">
          <Caption>Helper text</Caption>
          <Caption variant="error">Email is invalid</Caption>
          <Caption variant="success">Password strength: strong</Caption>
          <Caption variant="warning">Too long, max 160 chars</Caption>
        </Row>

        <Row name="Blockquote" wide>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Blockquote>Default blockquote with no variant.</Blockquote>
            <Blockquote variant="yellow" author="FXUI">Neo-brutalism with zero apologies.</Blockquote>
            <Blockquote variant="pink" author="Design">Bold. Raw. Unapologetic.</Blockquote>
            <Blockquote variant="green" author="Dev">Ship with confidence.</Blockquote>
          </div>
        </Row>

        <Row name="Code">
          <div className="w-full space-y-3">
            <p className="text-sm text-gray-600">
              Install with <Code>pnpm add fxui-core</Code> and import <Code>{'<Button />'}</Code> directly.
            </p>
            <Code block className="text-sm">{`import { Button, Badge, useToast } from 'fxui-core';\n\nexport default function App() {\n  const { toast } = useToast();\n  return <Button onClick={() => toast({ title: 'Hello!' })}>Click me</Button>;\n}`}</Code>
          </div>
        </Row>

        <Row name="PullQuote" wide>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <PullQuote accent="yellow">"Bold. Raw. Unapologetically different."</PullQuote>
            <PullQuote accent="pink" size="lg">"Ship fast, look good."</PullQuote>
            <PullQuote accent="green" size="sm">"117 components. Zero compromises."</PullQuote>
          </div>
        </Row>
      </Section>

      {/* ══════════════════════════════════════════════════════════ LAYOUT */}
      <Section title="Layout" accent="green">

        <Row name="Stack" wide>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">direction=&quot;column&quot; gap=&quot;2&quot;</p>
              <Stack gap="2">
                {['A','B','C'].map(l => <div key={l} className="bg-fx-yellow border-2 border-fx-black px-3 py-1 text-sm font-bold text-center">{l}</div>)}
              </Stack>
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">direction=&quot;row&quot; gap=&quot;3&quot;</p>
              <Stack direction="row" gap="3">
                {['X','Y','Z'].map(l => <div key={l} className="bg-fx-pink border-2 border-fx-black px-3 py-1 text-sm font-bold text-white">{l}</div>)}
              </Stack>
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">align=&quot;center&quot; gap=&quot;4&quot;</p>
              <Stack direction="row" gap="4" align="center">
                <div className="bg-fx-green border-2 border-fx-black h-6 w-6" />
                <div className="bg-fx-green border-2 border-fx-black h-10 w-10" />
                <div className="bg-fx-green border-2 border-fx-black h-14 w-14" />
              </Stack>
            </div>
          </div>
        </Row>

        <Row name="Grid" wide>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">cols=&quot;4&quot; gap=&quot;3&quot;</p>
              <Grid cols="4" gap="3">
                {[1,2,3,4,5,6,7,8].map(n => <div key={n} className="bg-fx-blue border-2 border-fx-black h-10 flex items-center justify-center font-black text-white text-sm">{n}</div>)}
              </Grid>
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">cols=&quot;3&quot; gap=&quot;2&quot;</p>
              <Grid cols="3" gap="2">
                {[1,2,3,4,5,6].map(n => <div key={n} className="bg-fx-purple border-2 border-fx-black h-8 flex items-center justify-center font-black text-white text-sm">{n}</div>)}
              </Grid>
            </div>
          </div>
        </Row>

        <Row name="Flex" wide>
          <div className="space-y-3">
            {(['between','around','evenly','start','center','end'] as const).map(j => (
              <div key={j}>
                <p className="text-xs font-mono text-gray-400 mb-1">justify=&quot;{j}&quot;</p>
                <Flex justify={j} className="bg-gray-50 border border-gray-200 rounded-[4px] p-2 w-full">
                  {['■','●','▲'].map(s => <div key={s} className="bg-fx-black text-white text-xs w-8 h-8 flex items-center justify-center font-bold">{s}</div>)}
                </Flex>
              </div>
            ))}
          </div>
        </Row>

        <Row name="AspectRatio" wide>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(['square', 'video', 'portrait', 'wide'] as const).map(r => (
              <div key={r}>
                <p className="text-xs font-mono text-gray-400 mb-1">ratio=&quot;{r}&quot;</p>
                <AspectRatio ratio={r} className="bg-fx-yellow border-2 border-fx-black">
                  <div className="flex items-center justify-center h-full font-black text-xs">{r}</div>
                </AspectRatio>
              </div>
            ))}
          </div>
        </Row>

        <Row name="ScrollArea">
          <ScrollArea className="h-32 w-48 sm:w-56 border-2 border-fx-black rounded-[4px]">
            <div className="p-3 space-y-2">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="text-sm font-sans text-gray-600 flex items-center gap-2">
                  <span className="w-4 h-4 bg-fx-yellow border border-fx-black shrink-0 flex items-center justify-center text-[10px] font-black">{i+1}</span>
                  Item {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Row>

        <Row name="SplitLayout" wide>
          <SplitLayout className="h-24 w-full border-2 border-fx-black rounded-[4px] overflow-hidden" defaultSplit={40}>
            <div className="bg-fx-yellow h-full flex items-center justify-center font-black text-sm">Left panel</div>
            <div className="bg-fx-pink h-full flex items-center justify-center font-black text-sm text-white">Right panel — drag the divider</div>
          </SplitLayout>
        </Row>

        <Row name="Masonry" wide>
          <Masonry columns={5} gap={8} className="w-full">
            {[70, 40, 90, 55, 35, 80, 50, 65, 45, 75].map((h, i) => (
              <div key={i} className="border-2 border-fx-black rounded-[4px] mb-2 flex items-center justify-center font-black text-sm"
                style={{ height: h, background: ['#FFE500','#FF2D78','#00FF94','#0066FF','#7C3AED'][i % 5] }}>
                {i+1}
              </div>
            ))}
          </Masonry>
        </Row>
      </Section>

      {/* ════════════════════════════════════════════════════════════ FORM */}
      <Section title="Form" accent="pink">

        <Row name="Input" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Default" placeholder="Enter text..." />
            <Input label="With hint" placeholder="name@example.com" hint="We'll never share your email." />
            <Input label="Error state" placeholder="Enter text..." error="This field is required." />
            <Input label="Disabled" placeholder="Can't type here" disabled />
            <Input label="Read only" defaultValue="Read only value" readOnly />
            <Input label="Filled variant" variant="filled" placeholder="Filled style..." />
          </div>
        </Row>

        <Row name="PasswordInput" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PasswordInput label="Password" placeholder="Enter password..." />
            <PasswordInput label="With hint" placeholder="••••••••" hint="Min 8 characters" />
            <PasswordInput label="Error" placeholder="••••••••" error="Password too short." />
          </div>
        </Row>

        <Row name="SearchInput" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SearchInput placeholder="Search components..." />
            <SearchInput placeholder="Filter results..." />
            <SearchInput placeholder="Clearable..." defaultValue="some value" />
          </div>
        </Row>

        <Row name="Textarea" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Textarea label="Default" placeholder="Write something..." rows={3} />
            <Textarea label="Error state" placeholder="Write something..." rows={3} error="This field is required." />
            <Textarea label="With counter" placeholder="Max 200 characters..." maxLength={200} showCount rows={3} />
          </div>
        </Row>

        <Row name="Select" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select label="Framework" placeholder="Pick one">
              <Select.Item value="next">Next.js</Select.Item>
              <Select.Item value="remix">Remix</Select.Item>
              <Select.Item value="astro">Astro</Select.Item>
              <Select.Item value="vite">Vite</Select.Item>
            </Select>
            <Select label="With groups" placeholder="Select country">
              <Select.Group label="Europe">
                <Select.Item value="de">Germany</Select.Item>
                <Select.Item value="fr">France</Select.Item>
              </Select.Group>
              <Select.Group label="Asia">
                <Select.Item value="jp">Japan</Select.Item>
                <Select.Item value="kr">Korea</Select.Item>
              </Select.Group>
            </Select>
            <Select label="Disabled" placeholder="Can't select" disabled>
              <Select.Item value="a">Option A</Select.Item>
            </Select>
          </div>
        </Row>

        <Row name="NumberInput" wide>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <NumberInput label="Default" defaultValue={5} />
            <NumberInput label="Min / Max" min={0} max={100} defaultValue={42} />
            <NumberInput label="Step 5" step={5} defaultValue={20} />
            <NumberInput label="Disabled" defaultValue={10} disabled />
          </div>
        </Row>

        <Row name="Slider" wide>
          <div className="space-y-6 w-full max-w-lg">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">Value: {sliderVal}</p>
              <Slider value={[sliderVal]} onValueChange={v => setSliderVal(v[0])} min={0} max={100} />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">Range slider</p>
              <Slider defaultValue={[20, 80]} min={0} max={100} />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">Step 10</p>
              <Slider defaultValue={[50]} min={0} max={100} step={10} />
            </div>
          </div>
        </Row>

        <Row name="Checkbox">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" checked={checkA} onCheckedChange={v => setCheckA(Boolean(v))} />
          <Checkbox label="Indeterminate" checked="indeterminate" />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled checked" checked disabled />
        </Row>

        <Row name="CheckboxGroup" wide>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <CheckboxGroup label="Vertical (default)" options={[
              { value: 'ts', label: 'TypeScript' },
              { value: 'react', label: 'React' },
              { value: 'css', label: 'CSS' },
            ]} defaultValue={['ts', 'react']} />
            <CheckboxGroup label="More options" options={[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
              { value: 'c', label: 'Option C' },
            ]} defaultValue={['a']} />
            <CheckboxGroup label="With disabled" options={[
              { value: 'x', label: 'Available' },
              { value: 'y', label: 'Disabled option', disabled: true },
              { value: 'z', label: 'Available too' },
            ]} defaultValue={['x']} />
          </div>
        </Row>

        <Row name="Switch">
          <Switch label="Off" checked={switchB} onCheckedChange={setSwitchB} />
          <Switch label="On" checked={switchA} onCheckedChange={setSwitchA} />
          <Switch label="Disabled off" disabled />
          <Switch label="Disabled on" checked disabled />
          <Divider orientation="vertical" className="h-8 mx-1" />
          <Switch label="With description" defaultChecked description="Get notified via email" />
        </Row>

        <Row name="SwitchGroup" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SwitchGroup label="Notification settings" options={[
              { value: 'email', label: 'Email notifications' },
              { value: 'sms', label: 'SMS alerts' },
              { value: 'push', label: 'Push notifications' },
              { value: 'marketing', label: 'Marketing emails' },
            ]} defaultValue={['email', 'push']} />
            <SwitchGroup label="Privacy controls" options={[
              { value: 'profile', label: 'Public profile' },
              { value: 'search', label: 'Searchable by email' },
              { value: 'activity', label: 'Show activity status' },
            ]} defaultValue={['profile']} />
          </div>
        </Row>

        <Row name="RadioGroup" wide>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <RadioGroup label="Plan" value={radioVal} onValueChange={setRadioVal} options={[
              { value: 'free', label: 'Free' },
              { value: 'pro', label: 'Pro — $12/mo' },
              { value: 'enterprise', label: 'Enterprise' },
            ]} />
            <RadioGroup label="Delivery" defaultValue="standard" options={[
              { value: 'standard', label: 'Standard (5-7 days)' },
              { value: 'express', label: 'Express (2-3 days)' },
              { value: 'overnight', label: 'Overnight' },
            ]} />
            <RadioGroup label="Disabled option" defaultValue="a" options={[
              { value: 'a', label: 'Available' },
              { value: 'b', label: 'Unavailable', disabled: true },
              { value: 'c', label: 'Available' },
            ]} />
          </div>
        </Row>

        <Row name="SegmentedControl" wide>
          <div className="space-y-4">
            <SegmentedControl value={segVal} onChange={setSegVal} options={[
              { value: 'preview', label: 'Preview' },
              { value: 'code', label: 'Code' },
              { value: 'api', label: 'API' },
            ]} />
            <SegmentedControl defaultValue="day" options={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'year', label: 'Year' },
            ]} />
            <SegmentedControl defaultValue="md" size="sm" options={[
              { value: 'sm', label: 'SM' },
              { value: 'md', label: 'MD' },
              { value: 'lg', label: 'LG' },
              { value: 'xl', label: 'XL' },
            ]} />
          </div>
        </Row>

        <Row name="OTPInput" wide>
          <div className="space-y-4">
            <OTPInput length={6} value={otpVal} onChange={setOtpVal} />
            <OTPInput length={4} size="sm" />
            <OTPInput length={6} size="lg" type="alphanumeric" />
          </div>
        </Row>

        <Row name="Rating">
          <Rating value={ratingVal} onChange={setRatingVal} max={5} />
          <Rating defaultValue={3} max={5} />
          <Rating defaultValue={4} max={10} size="sm" />
          <Rating defaultValue={4} max={5} readOnly />
          <Rating max={5} disabled />
        </Row>

        <Row name="FormField" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField label="Username" hint="3–20 characters, no spaces" required>
              <Input placeholder="your_handle" />
            </FormField>
            <FormField label="Email" error="Not a valid email address">
              <Input placeholder="name@example.com" error="Not a valid email address" />
            </FormField>
            <FormField label="Bio" hint="Tell us about yourself">
              <Textarea placeholder="I love building UIs..." rows={2} />
            </FormField>
          </div>
        </Row>

        <Row name="InputGroup" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputGroup prefix="https://" suffix=".com" placeholder="yoursite" />
            <InputGroup prefix="$" placeholder="0.00" type="number" />
            <InputGroup suffix="kg" placeholder="Weight" type="number" />
          </div>
        </Row>
      </Section>

      {/* ════════════════════════════════════════════════════ FORM ADVANCED */}
      <Section title="Form Advanced" accent="purple">

        <Row name="DatePicker" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DatePicker label="Single date" placeholder="Pick a date" />
            <DatePicker label="With default" placeholder="Pick a date" />
            <DatePicker label="Disabled" placeholder="Not available" disabled />
          </div>
        </Row>

        <Row name="TagInput" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TagInput label="Skills" value={tagsVal} onChange={setTagsVal} placeholder="Add a tag..." />
            <TagInput label="Allowed tags only" placeholder="type: 'react' or 'vue'..." />
          </div>
        </Row>

        <Row name="ComboBox" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ComboBox label="Country" placeholder="Search..." value={comboVal} onChange={setComboVal}
              options={[
                { value: 'tr', label: 'Turkey' },
                { value: 'de', label: 'Germany' },
                { value: 'us', label: 'United States' },
                { value: 'jp', label: 'Japan' },
                { value: 'au', label: 'Australia' },
              ]}
            />
            <ComboBox label="Framework" placeholder="Select or type..."
              options={[
                { value: 'next', label: 'Next.js' },
                { value: 'remix', label: 'Remix' },
                { value: 'astro', label: 'Astro' },
              ]}
            />
            <ComboBox label="Disabled" placeholder="Not available" disabled
              options={[{ value: 'a', label: 'Option A' }]}
            />
          </div>
        </Row>

        <Row name="FileUpload" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FileUpload label="Default" accept=".png,.jpg,.gif" />
            <FileUpload label="Multiple files" multiple accept=".pdf,.doc,.docx" />
          </div>
        </Row>

        <Row name="ColorPicker">
          <ColorPicker label="Brand color" value={colorVal} onChange={setColorVal} />
          <ColorPicker label="Accent" defaultValue="#FF2D78" />
          <ColorPicker label="Blue" defaultValue="#0066FF" />
        </Row>

        <Row name="MaskInput" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MaskInput label="Phone" mask="(999) 999-9999" placeholder="(555) 000-0000" />
            <MaskInput label="Date" mask="99/99/9999" placeholder="MM/DD/YYYY" />
            <MaskInput label="Credit card" mask="9999 9999 9999 9999" placeholder="1234 5678 9012 3456" />
          </div>
        </Row>

        <Row name="TreeSelect" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TreeSelect label="Location" placeholder="Select region..."
              options={[
                { value: 'eu', label: 'Europe', children: [
                  { value: 'de', label: 'Germany' },
                  { value: 'fr', label: 'France' },
                  { value: 'nl', label: 'Netherlands' },
                ]},
                { value: 'as', label: 'Asia', children: [
                  { value: 'jp', label: 'Japan' },
                  { value: 'kr', label: 'Korea' },
                ]},
              ]}
            />
            <TreeSelect label="Category" placeholder="Select category..."
              options={[
                { value: 'ui', label: 'UI Components', children: [
                  { value: 'form', label: 'Form' },
                  { value: 'data', label: 'Data Display' },
                ]},
                { value: 'util', label: 'Utilities' },
              ]}
            />
          </div>
        </Row>

        <Row name="PinInput" wide>
          <div className="space-y-4">
            <div><p className="text-xs font-mono text-gray-400 mb-2">Regular</p><PinInput length={4} value={pinVal} onChange={setPinVal} /></div>
            <div><p className="text-xs font-mono text-gray-400 mb-2">Masked</p><PinInput length={4} masked /></div>
            <div><p className="text-xs font-mono text-gray-400 mb-2">Non-numeric · 6 digits</p><PinInput length={6} numeric={false} /></div>
          </div>
        </Row>

        <Row name="AutoComplete" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AutoComplete placeholder="Search frameworks..."
              options={[
                { value: 'next', label: 'Next.js' },
                { value: 'remix', label: 'Remix' },
                { value: 'astro', label: 'Astro' },
                { value: 'svelte', label: 'SvelteKit' },
                { value: 'nuxt', label: 'Nuxt' },
              ]}
            />
            <AutoComplete placeholder="Search countries..."
              options={[
                { value: 'tr', label: 'Turkey' },
                { value: 'de', label: 'Germany' },
                { value: 'jp', label: 'Japan' },
              ]}
            />
            <AutoComplete placeholder="Disabled" disabled
              options={[{ value: 'a', label: 'Option' }]}
            />
          </div>
        </Row>
      </Section>

      {/* ══════════════════════════════════════════════════ DATA DISPLAY */}
      <Section title="Data Display" accent="green">

        <Row name="Table" wide>
          <Table className="w-full">
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Joined</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {tableData.map(r => (
                <Table.Row key={r.id}>
                  <Table.Cell>{r.id}</Table.Cell>
                  <Table.Cell className="font-bold">{r.name}</Table.Cell>
                  <Table.Cell>{r.role}</Table.Cell>
                  <Table.Cell>
                    <Badge color={r.status === 'Active' ? 'success' : r.status === 'Away' ? 'warning' : 'default'} size="sm">
                      {r.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="font-mono text-xs text-gray-500">{r.joined}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Row>

        <Row name="Card" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <Card.Header><p className="font-bold">Simple card</p></Card.Header>
              <Card.Body><p className="text-sm text-gray-600">Body content goes here.</p></Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <p className="font-black text-lg">Revenue</p>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </Card.Header>
              <Card.Body>
                <p className="font-display font-black text-4xl">$48,250</p>
                <p className="text-sm text-green-600 font-bold mt-1">↑ 12% vs last month</p>
              </Card.Body>
              <Card.Footer><Button size="sm" variant="outline">View report</Button></Card.Footer>
            </Card>
            <Card variant="elevated">
              <Card.Header><p className="font-bold">Elevated variant</p></Card.Header>
              <Card.Body><p className="text-sm text-gray-600">Elevated shadow style.</p></Card.Body>
            </Card>
          </div>
        </Row>

        <Row name="Avatar">
          <Avatar size="xs" fallback="XS" />
          <Avatar size="sm" fallback="SM" />
          <Avatar size="md" fallback="MD" />
          <Avatar size="lg" fallback="LG" />
          <Avatar size="xl" fallback="XL" />
          <Divider orientation="vertical" className="h-12 mx-2" />
          <Avatar fallback="AP" color="yellow" />
          <Avatar fallback="BC" color="pink" />
          <Avatar fallback="CW" color="green" />
          <Avatar fallback="DL" color="blue" />
          <Avatar fallback="EK" color="purple" />
          <Divider orientation="vertical" className="h-12 mx-2" />
          <Avatar src="https://picsum.photos/seed/a1/100" alt="User" />
          <Avatar src="https://picsum.photos/seed/a2/100" alt="User" shape="square" />
        </Row>

        <Row name="AvatarGroup">
          <AvatarGroup avatars={[
            { name: 'Alice Park', color: 'yellow' },
            { name: 'Bob Chen', color: 'pink' },
            { name: 'Carol Wu', color: 'green' },
            { name: 'Dan Lee', color: 'blue' },
            { name: 'Eva Kim', color: 'purple' },
            { name: 'Frank Liu', color: 'yellow' },
            { name: 'Grace Park', color: 'pink' },
          ]} max={4} />
          <AvatarGroup avatars={[
            { name: 'Alice Park', color: 'yellow' },
            { name: 'Bob Chen', color: 'pink' },
            { name: 'Carol Wu', color: 'green' },
          ]} size="lg" max={3} />
          <AvatarGroup avatars={[
            { name: 'Alice Park', color: 'yellow' },
            { name: 'Bob Chen', color: 'pink' },
          ]} size="sm" />
        </Row>

        <Row name="Stat" wide>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat label="Revenue" value="$48K" trend="up" change="+12%" />
            <Stat label="Active users" value="1,720" trend="up" change="+8%" />
            <Stat label="Churn rate" value="2.4%" trend="down" change="-0.3%" />
            <Stat label="Errors" value="0" trend="neutral" change="±0" />
          </div>
        </Row>

        <Row name="Timeline" wide>
          <Timeline items={timelineItems} />
        </Row>

        <Row name="Progress" wide>
          <div className="space-y-3 w-full max-w-lg">
            <Progress value={sliderVal} color="default" showValue label="Default" />
            <Progress value={72} color="success" showValue label="Deployed" />
            <Progress value={38} color="warning" showValue label="Quota" />
            <Progress value={91} color="error" showValue label="Disk" />
            <Progress value={55} color="info" showValue label="Download" />
            <Progress value={80} size="sm" color="default" />
            <Progress value={80} size="lg" color="success" showValue />
          </div>
        </Row>

        <Row name="Skeleton" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-24 w-full rounded-[4px]" />
            </div>
          </div>
        </Row>

        <Row name="TreeView" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TreeView nodes={treeNodes} selectable />
            <TreeView nodes={treeNodes} defaultExpanded={['1', '1-1']} selectable />
          </div>
        </Row>

        <Row name="DataList" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DataList items={[
              { label: 'Version', value: '1.0.0' },
              { label: 'License', value: 'MIT' },
              { label: 'Components', value: '117' },
            ]} />
            <DataList striped items={[
              { label: 'Author', value: 'FXUI Team' },
              { label: 'Updated', value: 'Jun 2026' },
              { label: 'Bundle', value: '398 KB' },
            ]} />
            <DataList orientation="horizontal" items={[
              { label: 'React', value: '18.x' },
              { label: 'TypeScript', value: '5.x' },
              { label: 'Tailwind', value: '3.x' },
            ]} />
          </div>
        </Row>

        <Row name="List" wide>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <List variant="bullet" items={['TypeScript', 'Tailwind CSS', 'Radix UI', 'Storybook']} />
            <List variant="numbered" items={['Install package', 'Add provider', 'Import components', 'Ship it']} />
            <List variant="check" items={['forwardRef', 'Dark mode', 'Accessible', 'Typed']} />
            <List variant="neo" items={['Button', 'Badge', 'Input', 'Modal']} />
          </div>
        </Row>

        <Row name="TimeAgo">
          <div className="flex flex-wrap gap-4 text-sm font-sans text-gray-600">
            {mounted && (
              <>
                <TimeAgo date={new Date(nowRef.current - 30000)} />
                <TimeAgo date={new Date(nowRef.current - 3600000 * 2)} />
                <TimeAgo date={new Date(nowRef.current - 86400000 * 3)} />
                <TimeAgo date={new Date(nowRef.current - 86400000 * 30)} />
                <TimeAgo date={new Date('2024-01-01')} />
              </>
            )}
          </div>
        </Row>

        <Row name="Countdown" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">7 days from now</p>
              {mounted && <Countdown targetDate={new Date(nowRef.current + 86400000 * 7)} />}
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">1 hour from now</p>
              {mounted && <Countdown targetDate={new Date(nowRef.current + 3600000)} />}
            </div>
          </div>
        </Row>
      </Section>

      {/* ═══════════════════════════════════════════════════════ FEEDBACK */}
      <Section title="Feedback" accent="yellow">

        <Row name="Toast">
          <ToastDemo />
        </Row>

        <Row name="Alert" wide>
          <div className="space-y-2 w-full">
            <Alert variant="default" title="Note">Just so you know — this is a default alert.</Alert>
            <Alert variant="info" title="Info">Your trial expires in 3 days. Upgrade to Pro to continue.</Alert>
            <Alert variant="success" title="Deployed!">Your app is live at fxui-docs.vercel.app</Alert>
            <Alert variant="warning" title="Heads up">You're approaching your monthly API limit.</Alert>
            <Alert variant="error" title="Build failed">Check your TypeScript errors before deploying.</Alert>
          </div>
        </Row>

        <Row name="EmptyState" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <EmptyState icon="📭" title="No results" description="Try a different search term."
              action={<Button size="sm">Clear filters</Button>} />
            <EmptyState icon="🗂" title="No files" description="Upload your first file to get started."
              action={<Button size="sm" variant="neon">Upload file</Button>} />
            <EmptyState icon="✉️" title="Inbox zero" description="You're all caught up." />
          </div>
        </Row>

        <Row name="Banner" wide>
          <div className="space-y-2 w-full">
            <Banner variant="info">v2.0 is now available — <strong>see what's new</strong>.</Banner>
            <Banner variant="success">Your plan was upgraded to Pro successfully.</Banner>
            <Banner variant="warning">Scheduled maintenance on Saturday, June 28 at 2AM UTC.</Banner>
          </div>
        </Row>

        <Row name="ConfirmDialog">
          <ConfirmDialog title="Delete project?" description="This action is permanent and cannot be undone."
            confirmLabel="Delete" destructive onConfirm={() => {}}
            trigger={<Button variant="destructive" size="sm">Delete project</Button>}
          />
          <ConfirmDialog title="Archive component?" description="You can restore it later from the archive."
            confirmLabel="Archive" onConfirm={() => {}}
            trigger={<Button variant="outline" size="sm">Archive</Button>}
          />
          <ConfirmDialog title="Publish changes?" description="This will make your changes visible to everyone."
            confirmLabel="Publish" onConfirm={() => {}}
            trigger={<Button size="sm">Publish</Button>}
          />
        </Row>

        <Row name="Notification" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Notification title="New message" description="Alice sent you a file: design_system_v2.fig" icon="💬" timestamp="just now" />
            <Notification title="Build succeeded" description="Your deployment to production is complete." icon="✅" timestamp="2m ago" variant="success" />
            <Notification title="Payment received" description="$299 from Acme Inc." icon="💳" timestamp="1h ago" />
            <Notification title="Error detected" description="API rate limit exceeded on /v2/components." icon="⚠️" timestamp="3h ago" variant="error" />
          </div>
        </Row>

        <Row name="Callout" wide>
          <div className="space-y-2 w-full">
            <Callout variant="tip">Use <Code>React.forwardRef</Code> on every component to enable ref forwarding.</Callout>
            <Callout variant="info">All FXUI components support the <Code>className</Code> prop for style overrides.</Callout>
            <Callout variant="warning">Avoid using the <Code>any</Code> type — FXUI ships with full TypeScript types.</Callout>
            <Callout variant="danger">Never pass <Code>children</Code> to self-closing HTML elements like <Code>{'<input>'}</Code>.</Callout>
          </div>
        </Row>

        <Row name="LoadingOverlay" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(['Processing…','Uploading…','Please wait…'] as const).map(msg => (
              <div key={msg} className="relative h-24 border-2 border-fx-black rounded-[4px] overflow-hidden bg-gray-50 flex items-center justify-center">
                <p className="text-xs text-gray-400">{msg.replace('…','')}</p>
                <LoadingOverlay visible message={msg} />
              </div>
            ))}
          </div>
        </Row>
      </Section>

      {/* ═══════════════════════════════════════════════════ NAVIGATION */}
      <Section title="Navigation" accent="blue">

        <Row name="Tabs" wide>
          <div className="space-y-6">
            <Tabs defaultValue="a">
              <Tabs.List>
                <Tabs.Trigger value="a">Overview</Tabs.Trigger>
                <Tabs.Trigger value="b">Components</Tabs.Trigger>
                <Tabs.Trigger value="c">API</Tabs.Trigger>
                <Tabs.Trigger value="d" disabled>Disabled</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="a"><p className="text-sm text-gray-600 mt-3">Overview content. Switch tabs to explore.</p></Tabs.Content>
              <Tabs.Content value="b"><p className="text-sm text-gray-600 mt-3">117 components across 15 categories.</p></Tabs.Content>
              <Tabs.Content value="c"><p className="text-sm text-gray-600 mt-3">Full TypeScript API reference.</p></Tabs.Content>
              <Tabs.Content value="d"><p className="text-sm text-gray-600 mt-3">Disabled.</p></Tabs.Content>
            </Tabs>
            <Tabs defaultValue="x" variant="pills">
              <Tabs.List>
                <Tabs.Trigger value="x">Pills</Tabs.Trigger>
                <Tabs.Trigger value="y">Variant</Tabs.Trigger>
                <Tabs.Trigger value="z">Tabs</Tabs.Trigger>
              </Tabs.List>
            </Tabs>
          </div>
        </Row>

        <Row name="Breadcrumb" wide>
          <div className="space-y-3">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Components', href: '/showcase' }, { label: 'Breadcrumb' }]} />
            <Breadcrumb separator="›" items={[{ label: 'Docs', href: '/' }, { label: 'Navigation', href: '#' }, { label: 'Breadcrumb' }]} />
            <Breadcrumb separator="/" items={[{ label: 'root', href: '/' }, { label: 'apps', href: '#' }, { label: 'docs', href: '#' }, { label: 'page.tsx' }]} />
          </div>
        </Row>

        <Row name="Pagination" wide>
          <div className="space-y-4">
            <Pagination totalPages={10} page={page} onPageChange={setPage} />
            <Pagination totalPages={10} page={page} onPageChange={setPage} siblingCount={2} />
            <Pagination totalPages={5} page={1} onPageChange={() => {}} showFirstLast />
          </div>
        </Row>

        <Row name="Stepper" wide>
          <div className="space-y-6">
            <div>
              <Stepper currentStep={stepperStep} steps={[
                { title: 'Account', description: 'Create your account' },
                { title: 'Profile', description: 'Set up your profile' },
                { title: 'Billing', description: 'Add payment method' },
                { title: 'Done', description: 'Ready to ship!' },
              ]} />
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" onClick={() => setStepperStep(s => Math.max(0, s - 1))}>← Prev</Button>
                <Button size="sm" onClick={() => setStepperStep(s => Math.min(3, s + 1))}>Next →</Button>
              </div>
            </div>
            <Stepper orientation="vertical" currentStep={1} steps={[
              { title: 'Step 1', description: 'First step done' },
              { title: 'Step 2', description: 'In progress...' },
              { title: 'Step 3', description: 'Coming up' },
            ]} />
          </div>
        </Row>

        <Row name="Navbar" wide>
          <div className="border-2 border-fx-black rounded-[4px] overflow-hidden">
            <Navbar logo={<span className="font-display font-black text-xl">FXUI</span>}>
              <a href="#" className="text-sm font-bold px-3 py-1.5 rounded-[4px] hover:bg-gray-100 transition-colors">Docs</a>
              <a href="#" className="text-sm font-bold px-3 py-1.5 rounded-[4px] hover:bg-gray-100 transition-colors">Components</a>
              <a href="#" className="text-sm font-bold px-3 py-1.5 bg-fx-black text-white rounded-[4px]">Showcase</a>
              <Badge color="success" size="sm">v2.0</Badge>
            </Navbar>
          </div>
        </Row>

        <Row name="NavMenu" wide>
          <NavMenu items={[
            {
              label: 'Products',
              group: {
                trigger: 'Products',
                links: [
                  { label: 'Components', href: '/showcase', description: '117 UI components' },
                  { label: 'Documentation', href: '/docs/getting-started', description: 'Guides and API reference' },
                ],
              },
            },
            {
              label: 'Resources',
              group: {
                trigger: 'Resources',
                links: [
                  { label: 'Storybook', href: '#', description: 'Interactive component explorer' },
                  { label: 'GitHub', href: '#', description: 'Open source repository' },
                ],
              },
            },
            { label: 'Changelog', href: '#' },
          ]} />
        </Row>

        <Row name="AppSidebar" wide>
          <div className="w-40 sm:w-52 border-2 border-fx-black rounded-[4px] overflow-hidden">
            <AppSidebar sections={[
              {
                title: 'Getting Started',
                items: [
                  { label: 'Installation', icon: '⬇', href: '#' },
                  { label: 'Showcase', icon: '◈', href: '#', active: true },
                ],
              },
              {
                title: 'Components',
                items: [
                  { label: 'Button', icon: '▣', href: '#' },
                  { label: 'Badge', icon: '◉', href: '#' },
                  { label: 'Input', icon: '▤', href: '#' },
                ],
              },
            ]} />
          </div>
        </Row>

        <Row name="ScrollProgress">
          <div className="space-y-2 w-full">
            <p className="text-xs font-mono text-gray-400">Fixed reading progress — positioned at top of viewport.</p>
            <ScrollProgress color="yellow" position="top" />
            <div className="flex gap-2">
              <Badge variant="neon">yellow</Badge>
              <Badge variant="outline">blue</Badge>
              <Badge variant="outline">pink</Badge>
              <Badge variant="outline">green</Badge>
            </div>
          </div>
        </Row>
      </Section>

      {/* ═══════════════════════════════════════════════════════ OVERLAY */}
      <Section title="Overlay" accent="pink">

        <Row name="Modal">
          <Modal>
            <Modal.Trigger asChild>
              <Button size="sm">Default modal</Button>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Header><p className="font-black text-lg">Confirm action</p></Modal.Header>
              <Modal.Body><p className="text-sm text-gray-600">This modal is built on Radix UI Dialog. Accessible, keyboard navigable, focus trapped.</p></Modal.Body>
              <Modal.Footer>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Confirm</Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <Modal>
            <Modal.Trigger asChild><Button size="sm" variant="outline">Form modal</Button></Modal.Trigger>
            <Modal.Content>
              <Modal.Header><p className="font-black">Edit profile</p></Modal.Header>
              <Modal.Body className="space-y-3">
                <Input label="Name" placeholder="Your name" />
                <Input label="Email" placeholder="name@example.com" />
              </Modal.Body>
              <Modal.Footer><Button size="sm">Save</Button></Modal.Footer>
            </Modal.Content>
          </Modal>
        </Row>

        <Row name="Drawer">
          <Drawer><Drawer.Trigger asChild><Button size="sm">Right drawer</Button></Drawer.Trigger>
            <Drawer.Content placement="right">
              <Drawer.Header><p className="font-black text-base">Settings</p></Drawer.Header>
              <Drawer.Body><p className="text-sm text-gray-600">Slides in from the right.</p></Drawer.Body>
            </Drawer.Content>
          </Drawer>
          <Drawer><Drawer.Trigger asChild><Button size="sm" variant="outline">Left drawer</Button></Drawer.Trigger>
            <Drawer.Content placement="left">
              <Drawer.Header><p className="font-black text-base">Navigation</p></Drawer.Header>
              <Drawer.Body><p className="text-sm text-gray-600">Slides in from the left.</p></Drawer.Body>
            </Drawer.Content>
          </Drawer>
          <Drawer><Drawer.Trigger asChild><Button size="sm" variant="outline">Bottom</Button></Drawer.Trigger>
            <Drawer.Content placement="bottom">
              <Drawer.Header><p className="font-black text-base">Sheet</p></Drawer.Header>
              <Drawer.Body><p className="text-sm text-gray-600">Slides up from the bottom.</p></Drawer.Body>
            </Drawer.Content>
          </Drawer>
        </Row>

        <Row name="Tooltip">
          <Tooltip content="This tooltip appears on top" placement="top"><Button size="sm" variant="outline">Top</Button></Tooltip>
          <Tooltip content="This tooltip appears on the right" placement="right"><Button size="sm" variant="outline">Right</Button></Tooltip>
          <Tooltip content="Bottom tooltip" placement="bottom"><Button size="sm" variant="outline">Bottom</Button></Tooltip>
          <Tooltip content="Left tooltip" placement="left"><Button size="sm" variant="outline">Left</Button></Tooltip>
          <Tooltip content={<><strong>Rich content</strong><br />Tooltips support <em>JSX</em></>} placement="top">
            <Button size="sm" variant="ghost">Rich tooltip</Button>
          </Tooltip>
        </Row>

        <Row name="Popover">
          <Popover>
            <Popover.Trigger asChild><Button size="sm" variant="outline">Open popover</Button></Popover.Trigger>
            <Popover.Content>
              <p className="font-bold text-sm mb-1">Quick actions</p>
              <p className="text-xs text-gray-500 mb-3">Choose an action to continue.</p>
              <div className="flex gap-2">
                <Button size="sm">Edit</Button>
                <Button size="sm" variant="outline">Duplicate</Button>
              </div>
            </Popover.Content>
          </Popover>
          <Popover>
            <Popover.Trigger asChild><Button size="sm" variant="ghost">Filter ▾</Button></Popover.Trigger>
            <Popover.Content>
              <CheckboxGroup label="Status" options={[
                { value: 'active', label: 'Active' },
                { value: 'away', label: 'Away' },
                { value: 'offline', label: 'Offline' },
              ]} defaultValue={['active']} />
            </Popover.Content>
          </Popover>
        </Row>

        <Row name="DropdownMenu">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild><Button size="sm" variant="outline">File ▾</Button></DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>New file</DropdownMenu.Item>
              <DropdownMenu.Item>Open…</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Save</DropdownMenu.Item>
              <DropdownMenu.Item>Save As…</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item destructive>Close</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenu.Trigger asChild><Button size="sm" variant="outline">With icons ▾</Button></DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item icon="✏️">Edit</DropdownMenu.Item>
              <DropdownMenu.Item icon="📋">Duplicate</DropdownMenu.Item>
              <DropdownMenu.Item icon="🔗">Copy link</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item icon="🗑" destructive>Delete</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </Row>

        <Row name="ContextMenu">
          <ContextMenu>
            <ContextMenu.Trigger asChild>
              <div className="border-2 border-dashed border-fx-black rounded-[4px] px-8 py-5 text-sm text-gray-500 cursor-default select-none hover:bg-gray-50 transition-colors">
                Right-click anywhere in this area to open the context menu
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item icon="✏️">Edit</ContextMenu.Item>
              <ContextMenu.Item icon="📋">Copy</ContextMenu.Item>
              <ContextMenu.Item icon="📌">Pin</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item icon="🗑" destructive>Delete</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </Row>

        <Row name="CommandPalette">
          <CmdDemo />
        </Row>

        <Row name="HoverCard">
          <HoverCard trigger={<span className="font-bold underline cursor-pointer text-fx-blue">@fxui</span>}>
            <div className="space-y-1">
              <p className="font-black text-sm">FXUI</p>
              <p className="text-xs text-gray-500">Neo-brutalist React UI library. 117 components.</p>
              <div className="flex gap-2 mt-2">
                <Badge size="sm" color="success">Open source</Badge>
                <Badge size="sm" color="info">MIT</Badge>
              </div>
            </div>
          </HoverCard>
          <HoverCard trigger={<span className="font-bold underline cursor-pointer">Button component</span>}>
            <div className="space-y-2">
              <p className="font-black text-sm">Button</p>
              <Code className="text-xs">{'import { Button } from \'fxui-core\''}</Code>
              <p className="text-xs text-gray-500">10 variants · 5 sizes · fully typed</p>
            </div>
          </HoverCard>
        </Row>

        <Row name="SheetDialog">
          <SheetDialog trigger={<Button size="sm" variant="outline">Right sheet</Button>} title="Sheet panel" description="Large sliding panel for complex forms or detail views." side="right" />
          <SheetDialog trigger={<Button size="sm" variant="outline">Left sheet</Button>} title="Navigation" description="Navigation sheet from the left side." side="left" />
          <SheetDialog trigger={<Button size="sm" variant="ghost">Bottom sheet</Button>} title="Quick actions" description="Actions sheet from the bottom." side="bottom" />
        </Row>

        <Row name="Popconfirm">
          <Popconfirm title="Delete this item?" description="This action cannot be undone." onConfirm={() => {}}
            trigger={<Button size="sm" variant="destructive">Delete</Button>} variant="danger" />
          <Popconfirm title="Archive?" description="You can restore it later." onConfirm={() => {}}
            trigger={<Button size="sm" variant="outline">Archive</Button>} />
          <Popconfirm title="Submit?" description="Send this form to the server." onConfirm={() => {}} side="top"
            trigger={<Button size="sm">Submit form</Button>} />
        </Row>
      </Section>

      {/* ═══════════════════════════════════════════════════ INTERACTION */}
      <Section title="Interaction" accent="green">

        <Row name="Collapsible" wide>
          <div className="space-y-2 w-full max-w-xl">
            <Collapsible title="What is FXUI?" defaultOpen>
              <p className="text-sm text-gray-600">A neo-brutalist React component library with 117 components, built with TypeScript, Tailwind CSS, and Radix UI.</p>
            </Collapsible>
            <Collapsible title="How many components?">
              <p className="text-sm text-gray-600">117 components across 15 categories: Core, Layout, Typography, Form, Form Advanced, Data Display, Feedback, Navigation, Overlay, Interaction, Media & Chart, Utility, Special, Theme, and Misc.</p>
            </Collapsible>
            <Collapsible title="Is it accessible?">
              <p className="text-sm text-gray-600">Yes. All interactive components use Radix UI primitives which are fully ARIA-compliant and keyboard navigable.</p>
            </Collapsible>
          </div>
        </Row>

        <Row name="InlineEdit" wide>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-1">Click to edit</p>
              <InlineEdit defaultValue={inlineVal} onSave={setInlineVal} />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-1">Heading style</p>
              <InlineEdit defaultValue="Project title" onSave={() => {}} className="font-black text-2xl font-display" />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-1">Textarea mode</p>
              <InlineEdit defaultValue="Multi-line editable text..." onSave={() => {}} />
            </div>
          </div>
        </Row>
      </Section>

      {/* ═══════════════════════════════════════════════ MEDIA & CHART */}
      <Section title="Media & Chart" accent="purple">

        {/* ── Image ───────────────────────────────────────── */}
        <Row name="Image — ratios" wide>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">square</p>
              <Image src="https://picsum.photos/seed/fxa/400/400" alt="Square" ratio="square" bordered rounded shadow />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">video (16/9)</p>
              <Image src="https://picsum.photos/seed/fxb/600/340" alt="Video" ratio="video" bordered rounded shadow />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">photo (4/3)</p>
              <Image src="https://picsum.photos/seed/fxc/400/300" alt="Photo" ratio="photo" bordered rounded shadow />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">wide (21/9)</p>
              <Image src="https://picsum.photos/seed/fxd/600/260" alt="Wide" ratio="wide" bordered rounded shadow />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">portrait (3/4)</p>
              <Image src="https://picsum.photos/seed/fxe/300/400" alt="Portrait" ratio="portrait" bordered rounded shadow />
            </div>
          </div>
        </Row>

        <Row name="Image — effects" wide>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">zoom on hover</p>
              <Image src="https://picsum.photos/seed/fxf/400/300" alt="Zoom" ratio="photo" bordered rounded zoom />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">badge corner</p>
              <Image src="https://picsum.photos/seed/fxg/400/300" alt="Badge" ratio="photo" bordered rounded badge="NEW" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">gradient overlay</p>
              <Image
                src="https://picsum.photos/seed/fxh/400/300" alt="Gradient" ratio="photo" bordered rounded gradient
                overlay={<span className="text-fx-white font-display font-black text-lg leading-tight">Bold.<br/>Raw.</span>}
              />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">error fallback</p>
              {/* data: URI triggers onError once — no network request, no retry loop */}
              <Image src="data:image/jpeg,invalid" alt="Broken image demo" ratio="photo" bordered rounded />
            </div>
          </div>
        </Row>

        <Row name="Image — caption" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Image src="https://picsum.photos/seed/fxi/600/350" alt="Caption example" ratio="video" bordered rounded shadow caption="Neo-brutalist design with a shadow-fx drop" />
            <Image src="https://picsum.photos/seed/fxj/600/350" alt="Zoom + badge" ratio="video" bordered rounded shadow zoom badge="SALE" caption="Zoom on hover + corner badge" />
            <Image src="https://picsum.photos/seed/fxk/600/350" alt="Gradient + overlay" ratio="video" bordered rounded shadow gradient
              overlay={<div className="w-full"><span className="text-xs font-mono text-fx-white/60">FXUI</span><p className="text-fx-white font-display font-black text-xl">Component Library</p></div>}
              caption="gradient + text overlay"
            />
          </div>
        </Row>

        {/* ── Carousel ─────────────────────────────────────── */}
        <Row name="Carousel — dots (default)" wide>
          <Carousel
            ratio="16/9"
            className="w-full border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden"
            items={[
              <div key={1} className="h-full min-h-[200px] bg-fx-yellow flex items-center justify-center font-display font-black text-4xl">Slide 01</div>,
              <div key={2} className="h-full min-h-[200px] bg-fx-pink flex items-center justify-center font-display font-black text-4xl text-white">Slide 02</div>,
              <div key={3} className="h-full min-h-[200px] bg-fx-green flex items-center justify-center font-display font-black text-4xl">Slide 03</div>,
              <div key={4} className="h-full min-h-[200px] bg-fx-blue flex items-center justify-center font-display font-black text-4xl text-white">Slide 04</div>,
            ]}
          />
        </Row>

        <Row name="Carousel — nav variants" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">navVariant=&quot;pills&quot;</p>
              <Carousel
                navVariant="pills"
                className="border-2 border-fx-black rounded-[4px] overflow-hidden"
                items={[
                  <div key={1} className="h-32 bg-fx-yellow flex items-center justify-center font-display font-black text-2xl">One</div>,
                  <div key={2} className="h-32 bg-fx-pink flex items-center justify-center font-display font-black text-2xl text-white">Two</div>,
                  <div key={3} className="h-32 bg-fx-green flex items-center justify-center font-display font-black text-2xl">Three</div>,
                ]}
              />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">navVariant=&quot;numbers&quot;</p>
              <Carousel
                navVariant="numbers"
                className="border-2 border-fx-black rounded-[4px] overflow-hidden"
                items={[
                  <div key={1} className="h-32 bg-fx-blue flex items-center justify-center font-display font-black text-2xl text-white">One</div>,
                  <div key={2} className="h-32 bg-fx-purple flex items-center justify-center font-display font-black text-2xl text-white">Two</div>,
                  <div key={3} className="h-32 bg-fx-yellow flex items-center justify-center font-display font-black text-2xl">Three</div>,
                ]}
              />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">navVariant=&quot;bar&quot; (progress)</p>
              <Carousel
                navVariant="bar"
                className="border-2 border-fx-black rounded-[4px] overflow-hidden"
                items={[
                  <div key={1} className="h-32 bg-fx-green flex items-center justify-center font-display font-black text-2xl">Step 1</div>,
                  <div key={2} className="h-32 bg-fx-blue flex items-center justify-center font-display font-black text-2xl text-white">Step 2</div>,
                  <div key={3} className="h-32 bg-fx-pink flex items-center justify-center font-display font-black text-2xl text-white">Step 3</div>,
                  <div key={4} className="h-32 bg-fx-purple flex items-center justify-center font-display font-black text-2xl text-white">Step 4</div>,
                ]}
              />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">navVariant=&quot;none&quot; + text counter</p>
              <Carousel
                navVariant="none"
                className="border-2 border-fx-black rounded-[4px] overflow-hidden"
                items={[
                  <div key={1} className="h-32 bg-fx-yellow flex items-center justify-center font-display font-black text-2xl">A</div>,
                  <div key={2} className="h-32 bg-fx-pink flex items-center justify-center font-display font-black text-2xl text-white">B</div>,
                  <div key={3} className="h-32 bg-fx-green flex items-center justify-center font-display font-black text-2xl">C</div>,
                ]}
              />
            </div>
          </div>
        </Row>

        <Row name="Carousel — multi-slide" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">slidesToShow=2</p>
              <Carousel
                slidesToShow={2}
                gap={12}
                navVariant="pills"
                className="border-2 border-fx-black rounded-[4px] overflow-hidden"
                items={[
                  <div key={1} className="h-28 bg-fx-yellow flex items-center justify-center font-display font-black text-xl border-r-2 border-fx-black">1</div>,
                  <div key={2} className="h-28 bg-fx-pink flex items-center justify-center font-display font-black text-xl text-white border-r-2 border-fx-black">2</div>,
                  <div key={3} className="h-28 bg-fx-green flex items-center justify-center font-display font-black text-xl border-r-2 border-fx-black">3</div>,
                  <div key={4} className="h-28 bg-fx-blue flex items-center justify-center font-display font-black text-xl text-white border-r-2 border-fx-black">4</div>,
                  <div key={5} className="h-28 bg-fx-purple flex items-center justify-center font-display font-black text-xl text-white">5</div>,
                ]}
              />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">slidesToShow=3</p>
              <Carousel
                slidesToShow={3}
                gap={8}
                navVariant="bar"
                className="border-2 border-fx-black rounded-[4px] overflow-hidden"
                items={[
                  <div key={1} className="h-28 bg-fx-yellow flex items-center justify-center font-display font-black">A</div>,
                  <div key={2} className="h-28 bg-fx-green flex items-center justify-center font-display font-black">B</div>,
                  <div key={3} className="h-28 bg-fx-blue flex items-center justify-center font-display font-black text-white">C</div>,
                  <div key={4} className="h-28 bg-fx-pink flex items-center justify-center font-display font-black text-white">D</div>,
                  <div key={5} className="h-28 bg-fx-purple flex items-center justify-center font-display font-black text-white">E</div>,
                  <div key={6} className="h-28 bg-fx-yellow flex items-center justify-center font-display font-black">F</div>,
                ]}
              />
            </div>
          </div>
        </Row>

        <Row name="Carousel — thumbnails" wide>
          <Carousel
            thumbnails={[
              'https://picsum.photos/seed/th1/200/150',
              'https://picsum.photos/seed/th2/200/150',
              'https://picsum.photos/seed/th3/200/150',
              'https://picsum.photos/seed/th4/200/150',
            ]}
            navVariant="none"
            showArrows={false}
            className="border-2 border-fx-black rounded-[4px] overflow-visible shadow-fx"
            items={[
              <Image key={1} src="https://picsum.photos/seed/th1/800/450" alt="Slide 1" ratio="video" objectFit="cover" className="w-full" />,
              <Image key={2} src="https://picsum.photos/seed/th2/800/450" alt="Slide 2" ratio="video" objectFit="cover" className="w-full" />,
              <Image key={3} src="https://picsum.photos/seed/th3/800/450" alt="Slide 3" ratio="video" objectFit="cover" className="w-full" />,
              <Image key={4} src="https://picsum.photos/seed/th4/800/450" alt="Slide 4" ratio="video" objectFit="cover" className="w-full" />,
            ]}
          />
        </Row>

        {/* ── VideoPlayer ──────────────────────────────────── */}
        <Row name="VideoPlayer — themes" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">theme=&quot;yellow&quot; (default)</p>
              <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" theme="yellow" caption="Big Buck Bunny — yellow controls" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">theme=&quot;pink&quot;</p>
              <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" theme="pink" caption="Pink accent controls" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">theme=&quot;green&quot;</p>
              <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" theme="green" caption="Green accent controls" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">theme=&quot;blue&quot;</p>
              <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" theme="blue" caption="Blue accent controls" />
            </div>
          </div>
        </Row>

        <Row name="VideoPlayer — options" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">ratio=&quot;4/3&quot; + showShortcuts</p>
              <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" theme="yellow" ratio="4/3" showShortcuts caption="Focus the player and use Space/Arrow keys" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-2">loop + muted + autoPlay</p>
              <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" theme="green" loop muted autoPlay caption="Autoplays muted in a loop" />
            </div>
          </div>
        </Row>

        <Row name="LineChart" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">Single series</p>
              <LineChart data={chartData} xKey="month" height={200} showGrid showDots
                series={[{ key: 'revenue', label: 'Revenue', color: '#0066FF' }]}
                className="!border-0 !shadow-none !p-0"
              />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">Multi series</p>
              <LineChart data={chartData} xKey="month" height={200} showGrid curved
                series={[
                  { key: 'revenue', label: 'Revenue', color: '#0066FF' },
                  { key: 'expenses', label: 'Expenses', color: '#FF2D78' },
                ]}
                className="!border-0 !shadow-none !p-0"
              />
            </div>
          </div>
        </Row>

        <Row name="BarChart" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">Single bar</p>
              <BarChart data={chartData} xKey="month" height={200} showGrid radius={2}
                series={[{ key: 'users', label: 'Users', color: '#FF2D78' }]}
                className="!border-0 !shadow-none !p-0"
              />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">Grouped bars</p>
              <BarChart data={chartData} xKey="month" height={200} showGrid
                series={[
                  { key: 'revenue', label: 'Revenue', color: '#0066FF' },
                  { key: 'users', label: 'Users', color: '#00FF94' },
                ]}
                className="!border-0 !shadow-none !p-0"
              />
            </div>
          </div>
        </Row>

        <Row name="AreaChart" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">Single area</p>
              <AreaChart data={chartData} xKey="month" height={200} showGrid
                series={[{ key: 'revenue', label: 'Revenue', color: '#00FF94' }]}
                className="!border-0 !shadow-none !p-0"
              />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">Stacked areas</p>
              <AreaChart data={chartData} xKey="month" height={200} showGrid stacked
                series={[
                  { key: 'revenue', label: 'Revenue', color: '#0066FF' },
                  { key: 'expenses', label: 'Expenses', color: '#FF2D78' },
                ]}
                className="!border-0 !shadow-none !p-0"
              />
            </div>
          </div>
        </Row>

        <Row name="DonutChart" wide>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">Donut</p>
              <DonutChart data={donutData} centerLabel="Stack" centerValue="4" height={200}
                className="!border-0 !shadow-none !p-0"
              />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">Pie variant</p>
              <DonutChart data={donutData} variant="pie" height={200}
                className="!border-0 !shadow-none !p-0"
              />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 mb-2">No legend</p>
              <DonutChart data={donutData} showLegend={false} centerLabel="Total" centerValue="100" height={200}
                className="!border-0 !shadow-none !p-0"
              />
            </div>
          </div>
        </Row>

        <Row name="SparkLine" wide>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { data: [3,7,2,9,5,8,4,11], trend: 'up' as const, label: 'Revenue up' },
              { data: [11,8,6,9,4,7,3,5], trend: 'down' as const, label: 'Churn down' },
              { data: [5,5,6,5,6,5,6,5], trend: 'neutral' as const, label: 'Stable' },
              { data: [1,3,2,8,5,9,7,12], trend: 'up' as const, label: 'Users up' },
            ].map(({ data, trend, label }) => (
              <div key={label}>
                <p className="text-xs font-mono text-gray-400 mb-2">{label}</p>
                <SparkLine data={data} trend={trend} showTrend />
              </div>
            ))}
          </div>
        </Row>

        <Row name="ProgressRing" wide>
          <div className="flex gap-8 flex-wrap">
            {([
              { value: 28, color: 'yellow', label: 'Q1' },
              { value: 55, color: 'blue', label: 'Q2' },
              { value: 72, color: 'green', label: 'Q3' },
              { value: 90, color: 'pink', label: 'Q4' },
              { value: 100, color: 'purple', label: 'Done' },
            ] as const).map(({ value, color, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <ProgressRing value={value} color={color} showValue size={72} />
                <span className="text-xs font-mono text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </Row>

        <Row name="AnimatedCounter" wide>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: 117, prefix: '', suffix: '', label: 'Components' },
              { value: 48250, prefix: '$', suffix: '', label: 'Revenue' },
              { value: 99.9, prefix: '', suffix: '%', label: 'Uptime' },
              { value: 1720, prefix: '', suffix: ' users', label: 'Active' },
            ].map(({ value, prefix, suffix, label }) => (
              <div key={label} className="border-2 border-fx-black rounded-[4px] p-4 text-center">
                <AnimatedCounter value={value} prefix={prefix} suffix={suffix} className="font-display font-black text-3xl text-fx-black block" />
                <span className="text-xs font-mono text-gray-400 mt-1 block">{label}</span>
              </div>
            ))}
          </div>
        </Row>
      </Section>

      {/* ════════════════════════════════════════════════════════ UTILITY */}
      <Section title="Utility" accent="yellow">

        <Row name="CopyButton">
          <CopyButton value="pnpm add fxui-core" label="Copy install command" />
          <CopyButton value="pnpm add fxui-core" iconOnly />
          <CopyButton value="pnpm add fxui-core" label="Copy" variant="ghost" />
        </Row>

        <Row name="ColorSwatch" wide>
          <div className="flex flex-wrap gap-3">
            {[
              { color: '#FFE500', name: 'fx-yellow' },
              { color: '#FF2D78', name: 'fx-pink' },
              { color: '#00FF94', name: 'fx-green' },
              { color: '#0066FF', name: 'fx-blue' },
              { color: '#7C3AED', name: 'fx-purple' },
              { color: '#0a0a0a', name: 'fx-black' },
              { color: '#fafafa', name: 'fx-white' },
            ].map(({ color, name }) => (
              <ColorSwatch key={name} color={color} name={name} showHex size="md" />
            ))}
          </div>
        </Row>

        <Row name="Marquee" wide>
          <div className="space-y-3 w-full overflow-hidden">
            <Marquee speed={40}>
              {['FXUI','NEO-BRUTALISM','117 COMPONENTS','OPEN SOURCE','MIT LICENSE','TYPESCRIPT'].map(t => (
                <span key={t} className="font-display font-black text-sm mx-6 text-fx-black">◆ {t}</span>
              ))}
            </Marquee>
            <Marquee speed={25} direction="right">
              {['Button','Badge','Input','Modal','Table','Chart','Avatar','Timeline'].map(t => (
                <span key={t} className="font-mono text-xs mx-4 text-gray-500 border border-gray-200 px-2 py-0.5 rounded-[4px]">{t}</span>
              ))}
            </Marquee>
          </div>
        </Row>

        <Row name="ReadMore" wide>
          <div className="max-w-xl space-y-4">
            <ReadMore maxLines={2} className="text-sm text-gray-600">
              FXUI is a neo-brutalist React component library with 117 production-ready components built with TypeScript, Tailwind CSS, and Radix UI. Every component supports dark mode, forwardRef, and strict TypeScript types. The library ships with a fully typed API, Storybook stories, and MDX documentation for every component.
            </ReadMore>
            <ReadMore maxLines={3} className="text-sm text-gray-600">
              The design system follows a consistent set of rules: border-2 border-fx-black, shadow-fx for depth, rounded-[4px] for corners, and transition-all duration-150 for interactions. These rules create a cohesive, recognizable visual language that stands out in any application.
            </ReadMore>
          </div>
        </Row>

        <Row name="HighlightText" wide>
          <div className="space-y-2">
            <HighlightText text="Neo-brutalist design system with 117 components" highlight="brutalist" className="text-base" />
            <HighlightText text="Built with TypeScript, Tailwind CSS, and Radix UI" highlight={['TypeScript', 'Tailwind CSS', 'Radix UI']} className="text-base" />
            <HighlightText text="Bold. Raw. Unapologetically different." highlight="different" className="text-base" />
          </div>
        </Row>

        <Row name="ScrollToTop">
          <div className="relative h-20 w-full sm:w-60 border-2 border-fx-black rounded-[4px] overflow-hidden bg-gray-50 flex items-center justify-center">
            <span className="text-xs text-gray-400">Appears after 200px scroll</span>
            <ScrollToTop threshold={0} style={{ position: 'absolute', bottom: 8, right: 8 }} />
          </div>
        </Row>

        <Row name="QRCode" wide>
          <div className="flex gap-6">
            <div className="text-center space-y-1">
              <QRCode value="https://fxui-docs.vercel.app" size={80} />
              <p className="text-xs font-mono text-gray-400">size=80</p>
            </div>
            <div className="text-center space-y-1">
              <QRCode value="https://fxui-docs.vercel.app" size={120} />
              <p className="text-xs font-mono text-gray-400">size=120</p>
            </div>
            <div className="text-center space-y-1">
              <QRCode value="https://fxui-docs.vercel.app" size={160} />
              <p className="text-xs font-mono text-gray-400">size=160</p>
            </div>
          </div>
        </Row>

        <Row name="ClipboardInput" wide>
          <div className="grid grid-cols-2 gap-4 max-w-xl">
            <ClipboardInput value="pnpm add fxui-core" label="Install" />
            <ClipboardInput value="import { Button } from 'fxui-core'" label="Import" />
          </div>
        </Row>
      </Section>

      {/* ══════════════════════════════════════════════════════ SPECIAL */}
      <Section title="Special" accent="pink">

        <Row name="GlitchText" wide>
          <div className="flex flex-wrap gap-10">
            <GlitchText text="GLITCH" intensity="low" className="font-display font-black text-4xl" />
            <GlitchText text="GLITCH" intensity="medium" className="font-display font-black text-4xl" />
            <GlitchText text="GLITCH" intensity="high" className="font-display font-black text-4xl" />
          </div>
        </Row>

        <Row name="TypewriterText" wide>
          <div className="space-y-3">
            <TypewriterText texts={['Neo-brutalist.', 'TypeScript first.', '117 components.', 'Open source.']} className="font-bold font-sans text-xl" />
            <TypewriterText texts={['Bold.', 'Raw.', 'Unapologetic.']} className="font-display font-black text-3xl" speed={80} />
          </div>
        </Row>

        <Row name="NoiseBg — blend modes" wide>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {([
              ['overlay', 'bg-fx-yellow', 'text-fx-black'],
              ['soft-light', 'bg-fx-pink', 'text-white'],
              ['multiply', 'bg-fx-green', 'text-fx-black'],
              ['screen', 'bg-fx-black', 'text-white'],
            ] as [NoiseBlendMode, string, string][]).map(([mode, bg, text]) => (
              <div key={mode}>
                <p className="text-[10px] font-mono text-gray-400 mb-1">{mode}</p>
                <NoiseBg blendMode={mode} opacity={0.6} className={`${bg} ${text} border-2 border-fx-black rounded-[4px] h-24 flex items-center justify-center`}>
                  <span className="font-display font-black text-base uppercase">{mode}</span>
                </NoiseBg>
              </div>
            ))}
          </div>
        </Row>

        <Row name="NoiseBg — frequency" wide>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {([
              [0.2, 'Coarse'],
              [0.45, 'Medium'],
              [0.65, 'Fine'],
              [1.2, 'Micro'],
            ] as [number, string][]).map(([freq, label]) => (
              <div key={freq}>
                <p className="text-[10px] font-mono text-gray-400 mb-1">baseFrequency={freq}</p>
                <NoiseBg baseFrequency={freq} opacity={0.6} blendMode="overlay" className="bg-fx-blue text-white border-2 border-fx-black rounded-[4px] h-24 flex items-center justify-center">
                  <span className="font-display font-black text-base">{label}</span>
                </NoiseBg>
              </div>
            ))}
          </div>
        </Row>

        <Row name="NoiseBg — opacity + animated" wide>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {([0.1, 0.25, 0.5, 0.75, 1] as number[]).map((op) => (
              <div key={op}>
                <p className="text-[10px] font-mono text-gray-400 mb-1">opacity={op}</p>
                <NoiseBg opacity={op} blendMode="overlay" className="bg-fx-purple text-white border-2 border-fx-black rounded-[4px] h-20 flex items-center justify-center">
                  <span className="font-display font-black text-sm">{op}</span>
                </NoiseBg>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">animated (pulsing noise)</p>
              <NoiseBg animated opacity={0.6} blendMode="overlay" className="bg-fx-yellow text-fx-black border-2 border-fx-black rounded-[4px] h-24 flex items-center justify-center">
                <span className="font-display font-black text-base">Animated</span>
              </NoiseBg>
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">hard-light on dark</p>
              <NoiseBg blendMode="hard-light" opacity={0.7} numOctaves={6} className="bg-fx-black text-white border-2 border-fx-black rounded-[4px] h-24 flex items-center justify-center">
                <span className="font-display font-black text-base text-fx-yellow">Hard-light</span>
              </NoiseBg>
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-1">normal — raw grayscale noise</p>
              <NoiseBg blendMode="normal" opacity={0.8} className="bg-fx-pink text-white border-2 border-fx-black rounded-[4px] h-24 flex items-center justify-center">
                <span className="font-display font-black text-base">Normal</span>
              </NoiseBg>
            </div>
          </div>
        </Row>

        <Row name="BrutalistCard" wide>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(['yellow', 'pink', 'green', 'blue'] as const).map(accent => (
              <BrutalistCard key={accent} accent={accent} hoverable className="p-5">
                <p className="font-black font-display text-lg capitalize">{accent}</p>
                <p className="text-sm text-gray-600 mt-1">Neo-brutalist card with {accent} accent.</p>
                <Button size="sm" className="mt-3">Action</Button>
              </BrutalistCard>
            ))}
          </div>
        </Row>
      </Section>

      {/* ══════════════════════════════════════════════════════════ MISC */}
      <Section title="Misc" accent="blue">

        <Row name="Accordion" wide>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Accordion type="single" collapsible>
              <Accordion.Item value="q1">
                <Accordion.Trigger>What is FXUI?</Accordion.Trigger>
                <Accordion.Content>A neo-brutalist React component library with 117 components.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="q2">
                <Accordion.Trigger>How many components?</Accordion.Trigger>
                <Accordion.Content>117 production-ready components across 15 categories.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="q3">
                <Accordion.Trigger>Is it open source?</Accordion.Trigger>
                <Accordion.Content>Yes, licensed under MIT. Contributions are welcome.</Accordion.Content>
              </Accordion.Item>
            </Accordion>
            <Accordion type="multiple">
              <Accordion.Item value="a">
                <Accordion.Trigger>Multiple open — Item A</Accordion.Trigger>
                <Accordion.Content>Multiple items can be open simultaneously with type=&quot;multiple&quot;.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="b">
                <Accordion.Trigger>Item B</Accordion.Trigger>
                <Accordion.Content>Both A and B can be open at the same time.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="c">
                <Accordion.Trigger>Item C (disabled)</Accordion.Trigger>
                <Accordion.Content>This content.</Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        </Row>

        <Row name="Tour">
          <Button size="sm" onClick={() => setTourOpen(true)}>Start product tour</Button>
          <Tour open={tourOpen} onOpenChange={setTourOpen} steps={[
            { title: 'Welcome to FXUI!', content: 'This is the showcase page with all 117 components.' },
            { title: 'Neo-brutalist design', content: 'Bold borders, hard shadows, flat colors.' },
            { title: 'Fully interactive', content: 'Every component is live and interactive.' },
            { title: 'TypeScript first', content: 'Full type safety with strict TypeScript types.' },
            { title: 'Ready to ship!', content: 'Start building your neo-brutalist app today.' },
          ]} />
        </Row>

        <Row name="ThemeProvider">
          <ThemeProvider defaultColorMode="light">
            <div className="border-2 border-fx-black rounded-[4px] p-4 flex items-center gap-4">
              <Badge variant="neon" color="success">Light mode</Badge>
              <Badge variant="neon">Dark mode</Badge>
              <Badge variant="outline">Token overrides</Badge>
              <Code className="text-xs">{'<ThemeProvider defaultColorMode="dark">'}</Code>
            </div>
          </ThemeProvider>
        </Row>
      </Section>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t-2 border-fx-black flex items-center justify-between">
        <span className="font-display font-black text-2xl text-fx-black">FXUI</span>
        <p className="text-sm text-gray-400 font-mono">117 components · MIT License</p>
        <Badge variant="neon" color="success">v2.0</Badge>
      </div>

    </div>
  );
}
