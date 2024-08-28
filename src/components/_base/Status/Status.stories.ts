import type { Meta, StoryObj } from '@storybook/react';
import { Status } from '.';

const meta = {
  title: 'base/Status',
  component: Status,
  parameters: {
    text: 'Status',
    variant: 'active'
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    variant: { control: 'text' },
  },
  args: {},
} satisfies Meta<typeof Status>;

export default meta; 
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    variant: 'success',
    text: 'Aktywny',
  },
};

export const Inactive: Story = {
  args: {
    variant: 'danger',
    text: 'Nieaktywny',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    text: 'W trakcie',
  },
};
