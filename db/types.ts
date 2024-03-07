export type User = {
  id: string;
  name?: string;
  hashedPassword: string;
  email: string;
  emailVerified?: string;
  image?: string;
};
