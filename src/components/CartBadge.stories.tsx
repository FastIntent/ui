import type { Meta, StoryObj } from '@storybook/react';
import { CartBadge } from './CartBadge/CartBadge';

const meta: Meta<typeof CartBadge> = {
  title: 'Commerce/CartBadge',
  component: CartBadge,
};

export default meta;
type Story = StoryObj<typeof CartBadge>;

export const Default: Story = {
  args: {
    // El componente se encarga de mostrar el contador del carrito
  },
};
