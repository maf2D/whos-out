import type { Api, GetUsersResponse, User } from '@/types/api';
import { users } from '@/stubs/users';

export const api: Api = {
  getUsers({
    str,
    limit = users.length,
    skip = 0,
    onHolidays,
    onVacation
  }) {

    // base response
    const usersResponse: GetUsersResponse = {
      users,

      usersCount: users.length,
      usersOnHolidays: 40,
      usersOnVacation: 40
    };

    // if there are no params just return a base response
    if (!str && !limit && !skip && !onHolidays && !onVacation) {
      return Promise.resolve(usersResponse);
    }

    const filteredUsers: User[] = [];

    // go through all the user and create a proper response
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];

      if (limit === filteredUsers.length) break;

      if (onHolidays && onHolidays !== currentUser.onHolidays) continue;
      if (onVacation && onVacation !== currentUser.onVacation) continue;

      // check if the user has substr in all the fields
      const isValidUser = !str || Object
        .values(currentUser)
        .some((value) => (
          typeof value === 'string' &&
          value.toLowerCase().includes(str.toLowerCase())
        ));

      // skip n users before adding to the response
      if (skip > 0 && isValidUser) {

        // decrease the skip var by one
        skip -= 1;

        continue;
      }

      // push the user to the response if he passed all the stages
      if (isValidUser) filteredUsers.push(currentUser);
    }

    return Promise.resolve({
      ...usersResponse,
      users: filteredUsers
    });
  }
};
