export type Api = {
  getUsers: (params: GetUsersParams) => Promise<GetUsersResponse>;
};

export type GetUsersParams = Partial<{
  str: string;
  limit: number;
  skip: number;
  onHolidays: boolean;
  onVacation: boolean;
}>;

export type GetUsersResponse = {
  users: User[];

  usersCount: number;
  usersOnHolidays: number;
  usersOnVacation: number;
};

export type User = {
  id: number,
  firstName: string;
  lastName: string;
  avatar?: string;
  position?: string;
  team?: string;
  department?: string;
  division?: string;
  location?: string;

  onHolidays: boolean;
  onVacation: boolean;
};
