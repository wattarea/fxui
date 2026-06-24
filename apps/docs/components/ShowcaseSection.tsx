'use client';

import { useState } from 'react';
import {
  Button, Badge, Input, Switch, Progress, Alert, Avatar, AvatarGroup,
  Spinner, Tabs, Checkbox, Slider, Select,
} from '@fxui/core';

export function ShowcaseSection() {
  const [sliderVal, setSliderVal] = useState(60);
  const [checked, setChecked] = useState(true);
  const [switched, setSwitched] = useState(true);

  return (
    <section className="py-24 px-8 bg-fx-white border-b-2 border-fx-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <h2 className="font-display text-6xl font-black text-fx-black leading-none">
            In action.
          </h2>
          <p className="text-gray-500 font-sans mt-2">Live components. Try them.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Buttons */}
          <div className="border-2 border-fx-black rounded-[4px] p-6 shadow-fx bg-white">
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Button</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="neon">Neon</Button>
              <Button variant="destructive">Destructive</Button>
              <Button isLoading>Loading</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="border-2 border-fx-black rounded-[4px] p-6 shadow-fx bg-white">
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Badge</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge>Default</Badge>
              <Badge color="success">Success</Badge>
              <Badge color="warning">Warning</Badge>
              <Badge color="error">Error</Badge>
              <Badge color="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="solid" color="success">Solid</Badge>
            </div>
          </div>

          {/* Input + Select */}
          <div className="border-2 border-fx-black rounded-[4px] p-6 shadow-fx bg-white">
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Form</p>
            <div className="flex flex-col gap-4">
              <Input label="Username" placeholder="your_handle" />
              <Select
                label="Role"
                placeholder="Pick a role"
                options={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'editor', label: 'Editor' },
                  { value: 'viewer', label: 'Viewer' },
                ]}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="border-2 border-fx-black rounded-[4px] p-6 shadow-fx bg-white">
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Controls</p>
            <div className="flex flex-col gap-5">
              <Slider
                value={[sliderVal]}
                onValueChange={(v) => setSliderVal(v[0])}
                min={0} max={100}
              />
              <div className="flex items-center gap-6">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(v) => setChecked(Boolean(v))}
                  label="Remember me"
                />
                <Switch
                  checked={switched}
                  onCheckedChange={setSwitched}
                  label="Dark mode"
                />
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="border-2 border-fx-black rounded-[4px] p-6 shadow-fx bg-white">
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Progress</p>
            <div className="flex flex-col gap-3">
              <Progress value={sliderVal} color="default" />
              <Progress value={72} color="success" />
              <Progress value={38} color="warning" />
              <Progress value={91} color="error" />
            </div>
          </div>

          {/* Alert */}
          <div className="border-2 border-fx-black rounded-[4px] p-6 shadow-fx bg-white">
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Alert</p>
            <div className="flex flex-col gap-3">
              <Alert variant="success" title="Deployed!" description="Your changes are live." />
              <Alert variant="warning" title="Heads up" description="This action cannot be undone." />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-2 border-fx-black rounded-[4px] p-6 shadow-fx bg-white">
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Tabs</p>
            <Tabs defaultValue="overview">
              <Tabs.List>
                <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                <Tabs.Trigger value="code">Code</Tabs.Trigger>
                <Tabs.Trigger value="api">API</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="overview">
                <p className="text-sm text-gray-500 font-sans mt-4">117 components. Neo-brutalist aesthetic. Radix UI primitives.</p>
              </Tabs.Content>
              <Tabs.Content value="code">
                <code className="text-xs font-mono text-fx-black mt-4 block">import {'{ Button }'} from '@fxui/core'</code>
              </Tabs.Content>
              <Tabs.Content value="api">
                <p className="text-sm text-gray-500 font-sans mt-4">Full TypeScript types. forwardRef on every component.</p>
              </Tabs.Content>
            </Tabs>
          </div>

          {/* Avatar + Spinner */}
          <div className="border-2 border-fx-black rounded-[4px] p-6 shadow-fx bg-white">
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Avatar · Spinner</p>
            <div className="flex items-center gap-6 flex-wrap">
              <AvatarGroup max={4}>
                <Avatar initials="JK" size="md" />
                <Avatar initials="SR" size="md" />
                <Avatar initials="ME" size="md" />
                <Avatar initials="TK" size="md" />
                <Avatar initials="CO" size="md" />
              </AvatarGroup>
              <div className="flex items-center gap-4">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" variant="dots" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
