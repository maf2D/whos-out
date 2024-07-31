// mock data
const userNames = ['Den', 'Vlad', 'Alex', 'Sergey'];
const userPosition = ['Front-end', 'Back-end', 'QA', 'Manager'];

const randomNumber = (number) =>
  Math.floor(Math.random() * number);

export const createUsers = (n) => {
  const users = [];

  // create n users
  for (let i = 0; i < n; i++) {

    // randomly set on holidays and on vacation
    const onHolidays = !!randomNumber(2);
    const onVacation = onHolidays ? false : !!randomNumber(2);

    const newUser = {
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
