-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ENGINEER', 'COACH', 'MANAGER');

-- Migrate existing data: map current string values to enum, default everything else to ENGINEER
ALTER TABLE "User" ADD COLUMN "role_new" "Role" NOT NULL DEFAULT 'ENGINEER';

UPDATE "User" SET "role_new" = 'COACH' WHERE lower("role") IN ('coach', 'coach / trainer');
UPDATE "User" SET "role_new" = 'MANAGER' WHERE lower("role") IN ('manager');

ALTER TABLE "User" DROP COLUMN "role";
ALTER TABLE "User" RENAME COLUMN "role_new" TO "role";
