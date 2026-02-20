/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Movies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movies_link_key" ON "Movies"("link");
