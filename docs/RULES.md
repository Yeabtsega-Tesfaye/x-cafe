# X Cafe - Development Rules

Version: 1.0

Last Updated: July 22, 2026

---

# Purpose

This document defines the coding standards, development practices, and rules that must be followed while building X Cafe.

The goal is to keep the codebase:

- Clean
- Consistent
- Maintainable
- Easy to understand
- Easy to extend

---

# General Rules

## Rule 1: Keep It Simple

Do not introduce complexity without a clear reason.

Prefer:

Simple solution that works

over:

Complex solution that might be useful later.

---

## Rule 2: Build For The Current Version

Do not build future features before they are needed.

Avoid premature optimization.

Examples:

Do not build:

- Multi-branch support
- Advanced analytics
- AI features

until the core ordering system works.

---

## Rule 3: Every Feature Must Have A Purpose

Before creating a feature ask:

"Does this improve customer ordering or café operations?"

If no, postpone it.

---

# Code Rules

## TypeScript

TypeScript is required everywhere.

Never use:

```ts
any
```

unless there is a documented reason.

Prefer:

```ts
unknown
```

with proper validation.

---

## Components

Components must:

- Have one responsibility
- Be reusable
- Avoid unnecessary logic

Bad:

```
FoodCard handles:
- UI
- API calls
- Authentication
- Payment
```

Good:

```
FoodCard
    |
    UI only

useFood()
    |
    Data logic
```

---

# Naming Rules

## Components

Use PascalCase.

Example:

```
FoodCard.tsx
OrderTable.tsx
KitchenBoard.tsx
```

---

## Functions

Use camelCase.

Example:

```ts
createOrder()
updateMenu()
calculateTotal()
```

---

## Constants

Use uppercase.

Example:

```ts
MAX_ORDER_ITEMS
DEFAULT_TIMEOUT
```

---

## Files

Use descriptive names.

Good:

```
order-service.ts
menu-schema.ts
```

Bad:

```
helper.ts
stuff.ts
test2.ts
```

---

# Folder Rules

Organize by feature.

Preferred:

```
features/

orders/
    components/
    services/
    hooks/
    schemas/
```

Avoid:

```
components/
everything.tsx
```

---

# React Rules

## Components

Use functional components only.

No class components.

---

## State

Use:

Local state:

```tsx
useState()
```

For component-specific data.

Global state:

Zustand

Only when multiple components need the data.

---

## Server vs Client Components

Default:

Server Component

Use Client Components only when needed:

- User interaction
- Browser APIs
- Real-time updates
- State management

---

# Database Rules

## Prisma Only

All database access goes through Prisma.

Never write raw SQL unless necessary.

---

## Validation

Never trust user input.

Every input must be validated.

Use:

- Zod schemas
- Server-side validation

---

# API Rules

API responses must follow a consistent format.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# Authentication Rules

Protected routes must verify authentication.

Never trust frontend permissions.

Example:

Bad:

```
Frontend hides admin button
```

Good:

```
Backend checks user role
```

---

# UI Rules

Follow DESIGN.md.

Do not create random styles.

---

## Components Before Duplication

If the same UI appears twice:

Create a component.

Example:

Instead of:

```
OrderCard
OrderCard2
OrderCardNew
```

Create:

```
OrderCard
```

with props.

---

# Error Handling

Never leave silent errors.

Bad:

```ts
catch(error){

}
```

Good:

```ts
catch(error){
 logError(error)
 return response
}
```

---

# Loading States

Every async operation needs:

- Loading state
- Success state
- Error state

Never show blank screens.

---

# Git Rules

Commit messages must describe the change.

Good:

```
add kitchen order status update
```

Bad:

```
changes
fix
update
```

---

# Before Creating A Pull Request

Check:

- Code works
- No TypeScript errors
- No console errors
- Mobile layout tested
- Components reused
- Rules followed

---

# Security Rules

Never commit:

- Passwords
- API keys
- Environment variables

Use:

```
.env
```

---

# Performance Rules

Avoid:

- Unnecessary API calls
- Huge components
- Large images
- Duplicate requests

Optimize only after measuring.

---

# AI Development Rules

When using AI tools:

AI-generated code must be reviewed.

Never blindly accept generated code.

Every generated feature must follow:

- Architecture.md
- Design.md
- Rules.md

---

# Final Rule

The product is more important than the code.

Write code that is:

- Easy to change
- Easy to understand
- Reliable for real café owners

Clean code today prevents problems tomorrow.