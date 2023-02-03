/*
  Warnings:

  - Added the required column `date` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `DeletedTasks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "limitDay" INTEGER NOT NULL,
    "limitMonth" INTEGER NOT NULL,
    "limitYear" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Tasks" ("createdAt", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt") SELECT "createdAt", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
CREATE INDEX "Tasks_id_idx" ON "Tasks"("id");
CREATE TABLE "new_DeletedTasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "limitDay" INTEGER NOT NULL,
    "limitMonth" INTEGER NOT NULL,
    "limitYear" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DeletedTasks" ("createdAt", "deletedAt", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title") SELECT "createdAt", "deletedAt", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title" FROM "DeletedTasks";
DROP TABLE "DeletedTasks";
ALTER TABLE "new_DeletedTasks" RENAME TO "DeletedTasks";
CREATE INDEX "DeletedTasks_id_idx" ON "DeletedTasks"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
