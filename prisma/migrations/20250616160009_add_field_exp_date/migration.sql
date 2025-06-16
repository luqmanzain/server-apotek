/*
  Warnings:

  - Added the required column `expDate` to the `Produk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produk" ADD COLUMN     "expDate" TIMESTAMP(3) NOT NULL;
