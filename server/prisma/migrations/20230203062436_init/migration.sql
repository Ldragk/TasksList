-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "limitDay" INTEGER NOT NULL,
    "limitMonth" INTEGER NOT NULL,
    "limitYear" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Tasks_updatedAt_fkey" FOREIGN KEY ("updatedAt") REFERENCES "Updated" ("taskUpdatedAt") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeletedTasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "limitDay" INTEGER NOT NULL,
    "limitMonth" INTEGER NOT NULL,
    "limitYear" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DeletedTasks_updatedAt_fkey" FOREIGN KEY ("updatedAt") REFERENCES "Updated" ("trashUpdatedAt") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Updated" (
    "taskUpdatedAt" DATETIME NOT NULL,
    "trashUpdatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Tasks_id_idx" ON "Tasks"("id");

-- CreateIndex
CREATE INDEX "DeletedTasks_id_idx" ON "DeletedTasks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Updated_taskUpdatedAt_key" ON "Updated"("taskUpdatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Updated_trashUpdatedAt_key" ON "Updated"("trashUpdatedAt");
