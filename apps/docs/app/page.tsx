import Link from 'next/link';

const categories = [
  {
    name: 'Core',
    color: 'bg-fx-yellow',
    count: 8,
    items: [
      { name: 'Button', desc: '5 variants, loading, icons', href: '/docs/button' },
      { name: 'Badge', desc: '3 variants × 5 colors', href: '/docs/badge' },
      { name: 'Chip', desc: 'Closeable, selectable', href: '/docs/chip' },
      { name: 'Tag', desc: 'Closeable label chips', href: '/docs/tag' },
      { name: 'Kbd', desc: 'Keyboard key sequences', href: '/docs/kbd' },
      { name: 'Divider', desc: 'Horizontal / vertical', href: '/docs/divider' },
      { name: 'Spinner', desc: '5 sizes, 4 variants', href: '/docs/spinner' },
      { name: 'FloatingActionButton', desc: 'Fixed FAB, circle/pill/square', href: '/docs/floatingactionbutton' },
    ],
  },
  {
    name: 'Layout',
    color: 'bg-fx-green',
    count: 8,
    items: [
      { name: 'Container', desc: 'Max-width responsive wrapper', href: '/docs/container' },
      { name: 'Stack', desc: 'Vertical/horizontal flex', href: '/docs/stack' },
      { name: 'Flex', desc: 'Full alignment control', href: '/docs/flex' },
      { name: 'Grid', desc: 'CSS Grid with col/row span', href: '/docs/grid' },
      { name: 'AspectRatio', desc: '6 presets + custom ratio', href: '/docs/aspectratio' },
      { name: 'ScrollArea', desc: 'Custom scrollbar', href: '/docs/scrollarea' },
      { name: 'SplitLayout', desc: 'Draggable resizable panes', href: '/docs/splitlayout' },
      { name: 'Masonry', desc: 'CSS columns masonry grid', href: '/docs/masonry' },
    ],
  },
  {
    name: 'Typography',
    color: 'bg-fx-blue',
    count: 8,
    items: [
      { name: 'Heading', desc: 'display–h6, highlight overlay', href: '/docs/heading' },
      { name: 'Text', desc: 'Body text, size/weight/color', href: '/docs/text' },
      { name: 'Label', desc: 'Form label, required/optional', href: '/docs/label' },
      { name: 'Caption', desc: 'Helper text, error/success', href: '/docs/caption' },
      { name: 'Blockquote', desc: 'Left accent, 6 colors', href: '/docs/blockquote' },
      { name: 'Code', desc: 'Inline & block code', href: '/docs/code' },
      { name: 'PullQuote', desc: 'Large decorative quote', href: '/docs/pullquote' },
      { name: 'GradientText', desc: '7 gradient presets', href: '/docs/gradienttext' },
    ],
  },
  {
    name: 'Form',
    color: 'bg-fx-pink',
    count: 17,
    items: [
      { name: 'Input', desc: 'Label, error, hint, addons', href: '/docs/input' },
      { name: 'PasswordInput', desc: 'Show/hide toggle', href: '/docs/passwordinput' },
      { name: 'SearchInput', desc: 'Icon, clear, debounce', href: '/docs/searchinput' },
      { name: 'Textarea', desc: 'Multi-line, char count', href: '/docs/textarea' },
      { name: 'Select', desc: 'Groups and separator', href: '/docs/select' },
      { name: 'NumberInput', desc: '± buttons, min/max/step', href: '/docs/numberinput' },
      { name: 'Slider', desc: 'Single & range', href: '/docs/slider' },
      { name: 'Checkbox', desc: 'Custom brutalist checkbox', href: '/docs/checkbox' },
      { name: 'CheckboxGroup', desc: 'Select-all and descriptions', href: '/docs/checkboxgroup' },
      { name: 'Switch', desc: 'Toggle with label', href: '/docs/switch' },
      { name: 'SwitchGroup', desc: 'Settings panel of toggles', href: '/docs/switchgroup' },
      { name: 'RadioGroup', desc: 'Horizontal/vertical', href: '/docs/radiogroup' },
      { name: 'SegmentedControl', desc: 'Connected button-group radio', href: '/docs/segmentedcontrol' },
      { name: 'OTPInput', desc: 'OTP boxes with paste', href: '/docs/otpinput' },
      { name: 'Rating', desc: 'Stars, half-star, custom max', href: '/docs/rating' },
      { name: 'FormField', desc: 'Label + hint + error wrapper', href: '/docs/formfield' },
      { name: 'InputGroup', desc: 'Prefix/suffix addons', href: '/docs/inputgroup' },
    ],
  },
  {
    name: 'Form Advanced',
    color: 'bg-fx-purple',
    count: 10,
    items: [
      { name: 'DatePicker', desc: 'Calendar popover, min/max', href: '/docs/datepicker' },
      { name: 'TagInput', desc: 'Multi-value chip input', href: '/docs/taginput' },
      { name: 'ComboBox', desc: 'Searchable with groups', href: '/docs/combobox' },
      { name: 'FileUpload', desc: 'Drag & drop, validation', href: '/docs/fileupload' },
      { name: 'ColorPicker', desc: 'Native + presets', href: '/docs/colorpicker' },
      { name: 'PhoneInput', desc: 'Country flag + dial code', href: '/docs/phoneinput' },
      { name: 'MaskInput', desc: 'Phone, card, date, SSN', href: '/docs/maskinput' },
      { name: 'TreeSelect', desc: 'Hierarchical dropdown', href: '/docs/treeselect' },
      { name: 'PinInput', desc: 'Security PIN digit boxes', href: '/docs/pininput' },
      { name: 'AutoComplete', desc: 'Async suggestion dropdown', href: '/docs/autocomplete' },
    ],
  },
  {
    name: 'Data Display',
    color: 'bg-fx-green',
    count: 13,
    items: [
      { name: 'Table', desc: 'Sortable, striped, bordered', href: '/docs/table' },
      { name: 'Card', desc: 'Compound Header/Body/Footer', href: '/docs/card' },
      { name: 'Avatar', desc: 'Image + initials fallback', href: '/docs/avatar' },
      { name: 'AvatarGroup', desc: 'Stacked with overflow badge', href: '/docs/avatargroup' },
      { name: 'Stat', desc: 'KPI card with trend', href: '/docs/stat' },
      { name: 'Timeline', desc: 'Chronological event list', href: '/docs/timeline' },
      { name: 'Progress', desc: '6 colors, 3 sizes', href: '/docs/progress' },
      { name: 'Skeleton', desc: 'Shimmer + pulse + wave', href: '/docs/skeleton' },
      { name: 'TreeView', desc: 'File-explorer tree', href: '/docs/treeview' },
      { name: 'DataList', desc: 'Key-value rows', href: '/docs/datalist' },
      { name: 'List', desc: 'Bullet, numbered, check', href: '/docs/list' },
      { name: 'TimeAgo', desc: 'Relative time, auto-refresh', href: '/docs/timeago' },
      { name: 'Countdown', desc: 'Timer with card variant', href: '/docs/countdown' },
    ],
  },
  {
    name: 'Feedback',
    color: 'bg-fx-yellow',
    count: 8,
    items: [
      { name: 'Toast', desc: 'Context notifications, 5 variants', href: '/docs/toast' },
      { name: 'Alert', desc: 'Inline banners, dismissible', href: '/docs/alert' },
      { name: 'EmptyState', desc: 'Blank slate with action', href: '/docs/emptystate' },
      { name: 'Banner', desc: 'Full-width announcement', href: '/docs/banner' },
      { name: 'ConfirmDialog', desc: 'Alert dialog, destructive', href: '/docs/confirmdialog' },
      { name: 'Notification', desc: 'Item with icon & actions', href: '/docs/notification' },
      { name: 'Callout', desc: 'Tip/warning/danger block', href: '/docs/callout' },
      { name: 'LoadingOverlay', desc: 'Semi-transparent overlay', href: '/docs/loadingoverlay' },
    ],
  },
  {
    name: 'Navigation',
    color: 'bg-fx-blue',
    count: 8,
    items: [
      { name: 'Tabs', desc: '3 variants: default, boxed, pills', href: '/docs/tabs' },
      { name: 'Breadcrumb', desc: 'Navigation trail', href: '/docs/breadcrumb' },
      { name: 'Pagination', desc: 'Smart ellipsis, first/last', href: '/docs/pagination' },
      { name: 'Stepper', desc: 'Multi-step, h/v', href: '/docs/stepper' },
      { name: 'Navbar', desc: 'Top nav with items/actions', href: '/docs/navbar' },
      { name: 'NavMenu', desc: 'Hover dropdown groups', href: '/docs/navmenu' },
      { name: 'AppSidebar', desc: 'Collapsible nav with badges', href: '/docs/appsidebar' },
      { name: 'ScrollProgress', desc: 'Reading progress bar', href: '/docs/scrollprogress' },
    ],
  },
  {
    name: 'Overlay',
    color: 'bg-fx-pink',
    count: 10,
    items: [
      { name: 'Modal', desc: 'Animated Radix dialog', href: '/docs/modal' },
      { name: 'Drawer', desc: 'Slide-in, 4 placements', href: '/docs/drawer' },
      { name: 'Tooltip', desc: '4 placements', href: '/docs/tooltip' },
      { name: 'Popover', desc: 'Floating panel, arrow', href: '/docs/popover' },
      { name: 'DropdownMenu', desc: 'Groups, checkbox, submenu', href: '/docs/dropdownmenu' },
      { name: 'ContextMenu', desc: 'Right-click menu', href: '/docs/contextmenu' },
      { name: 'CommandPalette', desc: '⌘K palette', href: '/docs/commandpalette' },
      { name: 'HoverCard', desc: 'Rich hover preview', href: '/docs/hovercard' },
      { name: 'SheetDialog', desc: 'Large sliding sheet', href: '/docs/sheetdialog' },
      { name: 'Popconfirm', desc: 'Inline confirmation', href: '/docs/popconfirm' },
    ],
  },
  {
    name: 'Media & Chart',
    color: 'bg-fx-purple',
    count: 10,
    items: [
      { name: 'Image', desc: 'Lazy load, fallback, caption', href: '/docs/image' },
      { name: 'Carousel', desc: 'Arrows, dots, autoplay', href: '/docs/carousel' },
      { name: 'VideoPlayer', desc: 'Custom HTML5 player', href: '/docs/videoplayer' },
      { name: 'LineChart', desc: 'Multi-series, grid, tooltip', href: '/docs/linechart' },
      { name: 'BarChart', desc: 'Grouped/stacked bars', href: '/docs/barchart' },
      { name: 'AreaChart', desc: 'Gradient-filled, stacked', href: '/docs/areachart' },
      { name: 'DonutChart', desc: 'Donut/pie, center label', href: '/docs/donutchart' },
      { name: 'SparkLine', desc: 'Inline mini chart', href: '/docs/sparkline' },
      { name: 'ProgressRing', desc: 'SVG circular progress', href: '/docs/progressring' },
      { name: 'AnimatedCounter', desc: 'Number animating to target', href: '/docs/animatedcounter' },
    ],
  },
  {
    name: 'Utility',
    color: 'bg-fx-yellow',
    count: 8,
    items: [
      { name: 'CopyButton', desc: 'Clipboard with checkmark', href: '/docs/copybutton' },
      { name: 'ColorSwatch', desc: 'Color preview tile', href: '/docs/colorswatch' },
      { name: 'Marquee', desc: 'Infinite scroll, pause-on-hover', href: '/docs/marquee' },
      { name: 'ReadMore', desc: 'Truncated text toggle', href: '/docs/readmore' },
      { name: 'HighlightText', desc: 'Highlight matching substrings', href: '/docs/highlighttext' },
      { name: 'ScrollToTop', desc: 'Floating back-to-top', href: '/docs/scrolltotop' },
      { name: 'QRCode', desc: 'SVG QR from URL or text', href: '/docs/qrcode' },
      { name: 'ClipboardInput', desc: 'Read-only input + copy', href: '/docs/clipboardinput' },
    ],
  },
  {
    name: 'Interaction',
    color: 'bg-fx-green',
    count: 2,
    items: [
      { name: 'Collapsible', desc: 'Single expandable section', href: '/docs/collapsible' },
      { name: 'InlineEdit', desc: 'Click-to-edit text', href: '/docs/inlineedit' },
    ],
  },
  {
    name: 'Special',
    color: 'bg-fx-pink',
    count: 4,
    items: [
      { name: 'GlitchText', desc: 'CSS glitch animation', href: '/docs/glitchtext' },
      { name: 'TypewriterText', desc: 'Typewriter with cursor', href: '/docs/typewritertext' },
      { name: 'NoiseBg', desc: 'SVG noise texture overlay', href: '/docs/noisebg' },
      { name: 'BrutalistCard', desc: 'Preset neo-brutalist card', href: '/docs/brutalistcard' },
    ],
  },
  {
    name: 'Theme',
    color: 'bg-fx-purple',
    count: 1,
    items: [
      { name: 'ThemeProvider', desc: 'Dark mode + token overrides', href: '/docs/themeprovider' },
    ],
  },
  {
    name: 'Misc',
    color: 'bg-fx-blue',
    count: 2,
    items: [
      { name: 'Accordion', desc: 'Smooth animation, 2 variants', href: '/docs/accordion' },
      { name: 'Tour', desc: 'Spotlight onboarding steps', href: '/docs/tour' },
    ],
  },
];

