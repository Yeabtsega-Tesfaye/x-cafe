
# Team Task Split

I would divide it like this:

# 👨‍💻 Person 1 (You) — Customer Experience + Ordering System

Your responsibility:

## 1. Project Setup

* Next.js setup
* Tailwind setup
* Folder structure
* Global styles
* Documentation

---

## 2. Customer Side

Build:

### QR Landing

```
/menu/[cafeId]/[tableId]
```

Features:

* Read QR URL
* Load café menu
* Detect table number

---

### Digital Menu

Components:

```
FoodCard
CategoryTabs
MenuGrid
SearchBar
```

Features:

* View categories
* View items
* Food images
* Prices
* Availability

---

### Cart System

Features:

* Add items
* Remove items
* Quantity control
* Total calculation

---

### Order Placement

Features:

* Submit order
* Add notes
* Confirmation page

---

## Files You Own

```
features/menu/

features/cart/

features/orders/

app/menu/

components/customer/
```

---

# 👨‍💻 Person 2 — Admin + Kitchen Management

Classmate responsibility:

## 1. Authentication

Build:

* Login
* Logout
* Protected routes
* Role checking

---

## 2. Admin Dashboard

Route:

```
/dashboard
```

Features:

* Overview cards
* Menu management
* Table management

---

## 3. Kitchen Dashboard

Route:

```
/kitchen
```

Features:

* View incoming orders
* Change status
* Order queue

---

## 4. QR Management

Features:

* Create tables
* Generate QR codes
* Download QR

---

## Files They Own

```
features/auth/

features/dashboard/

features/kitchen/

features/tables/

components/admin/
```

---

# Shared Work (Both)

You both review:

## Database

```
prisma/schema.prisma
```

Together.

---

## API Contracts

Before coding:

Agree on:

```
POST /orders

GET /menu

PATCH /orders/:id
```

---

## UI Components

Shared:

```
components/ui/
```

---

# Development Order

Follow this sequence:

## Week 1

Both:

* Setup project
* Complete docs
* Setup database

---

## Week 2

You:

* Customer menu
* Cart

Classmate:

* Authentication
* Dashboard layout

---

## Week 3

You:

* Order creation

Classmate:

* Kitchen dashboard

---

## Week 4

Both:

* Connect everything
* Testing
* Deployment

---

This split is balanced because both people are building **real features**, not one person doing "everything important" while the other only styles pages.

For your portfolio too, this gives you a strong story:

> "Built a full-stack SaaS QR ordering platform with real-time kitchen management using Next.js, TypeScript, Prisma, PostgreSQL, and Socket.IO."

That's a much stronger project than a normal CRUD app.
