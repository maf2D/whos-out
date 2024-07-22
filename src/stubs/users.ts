import type { User } from '@/types/api';
import { randomNumber } from '@/helpers/random-number';

// mock data
const userNames = ['Den', 'Vlad', 'Alex', 'Sergey'];
const userPosition = ['Front-end', 'Back-end', 'QA', 'Manager'];

export const createUsers = (n: number = 200): User[] => {
  const users: User[] = [];

  // create n users
  for (let i = 0; i < n; i++) {

    // randomly set on holidays and on vacation
    const onHolidays = !!randomNumber(2);
    const onVacation = onHolidays ? false : !!randomNumber(2);

    const newUser: User = {
      id: i,
      firstName: userNames[randomNumber(userNames.length)],
      lastName: userNames[randomNumber(userNames.length)],
      position: userPosition[randomNumber(userPosition.length)],
      onHolidays,
      onVacation
    };

    users.push(newUser);
  }

  return users;
};

export const users = createUsers();
