import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SwitchGroup } from './SwitchGroup';

const meta: Meta<typeof SwitchGroup> = {
  title: 'Components/Form/SwitchGroup',
  component: SwitchGroup,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SwitchGroup>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <SwitchGroup
        label="Notifications"
        options={[
          { value: 'email', label: 'Email alerts', description: 'Receive updates via email' },
          { value: 'push', label: 'Push notifications', description: 'Mobile and desktop alerts' },
          { value: 'sms', label: 'SMS alerts', description: 'Text message notifications' },
          { value: 'weekly', label: 'Weekly digest', description: 'Summary email every Monday' },
        ]}
        defaultValue={['email', 'push']}
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [val, setVal] = React.useState(['email']);
      return (
        <div className="p-6 max-w-sm flex flex-col gap-3">
          <SwitchGroup
            label="Privacy Settings"
            options={[
              { value: 'public', label: 'Public profile' },
              { value: 'analytics', label: 'Usage analytics' },
              { value: 'marketing', label: 'Marketing emails' },
            ]}
            value={val}
            onChange={setVal}
          />
          <p className="text-xs text-gray-400 font-sans">Enabled: {val.join(', ') || 'none'}</p>
        </div>
      );
    }
    return <Demo />;
  },
};
