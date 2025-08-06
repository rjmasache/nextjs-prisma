/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Template` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Template` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."TemplateStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "public"."Template" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "public"."TemplateStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT 'Ficha instruccional sin título';

-- CreateIndex
CREATE UNIQUE INDEX "Template_slug_key" ON "public"."Template"("slug");
