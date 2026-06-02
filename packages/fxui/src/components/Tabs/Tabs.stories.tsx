import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const tabItems = [
  { value: 'overview', label: 'Overview', content: 'Overview content: high-level summary of the project.' },
  { value: 'components', label: 'Components', content: 'Components content: list of all available components.' },
  { value: 'tokens', label: 'Tokens', content: 'Design tokens: colors, spacing, typography.' },
];

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Tabs defaultValue="overview">
        <Tabs.List>
          {tabItems.map((t) => <Tabs.Trigger key={t.value} value={t.value}>{t.label}</Tabs.Trigger>)}
        </Tabs.List>
        {tabItems.map((t) => (
          <Tabs.Content key={t.value} value={t.value}>
            <p className="font-sans text-fx-black">{t.content}</p>
          </Tabs.Content>
        ))}
      </Tabs>
    </div>
  ),
};

export const Boxed: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Tabs defaultValue="overview" variant="boxed">
        <Tabs.List>
          {tabItems.map((t) => <Tabs.Trigger key={t.value} value={t.value}>{t.label}</Tabs.Trigger>)}
        </Tabs.List>
        {tabItems.map((t) => (
          <Tabs.Content key={t.value} value={t.value}>
            <p className="font-sans text-fx-black">{t.content}</p>
          </Tabs.Content>
        ))}
      </Tabs>
    </div>
  ),
};

export const Pills: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Tabs defaultValue="overview" variant="pills">
        <Tabs.List>
          {tabItems.map((t) => <Tabs.Trigger key={t.value} value={t.value}>{t.label}</Tabs.Trigger>)}
        </Tabs.List>
        {tabItems.map((t) => (
          <Tabs.Content key={t.value} value={t.value}>
            <p className="font-sans text-fx-black">{t.content}</p>
          </Tabs.Content>
        ))}
      </Tabs>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-6 max-w-lg">
      {(['default', 'boxed', 'pills'] as const).map((variant) => (
        <div key={variant}>
          <p className="text-xs font-bold tracking-widest text-gray-400 mb-3 uppercase">{variant}</p>
          <Tabs defaultValue="overview" variant={variant}>
            <Tabs.List>
              {tabItems.map((t) => <Tabs.Trigger key={t.value} value={t.value}>{t.label}</Tabs.Trigger>)}
            </Tabs.List>
            {tabItems.map((t) => (
              <Tabs.Content key={t.value} value={t.value}>
                <p className="font-sans text-sm text-fx-black">{t.content}</p>
              </Tabs.Content>
            ))}
          </Tabs>
        </div>
      ))}
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="components">Components</Tabs.Trigger>
          <Tabs.Trigger value="pro" disabled>Pro only ★</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview"><p className="font-sans">Overview content.</p></Tabs.Content>
        <Tabs.Content value="components"><p className="font-sans">Components content.</p></Tabs.Content>
      </Tabs>
    </div>
  ),
};
