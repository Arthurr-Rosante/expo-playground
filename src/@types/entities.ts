export type User = {
  id?: string;

  username?: string;
  email: string;
  pfp?: string;
  biography: string;

  createdAt?: Date;
  updatedAt?: Date;
};
