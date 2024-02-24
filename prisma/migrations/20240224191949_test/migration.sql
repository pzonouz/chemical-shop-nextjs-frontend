/*
  Warnings:

  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "firstName" TEXT,
    "LastName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "mobile" TEXT,
    "email" TEXT,
    "hashedPassword" TEXT,
    "emailVerified" DATETIME,
    "emailVerificationToken" TEXT,
    "forgetPasswordToken" TEXT,
    "image" TEXT,
    "favoriteId" TEXT
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerificationToken", "emailVerified", "favoriteId", "firstName", "forgetPasswordToken", "hashedPassword", "id", "image", "mobile", "name", "updatedAt") SELECT "createdAt", "email", "emailVerificationToken", "emailVerified", "favoriteId", "firstName", "forgetPasswordToken", "hashedPassword", "id", "image", "mobile", "name", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
