import type { Meta, StoryObj } from '@storybook/react';
import { TimeAgo } from './TimeAgo';

const meta: Meta<typeof TimeAgo> = {
  title: 'Components/Data Display/TimeAgo',
  component: TimeAgo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TimeAgo>;

const now = new Date();
const ago = (ms: number) => new Date(now.getTime() - ms);
const from = (ms: number) => new Date(now.getTime() + ms);

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <TimeAgo date={ago(3 * 60 * 1000)} />
    </div>
  ),
};

export const AllDistances: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-3 max-w-xs">
      {[
        { label: '30 seconds ago',  date: ago(30_000) },
        { label: '3 minutes ago',   date: ago(3 * 60_000) },
        { label: '2 hours ago',     date: ago(2 * 3600_000) },
        { label: 'Yesterday',       date: ago(25 * 3600_000) },
        { label: '3 days ago',      date: ago(3 * 86400_000) },
        { label: '2 weeks ago',     date: ago(14 * 86400_000) },
        { label: '3 months ago',    date: ago(90 * 86400_000) },
        { label: '2 years ago',     date: ago(730 * 86400_000) },
        { label: 'In 5 minutes',    date: from(5 * 60_000) },
        { label: 'Tomorrow',        date: from(25 * 3600_000) },
      ].map(({ label, date }) => (
        <div key={label} className="flex items-center justify-between border-b border-gray-100 pb-2">
          <span className="text-xs font-mono text-gray-400">{label}</span>
          <TimeAgo date={date} refreshInterval={0} />
        </div>
      ))}
    </div>
  ),
};

export const ShowAbsolute: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-3">
      <TimeAgo date={ago(3 * 60 * 1000)} />
      <TimeAgo date={ago(3 * 60 * 1000)} showAbsolute />
    </div>
  ),
};

export const InFeed: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-4">
      {[
        { user: 'Alice Kim',  initials: 'AK', color: 'bg-fx-yellow', action: 'pushed to main', time: ago(2 * 60_000) },
        { user: 'Bob Chen',   initials: 'BC', color: 'bg-fx-pink text-fx-white', action: 'opened a pull request', time: ago(18 * 60_000) },
        { user: 'Cara Davis', initials: 'CD', color: 'bg-fx-green', action: 'merged branch feature/auth', time: ago(2 * 3600_000) },
        { user: 'Dan Park',   initials: 'DP', color: 'bg-fx-blue text-fx-white', action: 'created a new release', time: ago(26 * 3600_000) },
      ].map(({ user, initials, color, action, time }) => (
        <div key={user} className="flex items-start gap-3">
          <span className={`h-8 w-8 rounded-full border-2 border-fx-black flex items-center justify-center text-xs font-black shrink-0 ${color}`}>
            {initials}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-sans">
              <strong className="font-bold text-fx-black">{user}</strong>
              <span className="text-gray-500"> {action}</span>
            </p>
            <TimeAgo date={time} refreshInterval={0} className="text-xs" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Locales: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-3 max-w-xs">
      {[
        { locale: 'en', label: 'English' },
        { locale: 'tr', label: 'Turkish' },
        { locale: 'de', label: 'German' },
        { locale: 'fr', label: 'French' },
        { locale: 'ja', label: 'Japanese' },
        { locale: 'es', label: 'Spanish' },
      ].map(({ locale, label }) => (
        <div key={locale} className="flex items-center justify-between border-b border-gray-100 pb-2">
          <span className="text-xs font-mono text-gray-400">{label}</span>
          <TimeAgo date={ago(3 * 60_000)} locale={locale} refreshInterval={0} />
        </div>
      ))}
    </div>
  ),
};
