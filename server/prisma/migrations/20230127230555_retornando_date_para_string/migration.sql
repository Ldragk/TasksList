-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_deletedTasks" (
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
INSERT INTO "new_deletedTasks" ("createdAt", "date", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt") SELECT "createdAt", "date", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt" FROM "deletedTasks";
DROP TABLE "deletedTasks";
ALTER TABLE "new_deletedTasks" RENAME TO "deletedTasks";
CREATE TABLE "new_tasks" (
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
INSERT INTO "new_tasks" ("createdAt", "date", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt") SELECT "createdAt", "date", "description", "done", "id", "limitDay", "limitMonth", "limitYear", "title", "updatedAt" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
