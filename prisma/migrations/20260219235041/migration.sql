/*
  Warnings:

  - A unique constraint covering the columns `[userId,link,order]` on the table `Movies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Movies_userId_link_key";

-- CreateIndex
CREATE UNIQUE INDEX "Movies_userId_link_order_key" ON "Movies"("userId", "link", "order");
