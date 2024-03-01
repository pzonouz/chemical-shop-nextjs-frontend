/*
  Warnings:

  - You are about to drop the column `admin` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "mobile" TEXT,
    "email" TEXT,
    "hashedPassword" TEXT,
    "emailVerified" DATETIME,
    "emailVerificationToken" TEXT,
    "forgetPasswordToken" TEXT,
    "image" TEXT,
    "address" TEXT,
    "favoriteId" TEXT,
    "role" TEXT DEFAULT 'user'
);
INSERT INTO "new_User" ("address", "createdAt", "email", "emailVerificationToken", "emailVerified", "favoriteId", "firstName", "forgetPasswordToken", "hashedPassword", "id", "image", "lastName", "mobile", "name", "updatedAt") SELECT "address", "createdAt", "email", "emailVerificationToken", "emailVerified", "favoriteId", "firstName", "forgetPasswordToken", "hashedPassword", "id", "image", "lastName", "mobile", "name", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
