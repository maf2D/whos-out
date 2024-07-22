import type { Meta, StoryObj } from '@storybook/vue3';
import Search from './search.vue';

const meta = {
  title: 'lib/search',
  component: Search,
  tags: ['autodocs']
} satisfies Meta<typeof Search>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export default meta;
