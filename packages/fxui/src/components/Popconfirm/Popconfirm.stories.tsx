import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Popconfirm } from './Popconfirm';

const meta: Meta<typeof Popconfirm> = {
  title: 'Components/Overlay/Popconfirm',
  component: Popconfirm,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Popconfirm>;

const Btn = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: string }) => (
  <button className={`px-4 py-2 text-sm font-bold font-sans border-2 border-fx-black rounded-[4px] shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${variant === 'danger' ? 'bg-fx-pink text-white border-fx-pink' : variant === 'warning' ? 'bg-fx-yellow text-fx-black' : 'bg-fx-white text-fx-black'}`}>
    {children}
  </button>
);

export const Default: Story = {
  render: () => (
    <div className="p-12 flex justify-center">
      <Popconfirm
        title="Are you sure?"
        description="This action cannot be undone."
        onConfirm={() => alert('Confirmed!')}
        trigger={<Btn>Delete item</Btn>}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="p-12 flex gap-4 justify-center">
      <Popconfirm
        variant="default"
        title="Confirm action"
        description="Do you want to proceed?"
        trigger={<Btn>Default</Btn>}
      />
      <Popconfirm
        variant="danger"
        title="Delete forever?"
        description="This will permanently remove the file."
        confirmText="Delete"
        trigger={<Btn variant="danger">Danger</Btn>}
      />
      <Popconfirm
        variant="warning"
        title="Unsaved changes"
        description="You have unsaved changes. Leave anyway?"
        confirmText="Leave"
        trigger={<Btn variant="warning">Warning</Btn>}
      />
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="p-20 flex gap-4 justify-center flex-wrap">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Popconfirm
          key={side}
          side={side}
          title={`Confirm (${side})`}
          trigger={<Btn>{side}</Btn>}
        />
      ))}
    </div>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <div className="p-12 flex justify-center">
      <Popconfirm
        variant="danger"
        title="Delete your account?"
        description="This action cannot be undone. All your data will be permanently deleted."
        confirmText="Yes, delete"
        cancelText="Cancel"
        trigger={<Btn variant="danger">Delete Account</Btn>}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="p-12 flex justify-center">
      <Popconfirm
        title="Won't open"
        disabled
        trigger={<Btn>Disabled</Btn>}
      />
    </div>
  ),
};

export const InTable: Story = {
  render: () => {
    function Demo() {
      const [rows, setRows] = React.useState([
        { id: 1, name: 'Alice Kim',   role: 'Admin' },
        { id: 2, name: 'Bob Chen',    role: 'Editor' },
        { id: 3, name: 'Cara Davis',  role: 'Viewer' },
      ]);
      return (
        <div className="p-6 max-w-lg">
          <div className="border-2 border-fx-black rounded-[4px] overflow-hidden">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b-2 border-fx-black bg-gray-50 dark:bg-gray-900">
                  <th className="text-left px-4 py-2 font-bold">Name</th>
                  <th className="text-left px-4 py-2 font-bold">Role</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-2 font-medium text-fx-black dark:text-fx-white">{row.name}</td>
                    <td className="px-4 py-2 text-gray-500">{row.role}</td>
                    <td className="px-4 py-2 text-right">
                      <Popconfirm
                        variant="danger"
                        title={`Remove ${row.name}?`}
                        description="They will lose access immediately."
                        confirmText="Remove"
                        side="left"
                        onConfirm={() => setRows((r) => r.filter((x) => x.id !== row.id))}
                        trigger={
                          <button className="text-xs font-bold font-sans text-fx-pink hover:underline">
                            Remove
                          </button>
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};
