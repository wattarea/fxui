import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Drawer',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <Drawer>
        <Drawer.Trigger><Button>Open Drawer</Button></Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>Navigation</Drawer.Header>
          <Drawer.Body>
            <p className="text-fx-black">Drawer content goes here. Add navigation links, forms, or any content.</p>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </div>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6">
      {(['right', 'left', 'top', 'bottom'] as const).map((placement) => (
        <Drawer key={placement}>
          <Drawer.Trigger><Button variant="outline">{placement}</Button></Drawer.Trigger>
          <Drawer.Content placement={placement}>
            <Drawer.Header>Drawer — {placement}</Drawer.Header>
            <Drawer.Body>
              <p>Slides in from the {placement}.</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button>Close</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      ))}
    </div>
  ),
};

export const NavigationDrawer: Story = {
  render: () => (
    <div className="p-6">
      <Drawer>
        <Drawer.Trigger><Button variant="outline">☰ Menu</Button></Drawer.Trigger>
        <Drawer.Content placement="left">
          <Drawer.Header>FXUI</Drawer.Header>
          <Drawer.Body>
            <nav className="flex flex-col gap-1">
              {['Getting Started', 'Button', 'Card', 'Input', 'Badge', 'Modal', 'Select', 'Slider'].map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="px-3 py-2 rounded-[4px] text-sm font-medium font-sans text-fx-black hover:bg-gray-100 transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </div>
  ),
};
