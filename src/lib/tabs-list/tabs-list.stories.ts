import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { TABS_LIST_LABELS } from '@/constants/tabs-list-labels';
import TabsList from './tabs-list.vue';

const meta = {
  title: 'lib/tabs-list',
  component: TabsList,
  tags: ['autodocs'],
  args: {
    tabs: [
      { label: TABS_LIST_LABELS.all, badge: 10 },
      { label: TABS_LIST_LABELS.onVacation, badge: 3 },
      { label: TABS_LIST_LABELS.onHolidays, badge: 4 }
    ],
    activeTab: TABS_LIST_LABELS.all,

    'onSet-active-tab': fn()
  },
} satisfies Meta<typeof TabsList>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export default meta;
