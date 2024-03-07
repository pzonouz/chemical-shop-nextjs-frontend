import type {
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  User: User;
  Account: AccountTable;
  Session: SessionTable;
  VerificationToken: VerificationTokenTable;
}
interface UserTable {
  id: GeneratedAlways<string>;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  mobile: string | null;
  address: string | null;
  createdAt: Date | null;
}
interface AccountTable {
  id: GeneratedAlways<string>;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}
interface SessionTable {
  id: GeneratedAlways<string>;
  userId: string;
  sessionToken: string;
  expires: Date;
}
interface VerificationTokenTable {
  identifier: string;
  token: string;
  expires: Date;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
