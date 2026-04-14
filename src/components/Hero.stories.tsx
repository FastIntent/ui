import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero/Hero';
import { HeroTitle } from './Hero/HeroTitle';
import { HeroSubtitle } from './Hero/HeroSubtitle';

const meta: Meta<typeof Hero> = {
  title: 'Marketing/Hero',
  component: Hero,
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const CompleteHero: Story = {
  args: {
    children: (
      <>
        <HeroTitle text="Transform Your Future" />
        <HeroSubtitle text="Build amazing things with our modern platform." />
        <div className="mt-8">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Get Started
          </button>
        </div>
      </>
    ),
  },
};
