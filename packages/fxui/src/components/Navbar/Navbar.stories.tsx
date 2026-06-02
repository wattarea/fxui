import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Navbar, NavbarItem } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navigation/Navbar',
  component: Navbar,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Navbar>;

const Logo = () => (
  <span className="font-display text-xl font-black text-fx-black dark:text-fx-white">FXUI</span>
);

const noNav = (e: React.MouseEvent) => e.preventDefault();

const NavItems = ({ active = 'Docs' }) => (
  <>
    <NavbarItem href="#" onClick={noNav} active={active === 'Home'}>Home</NavbarItem>
    <NavbarItem href="#" onClick={noNav} active={active === 'Docs'}>Docs</NavbarItem>
    <NavbarItem href="#" onClick={noNav} active={active === 'Blog'}>Blog</NavbarItem>
    <NavbarItem href="#" onClick={noNav} active={active === 'About'}>About</NavbarItem>
  </>
);

const Actions = ({ dark = false }) => (
  <button className={`px-3 py-1.5 text-xs font-bold border-2 rounded-[4px] shadow-fx-sm transition-all hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] ${dark ? 'border-fx-white bg-fx-white text-fx-black' : 'border-fx-black bg-fx-black text-fx-white'}`}>
    Get Started
  </button>
);

export const Default: Story = {
  render: () => (
    <Navbar logo={<Logo />} actions={<Actions />}>
      <NavItems />
    </Navbar>
  ),
};

export const BlackVariant: Story = {
  render: () => (
    <Navbar variant="black" logo={<span className="font-display text-xl font-black text-fx-white">FXUI</span>} actions={<Actions dark />}>
      <NavbarItem href="#" onClick={noNav} className="text-fx-white hover:bg-gray-800">Home</NavbarItem>
      <NavbarItem href="#" onClick={noNav} active className="!bg-fx-yellow !text-fx-black !border-fx-black">Docs</NavbarItem>
      <NavbarItem href="#" onClick={noNav} className="text-fx-white hover:bg-gray-800">Blog</NavbarItem>
    </Navbar>
  ),
};

export const YellowVariant: Story = {
  render: () => (
    <Navbar variant="yellow" logo={<span className="font-display text-xl font-black text-fx-black">FXUI</span>} actions={<Actions />}>
      <NavItems />
    </Navbar>
  ),
};

export const Sticky: Story = {
  render: () => (
    <div className="h-32 overflow-auto border-2 border-fx-black rounded-[4px]">
      <Navbar logo={<Logo />} sticky actions={<Actions />}>
        <NavItems />
      </Navbar>
      <div className="p-4 font-sans text-sm text-gray-400">Scroll this container to see sticky behavior...</div>
      <div className="h-64 p-4 font-sans text-sm text-gray-200">Content below...</div>
    </div>
  ),
};
