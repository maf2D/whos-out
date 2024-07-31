import express from 'express';
import { createUsers } from './mock-users.js';

const app = express();
const port = 3000;

const users = createUsers(200);

// users route
app.get('/users', (req, res) => {

  // query params
  const str = req.query.str;
  const limit = +req.query.limit;
  const onHolidays = req.query.onHolidays === 'true';
  const onVacation = req.query.onVacation === 'true';
  let skip = +req.query.skip;

  // base response
  const baseResponse = {
    users,
    usersCount: users.length,
    usersOnHolidays: 40,
    usersOnVacation: 40
  };

  // if there are no params just return a base response
  if (Object.keys(req.query).length === 0) {
    return res
      .status(200)
      .json({
        status: 'success',
        data: baseResponse
      });
  }

  const filteredUsers = [];

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

  res
    .status(200)
    .json({
      status: 'success',
      data: {
        ...baseResponse,
        users: filteredUsers
      }
    });
});

// start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
