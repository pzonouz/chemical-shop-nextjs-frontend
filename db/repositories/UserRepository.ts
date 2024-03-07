import { UUID } from "crypto";
import { query } from "../db";
import { User } from "../types";

export function findUserById(id: string) {
  const text = "SELECT * FROM User WHERE id =$1";
  return query(text, [id]);
}

export function findUserByEmail(email: string) {
  const text = "SELECT * FROM users WHERE email =$1";
  return query<User>(text, [email]);
}
// export function updateUserById(id: string, updateWith: Partial<User>) {
//   return db.updateTable("User").set(updateWith).where("id", "=", id).execute();
// }
// export function updateUserByEmail(email: string, updateWith: UserUpdate) {
//   return db
//     .updateTable("User")
//     .set(updateWith)
//     .where("email", "=", email)
//     .execute();
// }
// export function createUser(user: NewUser) {
//   return db
//     .insertInto("User")
//     .values(user)
//     .returningAll()
//     .executeTakeFirstOrThrow();
// }
