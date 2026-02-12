/*
  Warnings:

  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,order]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- AlterTable
ALTER TABLE "Link" DROP CONSTRAINT "Link_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
DROP COLUMN "url";

-- CreateIndex
CREATE UNIQUE INDEX "Link_userId_order_key" ON "Link"("userId", "order");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
