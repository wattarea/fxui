import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Modal',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <Button>Open Modal</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <p className="font-sans text-fx-black">
            This is the modal body content. You can put anything here.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6">
      {(['sm', 'md', 'lg', 'full'] as const).map((size) => (
        <Modal key={size}>
          <Modal.Trigger>
            <Button variant="outline">{size.toUpperCase()}</Button>
          </Modal.Trigger>
          <Modal.Content size={size}>
            <Modal.Header>Size: {size}</Modal.Header>
            <Modal.Body>
              <p className="font-sans">Modal with size="{size}".</p>
            </Modal.Body>
            <Modal.Footer>
              <Button>Close</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      ))}
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <Button variant="neon">Open Form</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>Create New Item</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm">Name</label>
              <input
                className="border-2 border-fx-black rounded-[4px] px-3 py-2 font-sans focus:outline-none focus:shadow-fx"
                placeholder="Enter name..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm">Description</label>
              <textarea
                className="border-2 border-fx-black rounded-[4px] px-3 py-2 font-sans focus:outline-none focus:shadow-fx resize-none"
                rows={3}
                placeholder="Enter description..."
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost">Cancel</Button>
          <Button>Create</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <Button variant="destructive">Delete Item</Button>
      </Modal.Trigger>
      <Modal.Content size="sm">
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>
          <p className="font-sans">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ),
};
