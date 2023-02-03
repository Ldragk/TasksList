/*
  Warnings:

  - You are about to drop the `Updated` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Updated_trashUpdatedAt_key";

-- DropIndex
DROP INDEX "Updated_taskUpdatedAt_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Updated";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_DeletedTasks" ("createdAt", "date", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt") SELECT "createdAt", "date", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt" FROM "DeletedTasks";
DROP TABLE "DeletedTasks";
ALTER TABLE "new_DeletedTasks" RENAME TO "DeletedTasks";
CREATE INDEX "DeletedTasks_id_idx" ON "DeletedTasks"("id");
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
INSERT INTO "new_Tasks" ("createdAt", "date", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt") SELECT "createdAt", "date", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
CREATE INDEX "Tasks_id_idx" ON "Tasks"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
