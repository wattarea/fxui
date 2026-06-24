'use client';

import React, { useState } from 'react';
import {
  // CORE
  Button, Badge, Chip, Tag, Kbd, Divider, Spinner, FloatingActionButton,
  // LAYOUT
  Container, Stack, Flex, Grid, AspectRatio, ScrollArea, SplitLayout, Masonry,
  // TYPOGRAPHY
  Heading, Text, Label, Caption, Blockquote, Code, PullQuote, GradientText,
  // FORM
  Input, PasswordInput, SearchInput, Textarea, Select, NumberInput,
  Slider, Checkbox, CheckboxGroup, Switch, SwitchGroup, RadioGroup,
  SegmentedControl, OTPInput, Rating, FormField, InputGroup,
  // FORM ADVANCED
  DatePicker, TagInput, ComboBox, FileUpload, ColorPicker,
  MaskInput, TreeSelect, PinInput, AutoComplete,
  // DATA DISPLAY
  Table, Card, Avatar, AvatarGroup, Stat, Timeline, Progress,
  Skeleton, TreeView, DataList, List, TimeAgo, Countdown,
  // FEEDBACK
  Alert, EmptyState, Banner, ConfirmDialog, Notification, Callout, LoadingOverlay,
  // NAVIGATION
  Tabs, Breadcrumb, Pagination, Stepper, Navbar, NavMenu, AppSidebar, ScrollProgress,
  // OVERLAY
  Modal, Drawer, Tooltip, Popover, DropdownMenu, ContextMenu,
  CommandPalette, HoverCard, SheetDialog, Popconfirm,
  // INTERACTION
  Collapsible, InlineEdit,
  // MEDIA & CHART
  Image, Carousel, VideoPlayer, LineChart, BarChart, AreaChart,
  DonutChart, SparkLine, ProgressRing, AnimatedCounter,
  // UTILITY
  CopyButton, ColorSwatch, Marquee, ReadMore, HighlightText,
  ScrollToTop, QRCode, ClipboardInput,
  // SPECIAL
  GlitchText, TypewriterText, NoiseBg, BrutalistCard,
  // THEME
  ThemeProvider,
  // MISC
  Accordion, Tour,
  // hooks
  useToast,
} from '@fxui/core';

// ── Shared sample data ───────────────────────────────────────────────────────

const chartData = [
  { month: 'Jan', revenue: 4200, users: 820 },
  { month: 'Feb', revenue: 5800, users: 1100 },
  { month: 'Mar', revenue: 4900, users: 960 },
  { month: 'Apr', revenue: 7200, users: 1380 },
  { month: 'May', revenue: 6500, users: 1250 },
  { month: 'Jun', revenue: 8900, users: 1720 },
];

const donutData = [
  { label: 'TypeScript', value: 62, color: '#0066FF' },
  { label: 'React', value: 21, color: '#FFE500' },
  { label: 'CSS', value: 11, color: '#FF2D78' },
  { label: 'Other', value: 6, color: '#00FF94' },
];

const tableData = [
  { id: 1, name: 'Alice Park', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Chen', role: 'Editor', status: 'Away' },
  { id: 3, name: 'Carol Wu', role: 'Viewer', status: 'Offline' },
];

const treeNodes = [
  { id: '1', label: 'src', children: [
    { id: '1-1', label: 'components', children: [
      { id: '1-1-1', label: 'Button.tsx' },
      { id: '1-1-2', label: 'Badge.tsx' },
    ]},
    { id: '1-2', label: 'index.ts' },
  ]},
  { id: '2', label: 'package.json' },
];

const timelineItems = [
  { title: 'Deployed v2.0', description: '117 components shipped', timestamp: 'Today', status: 'success' as const },
  { title: 'Beta released', description: 'Public beta started', timestamp: '2 days ago', status: 'default' as const },
  { title: 'Alpha build', description: 'Internal testing', timestamp: '1 week ago', status: 'default' as const },
];

// ── Demo card wrapper ────────────────────────────────────────────────────────

function DemoCard({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-fx-black rounded-[4px] shadow-fx bg-white overflow-hidden">
      <div className="px-4 py-2 border-b-2 border-fx-black bg-gray-50">
        <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">{name}</span>
      </div>
      <div className="p-5 flex flex-col items-stretch gap-3 min-h-[80px] justify-center">
        {children}
      </div>
    </div>
  );
}

// ── Category header ──────────────────────────────────────────────────────────

const catColors: Record<string, string> = {
  CORE: 'bg-fx-yellow', LAYOUT: 'bg-fx-green', TYPOGRAPHY: 'bg-fx-blue',
  FORM: 'bg-fx-pink', 'FORM ADVANCED': 'bg-fx-purple', 'DATA DISPLAY': 'bg-fx-green',
  FEEDBACK: 'bg-fx-yellow', NAVIGATION: 'bg-fx-blue', OVERLAY: 'bg-fx-pink',
  INTERACTION: 'bg-fx-green', 'MEDIA & CHART': 'bg-fx-purple',
  UTILITY: 'bg-fx-yellow', SPECIAL: 'bg-fx-pink', THEME: 'bg-fx-purple', MISC: 'bg-fx-blue',
};

function CategoryHeader({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-14 first:mt-0">
      <span className={`h-4 w-4 rounded-[2px] border-2 border-fx-black ${catColors[name] ?? 'bg-gray-200'} shrink-0`} />
      <h2 className="font-display font-black text-2xl text-fx-black uppercase tracking-wider">{name}</h2>
      <span className="font-mono text-xs text-gray-400 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-[4px]">{count}</span>
      <div className="flex-1 border-t-2 border-dashed border-gray-200" />
    </div>
  );
}

// ── Toast demo ───────────────────────────────────────────────────────────────

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => toast({ title: 'Saved!', variant: 'success', description: 'Changes saved.' })}>
        Success toast
      </Button>
      <Button size="sm" variant="outline" onClick={() => toast({ title: 'Heads up', variant: 'warning', description: 'Review before publish.' })}>
        Warning toast
      </Button>
    </div>
  );
}

