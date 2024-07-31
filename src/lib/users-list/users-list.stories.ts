import type { Meta, StoryObj } from '@storybook/vue3';
import UsersList from './users-list.vue';

const meta = {
  title: 'lib/users-list',
  component: UsersList,
  tags: ['autodocs']
} satisfies Meta<typeof UsersList>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    users: [
      {
        id: 0,
        firstName: 'Den',
        lastName: 'Maf',

        onHolidays: true,
        onVacation: false
      },
      {
        id: 1,
        firstName: 'Alex',
        lastName: 'Flex',

        onHolidays: false,
        onVacation: true
      },
      {
        id: 2,
        firstName: 'Nona',
        lastName: 'Bi',

        onHolidays: false,
        onVacation: false
      }
    ]
  }
};
export const WithoutUsers: Story = {};

export default meta;
