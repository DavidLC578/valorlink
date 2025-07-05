/*
  Warnings:

  - You are about to drop the column `rankId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `regionId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the `Rank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alias` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_rankId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_regionId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_roleId_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "rankId",
DROP COLUMN "regionId",
DROP COLUMN "roleId",
ADD COLUMN     "alias" TEXT NOT NULL,
ADD COLUMN     "rank" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "roles" TEXT[];

-- DropTable
DROP TABLE "Rank";

-- DropTable
DROP TABLE "Region";

-- DropTable
DROP TABLE "Role";
