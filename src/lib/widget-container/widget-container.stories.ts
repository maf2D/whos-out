import type { Meta, StoryObj } from '@storybook/vue3';
import WidgetContainer from './widget-container.vue';

const meta = {
  title: 'lib/widget-container',
  component: WidgetContainer,
  tags: ['autodocs'],
  args: {
    text: 'Who\'s out today',
  }
} satisfies Meta<typeof WidgetContainer>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
