/*
  Warnings:

  - You are about to drop the column `image_url` on the `Laboratory` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Service` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Laboratory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Laboratory" DROP COLUMN "image_url",
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "image_url",
ADD COLUMN     "imageUrl" TEXT NOT NULL;
