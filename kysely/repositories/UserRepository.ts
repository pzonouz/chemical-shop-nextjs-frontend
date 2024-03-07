import { UUID } from "crypto";
import { db } from "../db";
import { NewUser, User, UserUpdate } from "../types";

const nonSensitiveUserColumns = [
  "id",
  "firstName",
  "lastName",
  "email",
  "mobile",
  "createdAt",
  "address",
  "emailVerified",
] as const satisfies ReadonlyArray<keyof User>;

export function findUserById(id: string) {
  const query = db.selectFrom("User");
  return (
    query
      .where("id", "=", id)
      // @ts-ignore
      .select(nonSensitiveUserColumns)
      .executeTakeFirst()
  );
}

export function findUserByEmail(email: string) {
  const query = db.selectFrom("User");
  return query.where("email", "=", email).selectAll().executeTakeFirstOrThrow();
}
export function updateUserById(id: string, updateWith: Partial<User>) {
  return db.updateTable("User").set(updateWith).where("id", "=", id).execute();
}
export function updateUserByEmail(email: string, updateWith: UserUpdate) {
  return db
    .updateTable("User")
    .set(updateWith)
    .where("email", "=", email)
    .execute();
}
export function createUser(user: NewUser) {
  return db
    .insertInto("User")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
}
