import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Navigation/Footer',
  component: Footer,
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    logo: 'FastDev',
    backgroundColor: '#09090b',
    textColor: '#ffffff',
  },
};

export const CustomColors: Story = {
  args: {
    logo: 'Premium Brand',
    backgroundColor: '#ffffff',
    textColor: '#09090b',
  },
};
