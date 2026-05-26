import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Table } from './Table';
import { Badge } from '../Badge/Badge';

const meta: Meta = {
  title: 'Components/Table',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const users = [
  { id: 1, name: 'Jordan Park', role: 'Admin', status: 'active', joined: '2023-01-15' },
  { id: 2, name: 'Sam Rivera', role: 'Editor', status: 'active', joined: '2023-03-22' },
  { id: 3, name: 'Morgan Ellis', role: 'Viewer', status: 'inactive', joined: '2023-06-10' },
  { id: 4, name: 'Taylor Kim', role: 'Editor', status: 'active', joined: '2024-01-05' },
  { id: 5, name: 'Casey Okafor', role: 'Admin', status: 'pending', joined: '2024-02-18' },
];

const statusMap: Record<string, React.ComponentProps<typeof Badge>['color']> = {
  active: 'success',
  inactive: 'error',
  pending: 'warning',
};

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-3xl">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {users.map((u) => (
            <Table.Row key={u.id}>
              <Table.Cell className="font-bold">{u.name}</Table.Cell>
              <Table.Cell>{u.role}</Table.Cell>
              <Table.Cell>
                <Badge color={statusMap[u.status]} size="sm">{u.status}</Badge>
              </Table.Cell>
              <Table.Cell className="font-mono text-sm">{u.joined}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div className="p-6 max-w-3xl">
      <Table variant="striped" hoverable>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {users.map((u) => (
            <Table.Row key={u.id}>
              <Table.Cell className="font-mono text-gray-400">{u.id}</Table.Cell>
              <Table.Cell className="font-bold">{u.name}</Table.Cell>
              <Table.Cell>{u.role}</Table.Cell>
              <Table.Cell>
                <Badge color={statusMap[u.status]} size="sm">{u.status}</Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};

export const Bordered: Story = {
  render: () => (
    <div className="p-6 max-w-3xl">
      <Table variant="bordered">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {users.slice(0, 3).map((u) => (
            <Table.Row key={u.id}>
              <Table.Cell className="font-bold">{u.name}</Table.Cell>
              <Table.Cell>{u.role}</Table.Cell>
              <Table.Cell>
                <Badge color={statusMap[u.status]} size="sm">{u.status}</Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <div className="p-6 max-w-xl">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Qty</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {[['Widget A', 3, '$12.00'], ['Widget B', 1, '$8.50'], ['Widget C', 5, '$3.00']].map(([item, qty, price]) => (
            <Table.Row key={String(item)}>
              <Table.Cell>{item}</Table.Cell>
              <Table.Cell>{qty}</Table.Cell>
              <Table.Cell className="font-mono">{price}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell colSpan={2} className="font-bold">Total</Table.Cell>
            <Table.Cell className="font-black font-mono">$56.00</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    </div>
  ),
};

export const Sortable: Story = {
  render: () => {
    function Demo() {
      const [sort, setSort] = React.useState<{ col: string; dir: 'asc' | 'desc' } | null>(null);
      const toggle = (col: string) =>
        setSort((s) => s?.col === col ? { col, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col, dir: 'asc' });
      const sorted = [...users].sort((a, b) => {
        if (!sort) return 0;
        const av = a[sort.col as keyof typeof a] as string;
        const bv = b[sort.col as keyof typeof b] as string;
        return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
      return (
        <div className="p-6 max-w-3xl">
          <Table hoverable>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell sortable sortDirection={sort?.col === 'name' ? sort.dir : null} onClick={() => toggle('name')}>Name</Table.HeaderCell>
                <Table.HeaderCell sortable sortDirection={sort?.col === 'role' ? sort.dir : null} onClick={() => toggle('role')}>Role</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {sorted.map((u) => (
                <Table.Row key={u.id}>
                  <Table.Cell className="font-bold">{u.name}</Table.Cell>
                  <Table.Cell>{u.role}</Table.Cell>
                  <Table.Cell><Badge color={statusMap[u.status]} size="sm">{u.status}</Badge></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
    }
    return <Demo />;
  },
};