// ── CommandPalette demo ───────────────────────────────────────────────────────

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Kbd className="text-[10px] mr-1">⌘K</Kbd> Search
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={[
          { id: '1', label: 'Button', group: 'Components', action: () => {} },
          { id: '2', label: 'Badge', group: 'Components', action: () => {} },
          { id: '3', label: 'Showcase', group: 'Pages', action: () => {} },
        ]}
      />
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function ShowcasePage() {
  const [sliderVal, setSliderVal] = useState(65);
  const [checkVal, setCheckVal] = useState(true);
  const [switchVal, setSwitchVal] = useState(true);
  const [ratingVal, setRatingVal] = useState(4);
  const [radioVal, setRadioVal] = useState('a');
  const [segVal, setSegVal] = useState('preview');
  const [otpVal, setOtpVal] = useState('');
  const [pinVal, setPinVal] = useState('');
  const [tagsVal, setTagsVal] = useState(['fxui', 'react']);
  const [comboVal, setComboVal] = useState<string | null>(null);
  const [colorVal, setColorVal] = useState('#FFE500');
  const [page, setPage] = useState(1);
  const [stepperStep, setStepperStep] = useState(1);
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">

      {/* Header */}
      <div className="mb-14">
        <h1 className="font-display text-7xl font-black text-fx-black leading-none">Showcase</h1>
        <p className="text-gray-500 font-sans mt-3 text-lg">All 117 components — live and interactive.</p>
      </div>

      {/* ── CORE ──────────────────────────────────────────────────── */}
      <CategoryHeader name="CORE" count={8} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="Button">
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Default</Button>
            <Button size="sm" variant="outline">Outline</Button>
            <Button size="sm" variant="neon">Neon</Button>
            <Button size="sm" variant="destructive">Delete</Button>
            <Button size="sm" isLoading>Loading</Button>
          </div>
        </DemoCard>

        <DemoCard name="Badge">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="error">Error</Badge>
            <Badge variant="outline" color="info">Info</Badge>
            <Badge variant="neon">Neon</Badge>
          </div>
        </DemoCard>

        <DemoCard name="Chip">
          <div className="flex flex-wrap gap-2">
            <Chip>Default</Chip>
            <Chip variant="filled">Filled</Chip>
            <Chip variant="yellow">Yellow</Chip>
            <Chip variant="pink">Pink</Chip>
            <Chip variant="green" onClose={() => {}}>Closeable</Chip>
          </div>
        </DemoCard>

        <DemoCard name="Tag">
          <div className="flex flex-wrap gap-2">
            <Tag>Default</Tag>
            <Tag variant="outline">Outline</Tag>
            <Tag variant="neon">Neon</Tag>
            <Tag variant="ghost">Ghost</Tag>
            <Tag variant="outline" closeable onClose={() => {}}>Closeable</Tag>
          </div>
        </DemoCard>

        <DemoCard name="Kbd">
          <div className="flex flex-wrap gap-2 items-center">
            <Kbd>⌘</Kbd><Kbd>K</Kbd>
            <span className="text-gray-400 text-sm mx-1">or</span>
            <Kbd>Ctrl</Kbd>
            <span className="text-gray-400 text-sm">+</span>
            <Kbd>Shift</Kbd>
            <span className="text-gray-400 text-sm">+</span>
            <Kbd>P</Kbd>
          </div>
        </DemoCard>

        <DemoCard name="Divider">
          <div className="w-full flex flex-col gap-3">
            <Divider />
            <Divider label="or continue with" />
            <div className="flex gap-2 items-stretch h-8">
              <span className="text-sm text-gray-500 self-center">Left</span>
              <Divider orientation="vertical" />
              <span className="text-sm text-gray-500 self-center">Right</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard name="Spinner">
          <div className="flex items-center gap-4">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" variant="neon" />
            <Spinner size="xl" variant="primary" />
          </div>
        </DemoCard>

        <DemoCard name="FloatingActionButton">
          <div className="relative h-24 w-full border border-dashed border-gray-300 rounded-[4px] overflow-hidden">
            <FloatingActionButton
              icon="+"
              label="Add"
              position="bottom-right"
              style={{ position: 'absolute' }}
            />
            <FloatingActionButton
              icon="★"
              label="Fav"
              variant="yellow"
              position="bottom-left"
              style={{ position: 'absolute' }}
            />
          </div>
        </DemoCard>
      </div>

      {/* ── LAYOUT ────────────────────────────────────────────────── */}
      <CategoryHeader name="LAYOUT" count={8} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="Container">
          <Container size="sm" className="border border-dashed border-fx-black p-2 w-full text-center">
            <span className="text-xs font-mono text-gray-500">size=&quot;sm&quot;</span>
          </Container>
        </DemoCard>

        <DemoCard name="Stack">
          <Stack gap="2" className="w-full">
            {['A', 'B', 'C'].map(l => (
              <div key={l} className="bg-fx-yellow border-2 border-fx-black px-3 py-1 text-sm font-bold text-center">{l}</div>
            ))}
          </Stack>
        </DemoCard>

        <DemoCard name="Flex">
          <Flex justify="between" align="center" className="w-full">
            {['1','2','3'].map(n => (
              <div key={n} className="bg-fx-pink border-2 border-fx-black h-8 w-8 flex items-center justify-center font-bold text-white text-sm">{n}</div>
            ))}
          </Flex>
        </DemoCard>

        <DemoCard name="Grid">
          <Grid cols="3" gap="2" className="w-full">
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className="bg-fx-green border-2 border-fx-black h-8 flex items-center justify-center font-bold text-sm">{n}</div>
            ))}
          </Grid>
        </DemoCard>

        <DemoCard name="AspectRatio">
          <AspectRatio ratio="video" className="bg-fx-blue border-2 border-fx-black w-full">
            <div className="flex items-center justify-center h-full text-white font-bold text-xs">16:9</div>
          </AspectRatio>
        </DemoCard>

        <DemoCard name="ScrollArea">
          <ScrollArea className="h-24 w-full border-2 border-fx-black rounded-[4px]">
            <div className="p-3 space-y-2">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="text-sm font-sans text-gray-600">Line {i + 1} of content</div>
              ))}
            </div>
          </ScrollArea>
        </DemoCard>

        <DemoCard name="SplitLayout">
          <SplitLayout className="h-20 w-full border-2 border-fx-black rounded-[4px] overflow-hidden" defaultSplit={50}>
            <div className="bg-fx-yellow h-full flex items-center justify-center text-xs font-bold">Left</div>
            <div className="bg-fx-pink h-full flex items-center justify-center text-xs font-bold text-white">Right</div>
          </SplitLayout>
        </DemoCard>

        <DemoCard name="Masonry">
          <Masonry columns={3} gap={8} className="w-full">
            {[40, 60, 32, 56, 44, 70].map((h, i) => (
              <div key={i} className="bg-fx-purple border-2 border-fx-black rounded-[4px] mb-2" style={{ height: h }} />
            ))}
          </Masonry>
        </DemoCard>
      </div>

      {/* ── TYPOGRAPHY ────────────────────────────────────────────── */}
      <CategoryHeader name="TYPOGRAPHY" count={8} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="Heading">
          <div className="space-y-1">
            <Heading as="h1" size="h3">H3 Section</Heading>
            <Heading as="h4" size="h5">H5 Subsection</Heading>
            <Heading as="h6" size="h6" color="muted">H6 Label</Heading>
          </div>
        </DemoCard>

        <DemoCard name="Text">
          <div className="space-y-1">
            <Text size="lg" weight="bold">Bold Large</Text>
            <Text size="base">Regular body text here.</Text>
            <Text size="sm" color="muted">Small muted helper text.</Text>
          </div>
        </DemoCard>

        <DemoCard name="Label">
          <div className="space-y-1">
            <Label required>Required field</Label>
            <Label optional>Optional field</Label>
            <Label>Plain label</Label>
          </div>
        </DemoCard>

        <DemoCard name="Caption">
          <div className="space-y-1">
            <Caption>Helper text</Caption>
            <Caption variant="error">Something went wrong</Caption>
            <Caption variant="success">Looks good!</Caption>
          </div>
        </DemoCard>

        <DemoCard name="Blockquote">
          <Blockquote variant="yellow" author="FXUI">
            Neo-brutalism with zero apologies.
          </Blockquote>
        </DemoCard>

        <DemoCard name="Code">
          <div className="space-y-2 w-full">
            <p className="text-sm text-gray-600">Inline: <Code>{'<Button />'}</Code></p>
            <Code block className="text-xs">{`import { Button } from '@fxui/core'`}</Code>
          </div>
        </DemoCard>

        <DemoCard name="PullQuote">
          <PullQuote accent="pink" size="sm">
            Bold. Raw. Unapologetically different.
          </PullQuote>
        </DemoCard>

        <DemoCard name="GradientText">
          <div className="space-y-1">
            <GradientText gradient="sunset" as="p" className="font-black text-xl">Sunset</GradientText>
            <GradientText gradient="ocean" as="p" className="font-black text-xl">Ocean</GradientText>
            <GradientText gradient="neon" as="p" className="font-black text-xl">Neon</GradientText>
          </div>
        </DemoCard>
      </div>

      {/* ── FORM ──────────────────────────────────────────────────── */}
      <CategoryHeader name="FORM" count={17} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="Input">
          <Input label="Email" placeholder="you@example.com" className="w-full" />
        </DemoCard>

        <DemoCard name="PasswordInput">
          <PasswordInput label="Password" placeholder="••••••••" className="w-full" />
        </DemoCard>

        <DemoCard name="SearchInput">
          <SearchInput placeholder="Search components..." className="w-full" />
        </DemoCard>

        <DemoCard name="Textarea">
          <Textarea label="Notes" placeholder="Type here..." rows={3} className="w-full" />
        </DemoCard>

        <DemoCard name="Select">
          <Select label="Framework" placeholder="Pick one" className="w-full">
            <Select.Item value="next">Next.js</Select.Item>
            <Select.Item value="remix">Remix</Select.Item>
            <Select.Item value="vite">Vite</Select.Item>
          </Select>
        </DemoCard>

        <DemoCard name="NumberInput">
          <NumberInput label="Quantity" min={0} max={100} defaultValue={5} className="w-full" />
        </DemoCard>

        <DemoCard name="Slider">
          <div className="w-full">
            <p className="text-xs font-mono text-gray-500 mb-2">Value: {sliderVal}</p>
            <Slider value={[sliderVal]} onValueChange={v => setSliderVal(v[0])} min={0} max={100} />
          </div>
        </DemoCard>

        <DemoCard name="Checkbox">
          <div className="space-y-2">
            <Checkbox label="Remember me" checked={checkVal} onCheckedChange={v => setCheckVal(Boolean(v))} />
            <Checkbox label="Newsletter" defaultChecked />
            <Checkbox label="Disabled" disabled />
          </div>
        </DemoCard>

        <DemoCard name="CheckboxGroup">
          <CheckboxGroup
            label="Interests"
            options={[
              { value: 'ts', label: 'TypeScript' },
              { value: 'react', label: 'React' },
              { value: 'css', label: 'CSS' },
            ]}
            defaultValue={['ts', 'react']}
          />
        </DemoCard>

        <DemoCard name="Switch">
          <div className="space-y-2">
            <Switch label="Dark mode" checked={switchVal} onCheckedChange={setSwitchVal} />
            <Switch label="Notifications" defaultChecked />
            <Switch label="Offline" disabled />
          </div>
        </DemoCard>

        <DemoCard name="SwitchGroup">
          <SwitchGroup
            label="Features"
            options={[
              { value: 'analytics', label: 'Analytics', disabled: false },
              { value: 'notifs', label: 'Notifications', disabled: false },
              { value: 'beta', label: 'Beta features', disabled: false },
            ]}
            defaultValue={['analytics', 'notifs']}
          />
        </DemoCard>

        <DemoCard name="RadioGroup">
          <RadioGroup
            label="Plan"
            value={radioVal}
            onValueChange={setRadioVal}
            options={[
              { value: 'a', label: 'Starter' },
              { value: 'b', label: 'Pro' },
              { value: 'c', label: 'Enterprise' },
            ]}
          />
        </DemoCard>

        <DemoCard name="SegmentedControl">
          <SegmentedControl
            value={segVal}
            onChange={setSegVal}
            options={[
              { value: 'preview', label: 'Preview' },
              { value: 'code', label: 'Code' },
              { value: 'api', label: 'API' },
            ]}
          />
        </DemoCard>

        <DemoCard name="OTPInput">
          <OTPInput length={6} value={otpVal} onChange={setOtpVal} />
        </DemoCard>

        <DemoCard name="Rating">
          <Rating value={ratingVal} onChange={setRatingVal} max={5} />
        </DemoCard>

        <DemoCard name="FormField">
          <FormField label="Username" hint="3–20 characters" required className="w-full">
            <Input placeholder="your_handle" />
          </FormField>
        </DemoCard>

        <DemoCard name="InputGroup">
          <InputGroup prefix="https://" suffix=".com" placeholder="yoursite" className="w-full" />
        </DemoCard>
      </div>

      {/* ── FORM ADVANCED ─────────────────────────────────────────── */}
      <CategoryHeader name="FORM ADVANCED" count={10} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="DatePicker">
          <DatePicker label="Launch date" placeholder="Pick a date" className="w-full" />
        </DemoCard>

        <DemoCard name="TagInput">
          <TagInput label="Skills" value={tagsVal} onChange={setTagsVal} placeholder="Add tag..." className="w-full" />
        </DemoCard>

        <DemoCard name="ComboBox">
          <ComboBox
            label="Country"
            placeholder="Search..."
            value={comboVal}
            onChange={setComboVal}
            options={[
              { value: 'tr', label: 'Turkey' },
              { value: 'de', label: 'Germany' },
              { value: 'us', label: 'United States' },
              { value: 'jp', label: 'Japan' },
            ]}
            className="w-full"
          />
        </DemoCard>

        <DemoCard name="FileUpload">
          <FileUpload label="Upload" accept=".png,.jpg" className="w-full" />
        </DemoCard>

        <DemoCard name="ColorPicker">
          <ColorPicker label="Brand color" value={colorVal} onChange={setColorVal} />
        </DemoCard>

        <DemoCard name="MaskInput">
          <MaskInput label="Phone" mask="(999) 999-9999" placeholder="(555) 000-0000" className="w-full" />
        </DemoCard>

        <DemoCard name="TreeSelect">
          <TreeSelect
            label="Location"
            placeholder="Select..."
            options={[
              { value: 'eu', label: 'Europe', children: [
                { value: 'de', label: 'Germany' },
                { value: 'fr', label: 'France' },
              ]},
              { value: 'as', label: 'Asia', children: [
                { value: 'jp', label: 'Japan' },
                { value: 'kr', label: 'Korea' },
              ]},
            ]}
            className="w-full"
          />
        </DemoCard>

        <DemoCard name="PinInput">
          <PinInput length={4} value={pinVal} onChange={v => setPinVal(v)} masked />
        </DemoCard>

        <DemoCard name="AutoComplete">
          <AutoComplete
            placeholder="Type to search..."
            options={[
              { value: 'next', label: 'Next.js' },
              { value: 'remix', label: 'Remix' },
              { value: 'astro', label: 'Astro' },
              { value: 'svelte', label: 'SvelteKit' },
            ]}
            className="w-full"
          />
        </DemoCard>
      </div>

      {/* ── DATA DISPLAY ──────────────────────────────────────────── */}
      <CategoryHeader name="DATA DISPLAY" count={13} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="Table">
          <Table className="w-full text-sm">
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {tableData.map(r => (
                <Table.Row key={r.id}>
                  <Table.Cell>{r.name}</Table.Cell>
                  <Table.Cell>{r.role}</Table.Cell>
                  <Table.Cell>{r.status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </DemoCard>

        <DemoCard name="Card">
          <Card className="w-full">
            <Card.Header>
              <p className="font-bold text-sm">Revenue</p>
              <p className="text-xs text-gray-500">Last 30 days</p>
            </Card.Header>
            <Card.Body>
              <p className="font-black font-display text-3xl">$48,250</p>
            </Card.Body>
            <Card.Footer>
              <span className="text-xs text-gray-500">↑ 12% vs last month</span>
            </Card.Footer>
          </Card>
        </DemoCard>

        <DemoCard name="Avatar">
          <div className="flex items-center gap-3">
            <Avatar fallback="AB" size="sm" />
            <Avatar fallback="CD" size="md" />
            <Avatar fallback="EF" size="lg" />
          </div>
        </DemoCard>

        <DemoCard name="AvatarGroup">
          <AvatarGroup
            avatars={[
              { name: 'Alice Park', color: 'yellow' },
              { name: 'Bob Chen', color: 'pink' },
              { name: 'Carol Wu', color: 'green' },
              { name: 'Dan Lee', color: 'blue' },
              { name: 'Eva Kim', color: 'purple' },
            ]}
            max={4}
          />
        </DemoCard>

        <DemoCard name="Stat">
          <div className="flex gap-3 flex-wrap">
            <Stat label="Revenue" value="$48K" trend="up" change="+12%" />
            <Stat label="Churn" value="2.4%" trend="down" change="-0.3%" />
          </div>
        </DemoCard>

        <DemoCard name="Timeline">
          <Timeline items={timelineItems} />
        </DemoCard>

        <DemoCard name="Progress">
          <div className="w-full space-y-2">
            <Progress value={sliderVal} color="default" showValue />
            <Progress value={72} color="success" showValue />
            <Progress value={38} color="warning" showValue />
          </div>
        </DemoCard>

        <DemoCard name="Skeleton">
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </DemoCard>

        <DemoCard name="TreeView">
          <TreeView nodes={treeNodes} selectable />
        </DemoCard>

        <DemoCard name="DataList">
          <DataList
            items={[
              { label: 'Version', value: '1.0.0' },
              { label: 'License', value: 'MIT' },
              { label: 'Components', value: '117' },
            ]}
          />
        </DemoCard>

        <DemoCard name="List">
          <List variant="bullet" items={['TypeScript', 'Tailwind CSS', 'Radix UI']} />
        </DemoCard>

        <DemoCard name="TimeAgo">
          <div className="space-y-1 text-sm font-sans text-gray-600">
            <TimeAgo date={new Date(Date.now() - 60000)} />
            <TimeAgo date={new Date(Date.now() - 3600000 * 3)} />
            <TimeAgo date={new Date(Date.now() - 86400000 * 5)} />
          </div>
        </DemoCard>

        <DemoCard name="Countdown">
          <Countdown targetDate={new Date(Date.now() + 86400000 * 7)} />
        </DemoCard>
      </div>

      {/* ── FEEDBACK ──────────────────────────────────────────────── */}
      <CategoryHeader name="FEEDBACK" count={8} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="Toast">
          <ToastDemo />
        </DemoCard>

        <DemoCard name="Alert">
          <div className="space-y-2 w-full">
            <Alert variant="success" title="Deployed!">All systems green.</Alert>
            <Alert variant="warning" title="Heads up">Review before publishing.</Alert>
          </div>
        </DemoCard>

        <DemoCard name="EmptyState">
          <EmptyState
            icon="📭"
            title="No results"
            description="Try a different search."
            action={<Button size="sm">Clear filters</Button>}
          />
        </DemoCard>

        <DemoCard name="Banner">
          <Banner variant="info" className="w-full">
            v2.0 is available — <strong>update now</strong>.
          </Banner>
        </DemoCard>

        <DemoCard name="ConfirmDialog">
          <ConfirmDialog
            title="Delete project?"
            description="This action cannot be undone."
            confirmLabel="Delete"
            destructive
            onConfirm={() => {}}
            trigger={<Button variant="destructive" size="sm">Delete project</Button>}
          />
        </DemoCard>

        <DemoCard name="Notification">
          <Notification
            title="New message"
            description="Alice sent you a file."
            icon="💬"
            timestamp="just now"
          />
        </DemoCard>

        <DemoCard name="Callout">
          <div className="space-y-2 w-full">
            <Callout variant="tip">Use forwardRef on every component.</Callout>
            <Callout variant="warning">Avoid using the any type.</Callout>
          </div>
        </DemoCard>

        <DemoCard name="LoadingOverlay">
          <div className="relative h-24 w-full border-2 border-fx-black rounded-[4px] overflow-hidden">
            <div className="p-4 text-sm text-gray-500">Content behind overlay</div>
            <LoadingOverlay visible message="Processing..." />
          </div>
        </DemoCard>
      </div>

      {/* ── NAVIGATION ────────────────────────────────────────────── */}
      <CategoryHeader name="NAVIGATION" count={8} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="Tabs">
          <Tabs defaultValue="a" className="w-full">
            <Tabs.List>
              <Tabs.Trigger value="a">Overview</Tabs.Trigger>
              <Tabs.Trigger value="b">Code</Tabs.Trigger>
              <Tabs.Trigger value="c">API</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="a"><p className="text-sm text-gray-500 mt-2">Overview content.</p></Tabs.Content>
            <Tabs.Content value="b"><p className="text-sm text-gray-500 mt-2">Code examples.</p></Tabs.Content>
            <Tabs.Content value="c"><p className="text-sm text-gray-500 mt-2">API reference.</p></Tabs.Content>
          </Tabs>
        </DemoCard>

        <DemoCard name="Breadcrumb">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Components', href: '/showcase' },
              { label: 'Breadcrumb' },
            ]}
          />
        </DemoCard>

        <DemoCard name="Pagination">
          <Pagination totalPages={10} page={page} onPageChange={setPage} />
        </DemoCard>

        <DemoCard name="Stepper">
          <div className="w-full">
            <Stepper
              currentStep={stepperStep}
              steps={[
                { title: 'Account', description: 'Create account' },
                { title: 'Profile', description: 'Setup profile' },
                { title: 'Done', description: 'All set!' },
              ]}
            />
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" onClick={() => setStepperStep(s => Math.max(0, s - 1))}>Prev</Button>
              <Button size="sm" onClick={() => setStepperStep(s => Math.min(2, s + 1))}>Next</Button>
            </div>
          </div>
        </DemoCard>

        <DemoCard name="Navbar">
          <div className="w-full border-2 border-fx-black rounded-[4px] overflow-hidden">
            <Navbar logo={<span className="font-display font-black text-lg">FXUI</span>}>
              <a href="#" className="text-sm font-bold px-3 py-1 rounded-[4px] hover:bg-gray-100">Docs</a>
              <a href="#" className="text-sm font-bold px-3 py-1 rounded-[4px] bg-fx-black text-white">Showcase</a>
            </Navbar>
          </div>
        </DemoCard>

        <DemoCard name="ScrollProgress">
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-500 font-mono">Fixed reading progress bar</p>
            <div className="w-full h-2 bg-gray-100 border border-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-fx-yellow transition-all" style={{ width: '65%' }} />
            </div>
            <ScrollProgress color="yellow" position="top" />
          </div>
        </DemoCard>

        <DemoCard name="NavMenu">
          <NavMenu
            items={[
              {
                label: 'Products',
                group: {
                  trigger: 'Products',
                  links: [
                    { label: 'Components', href: '/showcase', description: '117 UI components' },
                    { label: 'Docs', href: '/docs/getting-started', description: 'Getting started guide' },
                  ],
                },
              },
              { label: 'GitHub', href: '#' },
            ]}
          />
        </DemoCard>

        <DemoCard name="AppSidebar">
          <div className="w-48 border-2 border-fx-black rounded-[4px] overflow-hidden">
            <AppSidebar
              sections={[{
                items: [
                  { label: 'Dashboard', icon: '⊞', href: '#', active: true },
                  { label: 'Components', icon: '◈', href: '#', badge: '117' },
                  { label: 'Settings', icon: '⚙', href: '#' },
                ],
              }]}
            />
          </div>
        </DemoCard>
      </div>

      {/* ── OVERLAY ───────────────────────────────────────────────── */}
      <CategoryHeader name="OVERLAY" count={10} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="Modal">
          <Modal>
            <Modal.Trigger asChild>
              <Button size="sm">Open Modal</Button>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Header>
                <p className="font-black text-base">Confirm action</p>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-gray-600">This is a modal dialog built on Radix UI.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Confirm</Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </DemoCard>

        <DemoCard name="Drawer">
          <Drawer>
            <Drawer.Trigger asChild>
              <Button size="sm" variant="outline">Open Drawer</Button>
            </Drawer.Trigger>
            <Drawer.Content placement="right">
              <Drawer.Header>
                <p className="font-black text-base">Settings</p>
              </Drawer.Header>
              <Drawer.Body>
                <p className="text-sm text-gray-600">Drawer content slides in from the right.</p>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer>
        </DemoCard>

        <DemoCard name="Tooltip">
          <div className="flex gap-3">
            <Tooltip content="Top tooltip" placement="top">
              <Button size="sm" variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" placement="bottom">
              <Button size="sm" variant="outline">Bottom</Button>
            </Tooltip>
          </div>
        </DemoCard>

        <DemoCard name="Popover">
          <Popover>
            <Popover.Trigger asChild>
              <Button size="sm" variant="outline">Open popover</Button>
            </Popover.Trigger>
            <Popover.Content>
              <p className="text-sm font-sans text-gray-700">Floating panel with arrow.</p>
            </Popover.Content>
          </Popover>
        </DemoCard>

        <DemoCard name="DropdownMenu">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button size="sm" variant="outline">Actions ▾</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Edit</DropdownMenu.Item>
              <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item destructive>Delete</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </DemoCard>

        <DemoCard name="ContextMenu">
          <ContextMenu>
            <ContextMenu.Trigger asChild>
              <div className="border-2 border-dashed border-fx-black rounded-[4px] px-6 py-4 text-sm text-gray-500 cursor-default select-none">
                Right-click here
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item>Copy</ContextMenu.Item>
              <ContextMenu.Item>Paste</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item destructive>Delete</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </DemoCard>

        <DemoCard name="CommandPalette">
          <CommandPaletteDemo />
        </DemoCard>

        <DemoCard name="HoverCard">
          <HoverCard
            trigger={<span className="font-bold underline cursor-pointer text-fx-blue">@fxui</span>}
          >
            <div className="space-y-1">
              <p className="font-bold text-sm">FXUI</p>
              <p className="text-xs text-gray-500">Neo-brutalist React UI. 117 components.</p>
            </div>
          </HoverCard>
        </DemoCard>

        <DemoCard name="SheetDialog">
          <SheetDialog
            trigger={<Button size="sm" variant="outline">Open Sheet</Button>}
            title="Sheet panel"
            description="Large sliding sheet panel content."
          />
        </DemoCard>

        <DemoCard name="Popconfirm">
          <Popconfirm
            title="Are you sure?"
            description="This will delete the item."
            onConfirm={() => {}}
            trigger={<Button size="sm" variant="destructive">Delete</Button>}
          />
        </DemoCard>
      </div>

      {/* ── INTERACTION ───────────────────────────────────────────── */}
      <CategoryHeader name="INTERACTION" count={2} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="Collapsible">
          <Collapsible title="What is FXUI?" defaultOpen className="w-full">
            <p className="text-sm text-gray-600">A neo-brutalist React component library with 117 components.</p>
          </Collapsible>
        </DemoCard>

        <DemoCard name="InlineEdit">
          <InlineEdit defaultValue="Click to edit this text" onSave={() => {}} />
        </DemoCard>
      </div>

      {/* ── MEDIA & CHART ─────────────────────────────────────────── */}
      <CategoryHeader name="MEDIA & CHART" count={10} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="Image">
          <Image
            src="https://picsum.photos/seed/fxui/400/200"
            alt="Sample"
            className="w-full rounded-[4px] border-2 border-fx-black"
            caption="A placeholder image"
          />
        </DemoCard>

        <DemoCard name="Carousel">
          <Carousel
            className="w-full"
            items={['#FFE500','#FF2D78','#00FF94','#0066FF'].map((c, i) => (
              <div key={i} className="h-24 flex items-center justify-center font-black text-fx-black border-2 border-fx-black" style={{ backgroundColor: c }}>
                Slide {i + 1}
              </div>
            ))}
          />
        </DemoCard>

        <DemoCard name="VideoPlayer">
          <VideoPlayer
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            className="w-full"
          />
        </DemoCard>

        <DemoCard name="LineChart">
          <LineChart
            data={chartData}
            series={[{ key: 'revenue', label: 'Revenue', color: '#0066FF' }]}
            xKey="month"
            height={140}
            showGrid
            showDots
            showLegend={false}
            className="w-full !border-0 !shadow-none !rounded-none !p-2"
          />
        </DemoCard>

        <DemoCard name="BarChart">
          <BarChart
            data={chartData}
            series={[{ key: 'users', label: 'Users', color: '#FF2D78' }]}
            xKey="month"
            height={140}
            showGrid
            radius={2}
            showLegend={false}
            className="w-full !border-0 !shadow-none !rounded-none !p-2"
          />
        </DemoCard>

        <DemoCard name="AreaChart">
          <AreaChart
            data={chartData}
            series={[{ key: 'revenue', label: 'Revenue', color: '#00FF94' }]}
            xKey="month"
            height={140}
            showGrid
            showLegend={false}
            className="w-full !border-0 !shadow-none !rounded-none !p-2"
          />
        </DemoCard>

        <DemoCard name="DonutChart">
          <DonutChart
            data={donutData}
            centerLabel="Stack"
            centerValue="4"
            height={180}
            showLegend={false}
            className="w-full !border-0 !shadow-none !rounded-none !p-2"
          />
        </DemoCard>

        <DemoCard name="SparkLine">
          <div className="space-y-2">
            <SparkLine data={[3,7,2,9,5,8,4,11]} trend="up" showTrend />
            <SparkLine data={[11,8,6,9,4,7,3,5]} trend="down" showTrend color="#FF2D78" />
          </div>
        </DemoCard>

        <DemoCard name="ProgressRing">
          <div className="flex gap-4">
            <ProgressRing value={75} color="blue" showValue size={64} />
            <ProgressRing value={42} color="pink" showValue size={64} />
            <ProgressRing value={90} color="green" showValue size={64} />
          </div>
        </DemoCard>

        <DemoCard name="AnimatedCounter">
          <div className="flex gap-6">
            <AnimatedCounter value={117} suffix=" comp" className="font-display font-black text-3xl" />
            <AnimatedCounter value={100} suffix="%" className="font-display font-black text-3xl text-fx-green" />
          </div>
        </DemoCard>
      </div>

      {/* ── UTILITY ───────────────────────────────────────────────── */}
      <CategoryHeader name="UTILITY" count={8} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="CopyButton">
          <div className="flex gap-2 items-center">
            <CopyButton value="pnpm add @fxui/core" label="Copy install" />
            <CopyButton value="pnpm add @fxui/core" iconOnly />
          </div>
        </DemoCard>

        <DemoCard name="ColorSwatch">
          <div className="flex gap-2 flex-wrap">
            <ColorSwatch color="#FFE500" name="Yellow" />
            <ColorSwatch color="#FF2D78" name="Pink" />
            <ColorSwatch color="#00FF94" name="Green" />
            <ColorSwatch color="#0066FF" name="Blue" />
          </div>
        </DemoCard>

        <DemoCard name="Marquee">
          <Marquee className="w-full" speed={30}>
            <span className="font-black text-sm mx-4">FXUI</span>
            <span className="font-black text-sm mx-4">NEO-BRUTALISM</span>
            <span className="font-black text-sm mx-4">117 COMPONENTS</span>
            <span className="font-black text-sm mx-4">OPEN SOURCE</span>
          </Marquee>
        </DemoCard>

        <DemoCard name="ReadMore">
          <ReadMore maxLines={2} className="text-sm text-gray-600 w-full">
            FXUI is a neo-brutalist React component library with 117 production-ready components built with TypeScript, Tailwind CSS, and Radix UI. Every component supports dark mode, forwardRef, and strict TypeScript types.
          </ReadMore>
        </DemoCard>

        <DemoCard name="HighlightText">
          <HighlightText text="Neo-brutalist design system with 117 components" highlight="brutalist" className="text-sm" />
        </DemoCard>

        <DemoCard name="ScrollToTop">
          <div className="relative h-20 w-full border-2 border-fx-black rounded-[4px] overflow-hidden bg-gray-50 flex items-center justify-center">
            <span className="text-xs text-gray-400">Appears after scroll</span>
            <ScrollToTop threshold={0} style={{ position: 'absolute', bottom: 8, right: 8 }} />
          </div>
        </DemoCard>

        <DemoCard name="QRCode">
          <QRCode value="https://fxui-docs.vercel.app" size={80} />
        </DemoCard>

        <DemoCard name="ClipboardInput">
          <ClipboardInput value="pnpm add @fxui/core" label="Install" className="w-full" />
        </DemoCard>
      </div>

      {/* ── SPECIAL ───────────────────────────────────────────────── */}
      <CategoryHeader name="SPECIAL" count={4} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="GlitchText">
          <GlitchText text="GLITCH" intensity="medium" className="font-display font-black text-3xl" />
        </DemoCard>

        <DemoCard name="TypewriterText">
          <TypewriterText
            texts={['Neo-brutalist.', 'TypeScript first.', '117 components.']}
            className="font-bold font-sans text-base"
          />
        </DemoCard>

        <DemoCard name="NoiseBg">
          <NoiseBg className="w-full h-24 bg-fx-yellow border-2 border-fx-black rounded-[4px] flex items-center justify-center">
            <span className="font-black text-sm">Noise texture overlay</span>
          </NoiseBg>
        </DemoCard>

        <DemoCard name="BrutalistCard">
          <BrutalistCard accent="yellow" hoverable className="w-full p-4">
            <p className="font-black font-display text-lg">BrutalistCard</p>
            <p className="text-sm text-gray-600 mt-1">Preset neo-brutalist card.</p>
          </BrutalistCard>
        </DemoCard>
      </div>

      {/* ── THEME ─────────────────────────────────────────────────── */}
      <CategoryHeader name="THEME" count={1} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="ThemeProvider">
          <ThemeProvider defaultColorMode="light">
            <div className="space-y-2 w-full">
              <p className="text-xs font-mono text-gray-500">Wraps your app for dark mode + token overrides.</p>
              <div className="flex gap-2">
                <Badge variant="neon" color="success">Dark mode</Badge>
                <Badge variant="outline">Token overrides</Badge>
              </div>
            </div>
          </ThemeProvider>
        </DemoCard>
      </div>

      {/* ── MISC ──────────────────────────────────────────────────── */}
      <CategoryHeader name="MISC" count={2} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <DemoCard name="Accordion">
          <Accordion type="single" collapsible className="w-full">
            <Accordion.Item value="q1">
              <Accordion.Trigger>What is FXUI?</Accordion.Trigger>
              <Accordion.Content>A neo-brutalist React component library.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="q2">
              <Accordion.Trigger>How many components?</Accordion.Trigger>
              <Accordion.Content>117 production-ready components.</Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </DemoCard>

        <DemoCard name="Tour">
          <div>
            <Button size="sm" onClick={() => setTourOpen(true)}>Start tour</Button>
            <Tour
              open={tourOpen}
              onOpenChange={setTourOpen}
              steps={[
                { title: 'Welcome!', content: 'This is the FXUI showcase.' },
                { title: 'Components', content: '117 components, all live.' },
                { title: 'Done!', content: 'Explore the docs for details.' },
              ]}
            />
          </div>
        </DemoCard>
      </div>

      <div className="mt-20 pt-8 border-t-2 border-fx-black text-center">
        <p className="text-sm text-gray-400 font-mono">117 components · MIT License · FXUI</p>
      </div>
    </div>
  );
}
