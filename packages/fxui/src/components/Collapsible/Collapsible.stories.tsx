import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Collapsible } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Interaction/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <Collapsible title="What is FXUI?">
        FXUI is a neo-brutalist React component library built with Tailwind CSS and Radix UI primitives.
      </Collapsible>
    </div>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <Collapsible title="Expanded by default" defaultOpen>
        This panel starts open. Click the header to collapse it.
      </Collapsible>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-4">
      <Collapsible variant="default" title="Default variant" defaultOpen>
        Standard border and white background.
      </Collapsible>
      <Collapsible variant="filled" title="Filled variant" defaultOpen>
        Slightly gray background for emphasis.
      </Collapsible>
      <Collapsible variant="ghost" title="Ghost variant" defaultOpen>
        Borderless — only a bottom line. Great for inline sections.
      </Collapsible>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-3">
      <Collapsible icon="⚙️" title="Settings" defaultOpen>
        Configure your account preferences here.
      </Collapsible>
      <Collapsible icon="🔒" title="Security">
        Manage your password and two-factor authentication.
      </Collapsible>
      <Collapsible icon="🎨" title="Appearance">
        Choose your theme and display options.
      </Collapsible>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <Collapsible
        title="Team Members"
        defaultOpen
        actions={
          <button
            className="text-xs font-bold font-sans px-2 py-1 border-2 border-fx-black rounded-[4px] hover:bg-gray-100 transition-colors"
          >
            + Add
          </button>
        }
      >
        <div className="flex flex-col gap-2">
          {['Alice Kim', 'Bob Chen', 'Cara Davis'].map((name) => (
            <div key={name} className="flex items-center gap-2 text-sm">
              <span className="h-6 w-6 rounded-full bg-fx-yellow border border-fx-black flex items-center justify-center text-[10px] font-black">
                {name[0]}
              </span>
              {name}
            </div>
          ))}
        </div>
      </Collapsible>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = React.useState(false);
      return (
        <div className="p-6 max-w-sm flex flex-col gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setOpen(true)}
              className="px-3 py-1.5 text-sm font-bold font-sans border-2 border-fx-black rounded-[4px] hover:bg-gray-100"
            >
              Open
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 text-sm font-bold font-sans border-2 border-fx-black rounded-[4px] hover:bg-gray-100"
            >
              Close
            </button>
          </div>
          <Collapsible title="Controlled panel" open={open} onOpenChange={setOpen}>
            This collapsible is controlled externally.
          </Collapsible>
        </div>
      );
    }
    return <Demo />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <Collapsible title="Cannot be toggled" disabled>
        This content is not accessible while disabled.
      </Collapsible>
    </div>
  ),
};

export const FAQ: Story = {
  render: () => {
    const faqs = [
      { q: 'Is FXUI free to use?', a: 'Yes! FXUI core is fully open-source under MIT license. We also offer a Pro tier with premium components.' },
      { q: 'Does it work with Next.js?', a: 'Absolutely. FXUI is designed to work seamlessly with Next.js App Router and Pages Router.' },
      { q: 'Can I customize the colors?', a: 'Yes — all tokens are defined in tailwind.config.ts and can be overridden to match your brand.' },
      { q: 'Is it accessible?', a: 'All interactive components are built on Radix UI primitives, which are fully accessible and WAI-ARIA compliant.' },
    ];
    return (
      <div className="p-6 max-w-lg flex flex-col gap-2">
        <h2 className="font-display font-black text-2xl text-fx-black mb-2">FAQ</h2>
        {faqs.map((faq) => (
          <Collapsible key={faq.q} variant="ghost" title={faq.q}>
            <p className="text-gray-500 leading-relaxed">{faq.a}</p>
          </Collapsible>
        ))}
      </div>
    );
  },
};
