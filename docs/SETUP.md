First let's initialize the project properly.

---

# 1. Create the Next.js Project

```bash
npx create-next-app@latest x-cafe
```

Choose:

```text
✔ TypeScript? → Yes
✔ ESLint? → Yes
✔ Tailwind CSS? → Yes
✔ src directory? → Yes
✔ App Router? → Yes
✔ Turbopack? → Yes
✔ Import alias? → Yes
✔ Alias → @/*
```

Go inside:

```bash
cd x-cafe
```

---

# 2. Initialize Git

```bash
git init
```

Add files:

```bash
git add .
```

First commit:

```bash
git commit -m "initialize X Cafe project"
```

---

# 3. Create Project Structure

```bash
mkdir docs
mkdir src/features
mkdir src/components
mkdir src/hooks
mkdir src/lib
mkdir src/types
mkdir src/utils
```

Create documentation files:

```bash
touch docs/PRD.md
touch docs/ARCHITECTURE.md
touch docs/DESIGN.md
touch docs/RULES.md
touch docs/FEATURES.md
touch docs/SCHEMA.md
```

---

# 4. Install Main Dependencies

## Prisma

```bash
npm install prisma @prisma/client
```

Initialize:

```bash
npx prisma init
```

---

## Authentication

```bash
npm install better-auth
```

---

## Validation

```bash
npm install zod
```

---

## State Management

```bash
npm install zustand
```

---

## Icons

```bash
npm install lucide-react
```

---

## Realtime

For MVP:

```bash
npm install socket.io socket.io-client
```

---

# 5. Setup shadcn/ui

```bash
npx shadcn@latest init
```

Add components later:

```bash
npx shadcn@latest add button card input dialog toast table
```

---

# 6. Create Environment File

```bash
touch .env
```

Example:

```env
DATABASE_URL="your_database_url"

AUTH_SECRET="your_secret"
```

---

# 7. Create GitHub Repository

Go to GitHub and create:

```
x-cafe
```

Then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/x-cafe.git
```

Push:

```bash
git branch -M main

git push -u origin main
```

---

# 8. Branch Strategy

Don't both code directly on main.

Create:

```bash
git checkout -b development
```

Then:

```bash
git push -u origin development
```

Each person creates their own branch:

Example:

Your branch:

```bash
git checkout -b yeab-development
```

Classmate:

```bash
git checkout -b teammate-development
```

---
