import type { Meta, StoryObj } from '@storybook/vue3';
import TabsList from './tabs-list.vue';

const meta = {
  title: 'lib/tabs-list',
  component: TabsList,
  tags: ['autodocs'],
  args: {
    tabs: [
      { label: 'All', badge: 10 },
      { label: 'On Holidays', badge: 3 },
      { label: 'On Vacation', badge: 4 }
    ],
    activeTab: 'All'
  },
} satisfies Meta<typeof TabsList>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export default meta;
