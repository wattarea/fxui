import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tour, TourProvider, useTour } from './Tour';

const meta: Meta = {
  title: 'Components/Misc/Tour',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const steps = [
  {
    target: '#tour-step-1',
    title: 'Welcome to FXUI!',
    content: 'This is the navigation sidebar. Use it to browse all available components.',
    placement: 'right' as const,
  },
  {
    target: '#tour-step-2',
    title: 'Component Preview',
    content: 'Every component ships with Storybook stories showing all variants and interactive props.',
    placement: 'bottom' as const,
  },
  {
    target: '#tour-step-3',
    title: 'Copy & Paste',
    content: 'Click any code block to copy it. All examples are self-contained and ready to use.',
    placement: 'top' as const,
  },
  {
    title: 'You\'re all set!',
    content: 'Start building with FXUI. Check the documentation for props, accessibility notes, and design tokens.',
  },
];

function DemoUI({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
      <div className="flex">
        <aside className="w-40 border-r-2 border-fx-black p-3 bg-gray-50 space-y-1">
          <div id="tour-step-1" className="px-2 py-1.5 border-2 border-fx-black rounded-[4px] bg-fx-yellow text-xs font-black font-sans">
            Sidebar Nav
          </div>
          {['Button', 'Card', 'Input', 'Badge'].map((c) => (
            <div key={c} className="px-2 py-1 text-xs font-sans text-gray-500">{c}</div>
          ))}
        </aside>
        <main className="flex-1 p-4 space-y-3">
          <div id="tour-step-2" className="border-2 border-fx-black rounded-[4px] p-3 bg-fx-white shadow-fx-sm">
            <div className="text-xs font-black uppercase tracking-widest text-gray-400 font-sans mb-2">Preview</div>
            <div className="h-16 bg-gray-100 rounded-[4px] flex items-center justify-center text-gray-400 text-xs font-sans">
              Component preview area
            </div>
          </div>
          <div id="tour-step-3" className="border-2 border-fx-black rounded-[4px] p-3 bg-fx-black text-fx-white font-mono text-xs">
            {'<Button variant="primary">Click me</Button>'}
          </div>
          <div className="flex justify-end">{children}</div>
        </main>
      </div>
    </div>
  );
}

export const WithProvider: Story = {
  render: () => {
    function Demo() {
      const { start } = useTour();
      return (
        <div className="p-6 space-y-4">
          <DemoUI>
            <button
              onClick={start}
              className="px-4 py-2 border-2 border-fx-black bg-fx-yellow font-bold text-xs rounded-[4px] shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 font-sans"
            >
              Start Tour →
            </button>
          </DemoUI>
          <Tour steps={steps} showProgress showSkip />
        </div>
      );
    }
    return (
      <TourProvider>
        <Demo />
      </TourProvider>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = React.useState(false);
      const [completed, setCompleted] = React.useState(false);
      return (
        <div className="p-6 space-y-4">
          <DemoUI>
            <button
              onClick={() => { setOpen(true); setCompleted(false); }}
              className="px-4 py-2 border-2 border-fx-black bg-fx-black text-fx-white font-bold text-xs rounded-[4px] shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 font-sans"
            >
              {completed ? '✅ Done — Run again' : 'Start Tour →'}
            </button>
          </DemoUI>
          <Tour
            steps={steps}
            open={open}
            onOpenChange={setOpen}
            onComplete={() => { setOpen(false); setCompleted(true); }}
            showProgress
            showSkip
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const NoTargets: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = React.useState(false);
      const centeredSteps = [
        { title: 'Welcome!', content: 'This tour step has no target — it appears centered on screen.' },
        { title: 'Step Two', content: 'You can mix targeted and untargeted steps in the same tour.' },
        { title: 'Done!', content: 'All steps can be purely informational without highlighting anything.' },
      ];
      return (
        <div className="p-6">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 border-2 border-fx-black bg-fx-white font-bold text-sm rounded-[4px] shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 font-sans"
          >
            Centered Tour →
          </button>
          <Tour steps={centeredSteps} open={open} onOpenChange={setOpen} showProgress />
        </div>
      );
    }
    return <Demo />;
  },
};
