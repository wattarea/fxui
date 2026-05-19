import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Components/Form/FormField',
  component: FormField,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FormField>;

const baseInput = (id?: string, placeholder = 'Enter value…') => (
  <input
    id={id}
    placeholder={placeholder}
    className="w-full h-10 px-3 text-sm font-sans border-2 border-fx-black dark:border-fx-white rounded-[4px] bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-fx-black focus:ring-offset-1 transition-shadow"
  />
);

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <FormField label="Email address" hint="We'll never share your email." htmlFor="email-1">
        {baseInput('email-1', 'you@example.com')}
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <FormField label="Username" error="Username is already taken." htmlFor="user-1">
        {baseInput('user-1', 'Choose a username')}
      </FormField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-5">
      <FormField label="Full name" required htmlFor="name-1">
        {baseInput('name-1', 'John Doe')}
      </FormField>
      <FormField label="Email" required hint="Used for account recovery." htmlFor="email-2">
        {baseInput('email-2', 'you@example.com')}
      </FormField>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-5">
      <FormField label="Default" hint="This is a hint." htmlFor="s1">
        {baseInput('s1')}
      </FormField>
      <FormField label="Required" required htmlFor="s2">
        {baseInput('s2')}
      </FormField>
      <FormField label="With error" error="This field is required." htmlFor="s3">
        {baseInput('s3')}
      </FormField>
      <FormField label="No label" htmlFor="s4">
        {baseInput('s4', 'No label above')}
      </FormField>
    </div>
  ),
};

export const LoginForm: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <div className="border-2 border-fx-black rounded-[4px] shadow-fx p-6 flex flex-col gap-4">
        <h2 className="font-display font-black text-2xl text-fx-black dark:text-fx-white">Sign in</h2>
        <FormField label="Email" required htmlFor="lf-email">
          <input
            id="lf-email"
            type="email"
            placeholder="you@example.com"
            className="w-full h-10 px-3 text-sm font-sans border-2 border-fx-black rounded-[4px] bg-fx-white text-fx-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-fx-black focus:ring-offset-1 transition-shadow"
          />
        </FormField>
        <FormField label="Password" required hint="Minimum 8 characters." htmlFor="lf-pass">
          <input
            id="lf-pass"
            type="password"
            placeholder="••••••••"
            className="w-full h-10 px-3 text-sm font-sans border-2 border-fx-black rounded-[4px] bg-fx-white text-fx-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-fx-black focus:ring-offset-1 transition-shadow"
          />
        </FormField>
        <button className="w-full h-10 bg-fx-black text-fx-white font-bold font-sans text-sm border-2 border-fx-black rounded-[4px] shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          Sign in
        </button>
      </div>
    </div>
  ),
};

export const WithSelectAndTextarea: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-5">
      <FormField label="Country" htmlFor="ff-country">
        <select
          id="ff-country"
          className="w-full h-10 px-3 text-sm font-sans border-2 border-fx-black rounded-[4px] bg-fx-white text-fx-black outline-none focus:ring-2 focus:ring-fx-black focus:ring-offset-1 transition-shadow"
        >
          <option>United States</option>
          <option>Turkey</option>
          <option>Germany</option>
        </select>
      </FormField>
      <FormField label="Bio" hint="Max 160 characters." htmlFor="ff-bio">
        <textarea
          id="ff-bio"
          rows={3}
          placeholder="Tell us about yourself…"
          className="w-full px-3 py-2 text-sm font-sans border-2 border-fx-black rounded-[4px] bg-fx-white text-fx-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-fx-black focus:ring-offset-1 transition-shadow resize-none"
        />
      </FormField>
    </div>
  ),
};
