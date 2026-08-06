import { UserRole } from "@/data/menu";

import "better-auth";

declare module "better-auth" {
  interface User {
    role?: UserRole;
  }
}