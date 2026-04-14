import React from 'react';
import type { StoryObj, Meta } from '@storybook/react';
import { CardWrapper } from './CardWrapper';

const meta: Meta<typeof CardWrapper> = {
  title: 'Layout/CardWrapper',
  component: CardWrapper,
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof CardWrapper>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4">
        <h2 className="text-xl font-bold">Card Title</h2>
        <p className="text-sm opacity-80">This is a generic card content using the CardWrapper component.</p>
      </div>
    ),
    backgroundColor: '#ffffff',
    textColor: '#000000',
  },
};

export const DarkMode: Story = {
  args: {
    children: (
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">Dark Card</h2>
        <p className="text-sm text-gray-300">This card has custom dark styles.</p>
      </div>
    ),
    backgroundColor: '#09090b',
    textColor: '#ffffff',
  },
};
