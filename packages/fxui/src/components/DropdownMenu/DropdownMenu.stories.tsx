import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DropdownMenu } from './DropdownMenu';

const meta: Meta = {
  title: 'Components/Overlay/DropdownMenu',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const Trigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => (
    <button
      ref={ref}
      className="inline-flex items-center gap-2 px-4 py-2 border-2 border-fx-black bg-fx-white font-bold text-sm rounded-[4px] shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 font-sans"
      {...props}
    >
      {children} ▾
    </button>
  )
);

export const Default: Story = {
  render: () => (
    <div className="p-12 flex justify-center">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Trigger>Options</Trigger>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item icon="✏️" shortcut="⌘E">Edit</DropdownMenu.Item>
          <DropdownMenu.Item icon="📋" shortcut="⌘D">Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item icon="🗑️" shortcut="⌫" destructive>Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <div className="p-12 flex justify-center">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Trigger>Account</Trigger>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Item icon="👤">Profile</DropdownMenu.Item>
          <DropdownMenu.Item icon="⚙️">Settings</DropdownMenu.Item>
          <DropdownMenu.Item icon="💳">Billing</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Label>Team</DropdownMenu.Label>
          <DropdownMenu.Item icon="👥">Members</DropdownMenu.Item>
          <DropdownMenu.Item icon="➕">Invite</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item icon="🚪" destructive>Log out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => {
    function Demo() {
      const [showGrid, setShowGrid] = React.useState(true);
      const [showRulers, setShowRulers] = React.useState(false);
      const [showGuides, setShowGuides] = React.useState(true);
      return (
        <div className="p-12 flex justify-center">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Trigger>View</Trigger>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Show / Hide</DropdownMenu.Label>
              <DropdownMenu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
                Grid
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem checked={showRulers} onCheckedChange={setShowRulers}>
                Rulers
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem checked={showGuides} onCheckedChange={setShowGuides}>
                Guides
              </DropdownMenu.CheckboxItem>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithRadioItems: Story = {
  render: () => {
    function Demo() {
      const [theme, setTheme] = React.useState('system');
      return (
        <div className="p-12 flex justify-center">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Trigger>Theme</Trigger>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Appearance</DropdownMenu.Label>
              <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="system">System</DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithSubmenu: Story = {
  render: () => (
    <div className="p-12 flex justify-center">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Trigger>File</Trigger>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item icon="📄" shortcut="⌘N">New file</DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>📂 Open recent</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>index.tsx</DropdownMenu.Item>
              <DropdownMenu.Item>tailwind.config.ts</DropdownMenu.Item>
              <DropdownMenu.Item>package.json</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Separator />
          <DropdownMenu.Item icon="💾" shortcut="⌘S">Save</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  ),
};
