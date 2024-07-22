import type { Meta, StoryObj } from '@storybook/vue3';
import { FIGMA_LINKS } from '@/constants/figma-links';
import Widget from './whos-out-widget.vue';

const meta = {
  title: 'components/whos-out-widget',
  component: Widget,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: FIGMA_LINKS.widget
    }
  }
} satisfies Meta<typeof Widget>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export default meta;
