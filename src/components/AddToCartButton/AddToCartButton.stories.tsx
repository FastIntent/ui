import type { Meta, StoryObj } from '@storybook/react';
import { AddToCartButton } from './AddToCartButton';
import React from 'react';

const meta: Meta<typeof AddToCartButton> = {
  title: 'Commerce/AddToCartButton',
  component: AddToCartButton,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    text: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AddToCartButton>;

export const Default: Story = {
  args: {
    text: 'Añadir al Carrito',
    color: '#3b82f6',
  },
};

export const Dark: Story = {
  args: {
    text: 'Comprar ahora',
    color: '#1e1e1e',
  },
};

export const WithCustomChildren: Story = {
  args: {
    text: 'Oferta Especial',
    color: '#ef4444',
    children: (
       <div className="ml-2 bg-white/20 px-2 py-0.5 rounded text-[10px]">
         NEW
       </div>
    )
  },
};
