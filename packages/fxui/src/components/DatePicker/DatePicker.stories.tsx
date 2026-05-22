import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Form/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <DatePicker label="Date" placeholder="Pick a date" />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <DatePicker
        label="Start date"
        defaultValue={new Date(2025, 5, 15)}
        hint="Pre-selected to June 15, 2025"
      />
    </div>
  ),
};

export const MinMaxDate: Story = {
  render: () => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);

    return (
      <div className="p-6 max-w-xs">
        <DatePicker
          label="Schedule"
          minDate={oneWeekAgo}
          maxDate={oneWeekLater}
          hint="Selectable range: ±7 days from today"
        />
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [date, setDate] = React.useState<Date | null>(null);
      return (
        <div className="p-6 max-w-xs space-y-3">
          <DatePicker
            label="Event date"
            value={date}
            onChange={setDate}
            placeholder="Select date…"
          />
          <p className="text-xs font-mono text-gray-400">
            {date ? date.toDateString() : 'No date selected'}
          </p>
          {date && (
            <button
              onClick={() => setDate(null)}
              className="text-xs font-bold font-sans underline"
            >
              Reset
            </button>
          )}
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithError: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <DatePicker
        label="Required date"
        invalid
        error="Please select a date"
        placeholder="Pick a date"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <DatePicker
        label="Locked date"
        defaultValue={new Date(2025, 0, 1)}
        disabled
      />
    </div>
  ),
};

export const InForm: Story = {
  render: () => (
    <div className="p-6 max-w-sm space-y-4">
      <DatePicker label="Start date" placeholder="Pick start…" />
      <DatePicker label="End date" placeholder="Pick end…" />
      <button className="w-full border-2 border-fx-black bg-fx-black text-fx-white font-bold font-sans py-2 rounded-[4px] shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
        Book
      </button>
    </div>
  ),
};
