/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,link]` on the table `Movies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,order]` on the table `Movies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- DropIndex
DROP INDEX "Movies_link_key";

-- DropIndex
DROP INDEX "Movies_userId_link_order_key";

-- DropTable
DROP TABLE "Link";

-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "icon" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_userId_order_key" ON "Links"("userId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Movies_userId_link_key" ON "Movies"("userId", "link");

-- CreateIndex
CREATE UNIQUE INDEX "Movies_userId_order_key" ON "Movies"("userId", "order");

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
