-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'TELEBIRR', 'CBE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'VERIFICATION_REQUIRED', 'PAID', 'REJECTED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN "note" TEXT,
ADD COLUMN "paymentMethod" "PaymentMethod" DEFAULT 'CASH',
ADD COLUMN "paymentStatus" "PaymentStatus" DEFAULT 'PENDING' NOT NULL,
ADD COLUMN "receiptUrl" TEXT;
