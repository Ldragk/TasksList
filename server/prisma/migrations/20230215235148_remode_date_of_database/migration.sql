/*
  Warnings:

  - You are about to drop the column `date` on the `DeletedTask` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeletedTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "limitDay" INTEGER NOT NULL,
    "limitMonth" INTEGER NOT NULL,
    "limitYear" INTEGER NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DeletedTask" ("createdAt", "deletedAt", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title") SELECT "createdAt", "deletedAt", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title" FROM "DeletedTask";
DROP TABLE "DeletedTask";
ALTER TABLE "new_DeletedTask" RENAME TO "DeletedTask";
CREATE INDEX "DeletedTask_id_idx" ON "DeletedTask"("id");
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "limitDay" INTEGER NOT NULL,
    "limitMonth" INTEGER NOT NULL,
    "limitYear" INTEGER NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Task" ("createdAt", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt") SELECT "createdAt", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE INDEX "Task_id_idx" ON "Task"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
