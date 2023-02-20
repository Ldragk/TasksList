/*
  Warnings:

  - You are about to drop the column `limitDay` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `limitMonth` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `limitYear` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `limitDay` on the `DeletedTask` table. All the data in the column will be lost.
  - You are about to drop the column `limitMonth` on the `DeletedTask` table. All the data in the column will be lost.
  - You are about to drop the column `limitYear` on the `DeletedTask` table. All the data in the column will be lost.
  - Added the required column `date` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `DeletedTask` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Task" ("content", "createdAt", "done", "id", "title", "updatedAt") SELECT "content", "createdAt", "done", "id", "title", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE INDEX "Task_id_idx" ON "Task"("id");
CREATE TABLE "new_DeletedTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DeletedTask" ("content", "createdAt", "deletedAt", "done", "id", "title") SELECT "content", "createdAt", "deletedAt", "done", "id", "title" FROM "DeletedTask";
DROP TABLE "DeletedTask";
ALTER TABLE "new_DeletedTask" RENAME TO "DeletedTask";
CREATE INDEX "DeletedTask_id_idx" ON "DeletedTask"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
