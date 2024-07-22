import type { Meta, StoryObj } from '@storybook/vue3';
import { users } from '@/stubs/users.ts'
import UsersList from './users-list.vue';

const meta = {
  title: 'lib/users-list',
  component: UsersList,
  tags: ['autodocs']
} satisfies Meta<typeof UsersList>;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { users } };
export const WithoutUsers: Story = {};

export default meta;
