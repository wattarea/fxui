import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { InlineEdit } from './InlineEdit';

const meta: Meta<typeof InlineEdit> = {
  title: 'Components/Interaction/InlineEdit',
  component: InlineEdit,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof InlineEdit>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState('Click me to edit this text');
      return (
        <div className="p-6 max-w-sm">
          <InlineEdit value={value} onSave={setValue} />
        </div>
      );
    }
    return <Demo />;
  },
};

export const EmptyState: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <InlineEdit defaultValue="" emptyLabel="Add a description…" />
    </div>
  ),
};

export const NumberType: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState('42');
      return (
        <div className="p-6 max-w-sm flex items-center gap-2">
          <span className="text-sm font-sans text-gray-400">Quantity:</span>
          <InlineEdit type="number" value={value} onSave={setValue} />
        </div>
      );
    }
    return <Demo />;
  },
};

export const TextareaType: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState('This is a longer description that can be edited inline. Click to expand into a textarea and type your changes.');
      return (
        <div className="p-6 max-w-md">
          <InlineEdit type="textarea" value={value} onSave={setValue} rows={4} />
        </div>
      );
    }
    return <Demo />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <InlineEdit defaultValue="This text cannot be edited" disabled />
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <InlineEdit defaultValue="Read-only content — no hover indicator" readOnly />
    </div>
  ),
};

export const ProfileCard: Story = {
  render: () => {
    function Demo() {
      const [name, setName]   = React.useState('Alice Kim');
      const [role, setRole]   = React.useState('Senior Designer');
      const [bio, setBio]     = React.useState('Passionate about design systems and neo-brutalist aesthetics. Building FXUI with ❤️');
      const [city, setCity]   = React.useState('San Francisco, CA');

      return (
        <div className="p-6 max-w-sm">
          <div className="border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
            <div className="h-20 bg-fx-yellow border-b-2 border-fx-black" />
            <div className="px-5 pb-5">
              <div className="h-14 w-14 rounded-full bg-fx-black border-2 border-fx-white ring-2 ring-fx-black -mt-7 mb-3 flex items-center justify-center font-display font-black text-xl text-fx-white">
                AK
              </div>
              <div className="mb-1">
                <InlineEdit
                  value={name}
                  onSave={setName}
                  className="font-display font-black text-xl text-fx-black"
                />
              </div>
              <div className="mb-3">
                <InlineEdit
                  value={role}
                  onSave={setRole}
                  className="text-sm text-gray-400"
                />
              </div>
              <div className="mb-3">
                <InlineEdit
                  type="textarea"
                  value={bio}
                  onSave={setBio}
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <span className="text-xs">📍</span>
                <InlineEdit value={city} onSave={setCity} className="text-xs text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

export const DataTable: Story = {
  render: () => {
    function Demo() {
      const [rows, setRows] = React.useState([
        { id: 1, name: 'Button',   status: 'Stable',     version: '1.0.0' },
        { id: 2, name: 'Input',    status: 'Beta',        version: '0.9.2' },
        { id: 3, name: 'DataGrid', status: 'In Progress', version: '0.1.0' },
      ]);

      const update = (id: number, field: string, val: string) =>
        setRows((r) => r.map((row) => row.id === id ? { ...row, [field]: val } : row));

      return (
        <div className="p-6 max-w-lg">
          <div className="border-2 border-fx-black rounded-[4px] overflow-hidden">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b-2 border-fx-black bg-gray-50">
                  {['Component', 'Status', 'Version'].map((h) => (
                    <th key={h} className="text-left px-4 py-2 font-bold text-xs tracking-wide uppercase text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-2">
                      <InlineEdit value={row.name} onSave={(v) => update(row.id, 'name', v)} />
                    </td>
                    <td className="px-4 py-2">
                      <InlineEdit value={row.status} onSave={(v) => update(row.id, 'status', v)} />
                    </td>
                    <td className="px-4 py-2">
                      <InlineEdit value={row.version} onSave={(v) => update(row.id, 'version', v)} className="font-mono" />
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
