-- CreateTable
CREATE TABLE "Songs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Songs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Songs_userId_link_key" ON "Songs"("userId", "link");

-- CreateIndex
CREATE UNIQUE INDEX "Songs_userId_order_key" ON "Songs"("userId", "order");

-- AddForeignKey
ALTER TABLE "Songs" ADD CONSTRAINT "Songs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