const totalComponents = categories.reduce((sum, c) => sum + c.count, 0);

const stats = [
  { value: `${totalComponents}`, label: 'Components' },
  { value: `${categories.length}`, label: 'Categories' },
  { value: '100%', label: 'TypeScript' },
  { value: 'MIT', label: 'License' },
];

const features = [
  { icon: '⚡', title: 'No runtime', desc: 'Pure Tailwind utility classes. No CSS-in-JS, no style injection at runtime.' },
  { icon: '♿', title: 'Accessible', desc: 'Built on Radix UI primitives. ARIA roles and keyboard navigation included.' },
  { icon: '🎨', title: 'Customizable', desc: 'Override any style via className. CVA variants for every component.' },
  { icon: '📦', title: 'Tree-shakeable', desc: 'Only ship what you use. ESM + CJS + type declarations.' },
  { icon: '🌙', title: 'Dark mode', desc: 'Full dark mode via Tailwind dark: prefix. ThemeProvider for runtime switching.' },
  { icon: '🔒', title: 'Strict TypeScript', desc: 'Typed props on every component. forwardRef throughout. No any.' },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="fx-grid-pattern relative min-h-[92vh] flex flex-col items-center justify-center px-8 py-28">
        {/* Decorative shapes */}
        <div className="absolute top-12 left-14 w-20 h-20 bg-fx-yellow border-2 border-fx-black shadow-fx rotate-12 hidden lg:block pointer-events-none" />
        <div className="absolute top-20 left-36 w-6 h-6 bg-fx-pink border-2 border-fx-black rotate-45 hidden lg:block pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-14 h-14 bg-fx-pink border-2 border-fx-black shadow-fx -rotate-6 hidden lg:block pointer-events-none" />
        <div className="absolute top-28 right-28 w-10 h-10 bg-fx-green border-2 border-fx-black shadow-fx rotate-3 hidden lg:block pointer-events-none" />
        <div className="absolute bottom-32 left-24 w-8 h-8 bg-fx-blue border-2 border-fx-black -rotate-12 hidden lg:block pointer-events-none" />
        <div className="absolute top-1/2 right-12 w-5 h-5 bg-fx-purple border-2 border-fx-black rotate-12 hidden xl:block pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 border-2 border-fx-black bg-fx-white shadow-fx-sm mb-8 rounded-[4px]">
            <span className="h-2 w-2 rounded-full bg-fx-green" />
            <span className="text-sm font-bold font-sans text-fx-black tracking-wide">
              Open Source · MIT License
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-[9rem] md:text-[13rem] font-black leading-none tracking-tighter mb-4 text-fx-black select-none">
            FXUI
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl font-black font-display text-fx-black mb-3 leading-tight">
            Brutal by design.{' '}
            <span className="bg-fx-yellow px-2 py-0 inline-block -rotate-1">Yours to own.</span>
          </p>
          <p className="text-base md:text-lg text-gray-500 mb-12 max-w-lg mx-auto font-sans leading-relaxed">
            A Neo-brutalist React component library. {totalComponents} components built with TypeScript, Tailwind CSS, and Radix UI.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] bg-fx-black text-fx-white font-black text-base font-sans border-2 border-fx-black shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150"
            >
              Get Started →
            </Link>
            <Link
              href="#components"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] bg-fx-white text-fx-black font-black text-base font-sans border-2 border-fx-black shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150"
            >
              Browse {totalComponents} components
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="border-y-2 border-fx-black bg-fx-black">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-fx-white/20">
          {stats.map((s) => (
            <div key={s.label} className="py-8 px-6 text-center">
              <p className="font-display font-black text-4xl md:text-5xl text-fx-yellow leading-none mb-1">
                {s.value}
              </p>
              <p className="text-xs font-sans font-bold text-gray-400 uppercase tracking-widest">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Install ──────────────────────────────────────── */}
      <section className="py-16 px-8 bg-fx-black border-b-2 border-fx-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-black text-fx-white mb-6">Quick Install</h2>
          <div className="flex flex-col gap-3">
            {[
              { pkg: 'pnpm', cmd: 'add', accent: 'text-fx-yellow' },
              { pkg: 'npm',  cmd: 'install', accent: 'text-fx-pink' },
              { pkg: 'yarn', cmd: 'add', accent: 'text-fx-green' },
            ].map(({ pkg, cmd, accent }) => (
              <div
                key={pkg}
                className="bg-gray-950 border-2 border-gray-700 rounded-[4px] px-5 py-3 text-left font-mono text-sm flex items-center gap-3"
              >
                <span className="text-gray-600">$</span>
                <span className={`font-bold ${accent}`}>{pkg}</span>
                <span className="text-gray-400">{cmd}</span>
                <span className="text-fx-white">@fxui/core</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Component Grid by category ───────────────────── */}
      <section id="components" className="py-24 px-8 border-b-2 border-fx-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-14 flex-wrap">
            <div>
              <h2 className="font-display text-6xl font-black text-fx-black leading-none">
                Components
              </h2>
              <p className="text-gray-500 font-sans mt-2">
                {totalComponents} components across {categories.length} categories
              </p>
            </div>
            <Link
              href="/docs/getting-started"
              className="text-sm font-bold font-sans text-fx-black underline underline-offset-2 hover:text-fx-blue transition-colors"
            >
              Installation guide →
            </Link>
          </div>

          <div className="flex flex-col gap-12">
            {categories.map((cat) => (
              <div key={cat.name}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className={`h-4 w-4 rounded-[2px] border-2 border-fx-black ${cat.color} shrink-0`} />
                  <h3 className="font-display font-black text-xl text-fx-black uppercase tracking-wider">
                    {cat.name}
                  </h3>
                  <span className="font-mono text-xs text-gray-400 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-[4px]">
                    {cat.count}
                  </span>
                  <div className="flex-1 border-t-2 border-dashed border-gray-200" />
                </div>

                {/* Items */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {cat.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group block p-4 rounded-[4px] border-2 border-fx-black bg-fx-white shadow-fx hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
                    >
                      <p className="font-bold text-sm font-sans text-fx-black leading-tight mb-1 group-hover:text-fx-blue transition-colors">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400 font-sans leading-snug">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="py-24 px-8 bg-fx-black border-b-2 border-fx-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-5xl font-black text-fx-white mb-2">Why FXUI?</h2>
          <p className="text-gray-400 font-sans mb-14">The design system that doesn't apologize for being opinionated.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 border-2 border-gray-700 bg-gray-950 rounded-[4px] hover:border-fx-white transition-colors group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-base font-sans mb-2 text-fx-white">{f.title}</h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ───────────────────────────────────── */}
      <section className="py-20 px-8 fx-grid-pattern">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="font-display font-black text-5xl text-fx-black">FXUI</span>
          </div>
          <p className="text-lg font-sans text-gray-600 mb-8 max-w-md mx-auto">
            Start building neo-brutalist interfaces today. No design experience required.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] bg-fx-black text-fx-white font-black text-base font-sans border-2 border-fx-black shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
            >
              Read the docs →
            </Link>
          </div>
          <p className="mt-8 text-xs text-gray-400 font-mono">
            MIT License · Built with ♥ and sharp corners
          </p>
        </div>
      </section>

    </div>
  );
}
