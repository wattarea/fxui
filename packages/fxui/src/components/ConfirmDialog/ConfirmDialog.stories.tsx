import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ConfirmDialog } from './ConfirmDialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/Feedback/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <ConfirmDialog
        title="Save Changes?"
        description="You have unsaved changes. Are you sure you want to leave without saving?"
        onConfirm={() => alert('Confirmed')}
        trigger={
          <button className="px-4 py-2 text-sm font-bold border-2 border-fx-black rounded-[4px] bg-fx-black text-fx-white shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            Open Dialog
          </button>
        }
      />
    </div>
  ),
};

export const Destructive: Story = {
  render: () => (
    <div className="p-6">
      <ConfirmDialog
        title="Delete Account"
        description="This action cannot be undone. All your data will be permanently deleted and cannot be recovered."
        confirmLabel="Delete Forever"
        onConfirm={() => alert('Deleted')}
        destructive
        trigger={
          <button className="px-4 py-2 text-sm font-bold border-2 border-fx-black rounded-[4px] bg-fx-pink text-fx-white shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            Delete Account
          </button>
        }
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = React.useState(false);
      const [result, setResult] = React.useState('');
      return (
        <div className="p-6 flex flex-col gap-3">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 text-sm font-bold border-2 border-fx-black rounded-[4px] shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-fit"
          >
            Controlled Dialog
          </button>
          <ConfirmDialog
            open={open}
            onOpenChange={setOpen}
            title="Publish Article?"
            description="This will make your article visible to all readers."
            confirmLabel="Publish"
            onConfirm={() => { setResult('Published!'); setOpen(false); }}
            onCancel={() => setResult('Cancelled')}
          />
          {result && <p className="text-sm font-sans text-gray-500">{result}</p>}
        </div>
      );
    }
    return <Demo />;
  },
};
