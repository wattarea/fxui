'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  {
    section: 'GETTING STARTED',
    items: [
      { label: 'Installation', href: '/docs/getting-started' },
    ],
  },
  {
    section: 'CORE',
    items: [
      { label: 'Button', href: '/docs/button' },
      { label: 'Badge', href: '/docs/badge' },
      { label: 'Chip', href: '/docs/chip' },
      { label: 'Tag', href: '/docs/tag' },
      { label: 'Kbd', href: '/docs/kbd' },
      { label: 'Divider', href: '/docs/divider' },
      { label: 'Spinner', href: '/docs/spinner' },
      { label: 'FloatingActionButton', href: '/docs/floatingactionbutton' },
    ],
  },
  {
    section: 'LAYOUT',
    items: [
      { label: 'Container', href: '/docs/container' },
      { label: 'Stack', href: '/docs/stack' },
      { label: 'Flex', href: '/docs/flex' },
      { label: 'Grid', href: '/docs/grid' },
      { label: 'AspectRatio', href: '/docs/aspectratio' },
      { label: 'ScrollArea', href: '/docs/scrollarea' },
      { label: 'SplitLayout', href: '/docs/splitlayout' },
      { label: 'Masonry', href: '/docs/masonry' },
    ],
  },
  {
    section: 'TYPOGRAPHY',
    items: [
      { label: 'Heading', href: '/docs/heading' },
      { label: 'Text', href: '/docs/text' },
      { label: 'Label', href: '/docs/label' },
      { label: 'Caption', href: '/docs/caption' },
      { label: 'Blockquote', href: '/docs/blockquote' },
      { label: 'Code', href: '/docs/code' },
      { label: 'PullQuote', href: '/docs/pullquote' },
      { label: 'GradientText', href: '/docs/gradienttext' },
    ],
  },
  {
    section: 'FORM',
    items: [
      { label: 'Input', href: '/docs/input' },
      { label: 'PasswordInput', href: '/docs/passwordinput' },
      { label: 'SearchInput', href: '/docs/searchinput' },
      { label: 'Textarea', href: '/docs/textarea' },
      { label: 'Select', href: '/docs/select' },
      { label: 'NumberInput', href: '/docs/numberinput' },
      { label: 'Slider', href: '/docs/slider' },
      { label: 'Checkbox', href: '/docs/checkbox' },
      { label: 'CheckboxGroup', href: '/docs/checkboxgroup' },
      { label: 'Switch', href: '/docs/switch' },
      { label: 'SwitchGroup', href: '/docs/switchgroup' },
      { label: 'RadioGroup', href: '/docs/radiogroup' },
      { label: 'SegmentedControl', href: '/docs/segmentedcontrol' },
      { label: 'OTPInput', href: '/docs/otpinput' },
      { label: 'Rating', href: '/docs/rating' },
      { label: 'FormField', href: '/docs/formfield' },
      { label: 'InputGroup', href: '/docs/inputgroup' },
    ],
  },
  {
    section: 'FORM ADVANCED',
    items: [
      { label: 'DatePicker', href: '/docs/datepicker' },
      { label: 'TagInput', href: '/docs/taginput' },
      { label: 'ComboBox', href: '/docs/combobox' },
      { label: 'FileUpload', href: '/docs/fileupload' },
      { label: 'ColorPicker', href: '/docs/colorpicker' },
      { label: 'PhoneInput', href: '/docs/phoneinput' },
      { label: 'MaskInput', href: '/docs/maskinput' },
      { label: 'TreeSelect', href: '/docs/treeselect' },
      { label: 'PinInput', href: '/docs/pininput' },
      { label: 'AutoComplete', href: '/docs/autocomplete' },
    ],
  },
  {
    section: 'DATA DISPLAY',
    items: [
      { label: 'Table', href: '/docs/table' },
      { label: 'Card', href: '/docs/card' },
      { label: 'Avatar', href: '/docs/avatar' },
      { label: 'Stat', href: '/docs/stat' },
      { label: 'Timeline', href: '/docs/timeline' },
      { label: 'Progress', href: '/docs/progress' },
      { label: 'Skeleton', href: '/docs/skeleton' },
      { label: 'TreeView', href: '/docs/treeview' },
      { label: 'DataList', href: '/docs/datalist' },
      { label: 'List', href: '/docs/list' },
      { label: 'AvatarGroup', href: '/docs/avatargroup' },
      { label: 'TimeAgo', href: '/docs/timeago' },
      { label: 'Countdown', href: '/docs/countdown' },
    ],
  },
  {
    section: 'FEEDBACK',
    items: [
      { label: 'Toast', href: '/docs/toast' },
      { label: 'Alert', href: '/docs/alert' },
      { label: 'EmptyState', href: '/docs/emptystate' },
      { label: 'Banner', href: '/docs/banner' },
      { label: 'ConfirmDialog', href: '/docs/confirmdialog' },
      { label: 'Notification', href: '/docs/notification' },
      { label: 'Callout', href: '/docs/callout' },
      { label: 'LoadingOverlay', href: '/docs/loadingoverlay' },
    ],
  },
  {
    section: 'NAVIGATION',
    items: [
      { label: 'Tabs', href: '/docs/tabs' },
      { label: 'Breadcrumb', href: '/docs/breadcrumb' },
      { label: 'Pagination', href: '/docs/pagination' },
      { label: 'Stepper', href: '/docs/stepper' },
      { label: 'Navbar', href: '/docs/navbar' },
      { label: 'NavMenu', href: '/docs/navmenu' },
      { label: 'AppSidebar', href: '/docs/appsidebar' },
      { label: 'ScrollProgress', href: '/docs/scrollprogress' },
    ],
  },
  {
    section: 'OVERLAY',
    items: [
      { label: 'Modal', href: '/docs/modal' },
      { label: 'Drawer', href: '/docs/drawer' },
      { label: 'Tooltip', href: '/docs/tooltip' },
      { label: 'Popover', href: '/docs/popover' },
      { label: 'DropdownMenu', href: '/docs/dropdownmenu' },
      { label: 'ContextMenu', href: '/docs/contextmenu' },
      { label: 'CommandPalette', href: '/docs/commandpalette' },
      { label: 'HoverCard', href: '/docs/hovercard' },
      { label: 'SheetDialog', href: '/docs/sheetdialog' },
      { label: 'Popconfirm', href: '/docs/popconfirm' },
    ],
  },
  {
    section: 'INTERACTION',
    items: [
      { label: 'Collapsible', href: '/docs/collapsible' },
      { label: 'InlineEdit', href: '/docs/inlineedit' },
    ],
  },
  {
    section: 'MEDIA & CHART',
    items: [
      { label: 'Image', href: '/docs/image' },
      { label: 'Carousel', href: '/docs/carousel' },
      { label: 'VideoPlayer', href: '/docs/videoplayer' },
      { label: 'LineChart', href: '/docs/linechart' },
      { label: 'BarChart', href: '/docs/barchart' },
      { label: 'AreaChart', href: '/docs/areachart' },
      { label: 'DonutChart', href: '/docs/donutchart' },
      { label: 'SparkLine', href: '/docs/sparkline' },
      { label: 'ProgressRing', href: '/docs/progressring' },
      { label: 'AnimatedCounter', href: '/docs/animatedcounter' },
    ],
  },
  {
    section: 'UTILITY',
    items: [
      { label: 'CopyButton', href: '/docs/copybutton' },
      { label: 'ColorSwatch', href: '/docs/colorswatch' },
      { label: 'Marquee', href: '/docs/marquee' },
      { label: 'ReadMore', href: '/docs/readmore' },
      { label: 'HighlightText', href: '/docs/highlighttext' },
      { label: 'ScrollToTop', href: '/docs/scrolltotop' },
      { label: 'QRCode', href: '/docs/qrcode' },
      { label: 'ClipboardInput', href: '/docs/clipboardinput' },
    ],
  },
  {
    section: 'SPECIAL',
    items: [
      { label: 'GlitchText', href: '/docs/glitchtext' },
      { label: 'TypewriterText', href: '/docs/typewritertext' },
      { label: 'NoiseBg', href: '/docs/noisebg' },
      { label: 'BrutalistCard', href: '/docs/brutalistcard' },
    ],
  },
  {
    section: 'THEME',
    items: [
      { label: 'ThemeProvider', href: '/docs/themeprovider' },
    ],
  },
  {
    section: 'MISC',
    items: [
      { label: 'Accordion', href: '/docs/accordion' },
      { label: 'Tour', href: '/docs/tour' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r-2 border-fx-black bg-fx-white dark:bg-fx-black dark:border-fx-white overflow-y-auto z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b-2 border-fx-black dark:border-fx-white">
        <Link href="/" className="inline-block">
          <span className="font-display text-2xl font-black text-fx-black dark:text-fx-white hover:text-fx-blue transition-colors">
            FXUI
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="p-4 pb-20">
        {navigation.map((group) => (
          <div key={group.section} className="mb-6">
            <p className="text-[10px] font-black tracking-widest text-gray-400 mb-2 px-2 uppercase">
              {group.section}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={[
                        'block px-3 py-1.5 rounded-[4px] text-sm font-medium font-sans transition-all duration-100',
                        isActive
                          ? 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black shadow-fx-sm translate-x-[2px] translate-y-[2px]'
                          : 'text-fx-black dark:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-64 p-4 border-t-2 border-fx-black dark:border-fx-white bg-fx-white dark:bg-fx-black">
        <p className="text-xs text-gray-400 font-sans text-center">
          v1.0.0 · MIT License · 117 components
        </p>
      </div>
    </aside>
  );
}
