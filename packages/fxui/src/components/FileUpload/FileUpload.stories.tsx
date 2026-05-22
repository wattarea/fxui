import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Form/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <FileUpload label="Upload file" hint="PNG, JPG, PDF up to 10 MB" />
    </div>
  ),
};

export const ImageOnly: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <FileUpload
        label="Avatar"
        accept="image/*"
        hint="PNG or JPG, max 2 MB"
        maxSize={2 * 1024 * 1024}
      />
    </div>
  ),
};

export const MultipleFiles: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <FileUpload
        label="Documents"
        multiple
        maxFiles={5}
        hint="Upload up to 5 files"
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <FileUpload
        label="Required document"
        error="Please upload at least one file"
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [files, setFiles] = React.useState<File[]>([]);
      return (
        <div className="p-6 max-w-md space-y-3">
          <FileUpload
            label="Files"
            multiple
            value={files}
            onChange={setFiles}
            hint="Any file type"
          />
          <p className="text-xs font-mono text-gray-400">
            {files.length} file(s) selected
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <FileUpload label="Upload" disabled hint="Uploads are currently disabled" />
    </div>
  ),
};
