/*
  Warnings:

  - A unique constraint covering the columns `[user_link]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD CONSTRAINT "Link_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_link_key" ON "User"("user_link");
