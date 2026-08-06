// Run once per staff account: npx tsx scripts/create-staff-user.ts
// Edit the email/name/password below before each run, then tell the
// person their password through some channel other than this file.
//
// dotenv/config is required here specifically because this script runs
// via bare tsx, not through Next.js — Next.js loads .env automatically
// for app routes, but a standalone script needs to load it itself.
/*import "dotenv/config";
import { auth } from "../lib/auth";

async function main() {
  const result = await auth.api.signUpEmail({
    body: {
      email: "chef@xcafe.com",
      password: "change-this-before-running",
      name: "Kitchen Staff",
    },
  });
  console.log(result);
}

main(); */

// Run once per staff account: npx tsx scripts/create-cashier-user.ts
// Edit the email/name/password below before each run, then tell the
// person their password through some channel other than this file.
import "dotenv/config";
import { auth } from "../lib/auth";

async function main() {
  const result = await auth.api.signUpEmail({
    body: {
      email: "cashier@xcafe.com",
      password: "don't-change-this-before",
      name: "Front Desk Cashier",
      
      // If you configured Better Auth to accept custom fields, you can pass the role here:
      // role: "cashier", 
    },
  });
  
  console.log("Cashier user created successfully:", result);
  console.log("⚠️ REMINDER: Open Prisma Studio and change this user's role from 'kitchen' to 'cashier'!");
}

main();