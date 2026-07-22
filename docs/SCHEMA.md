# X Cafe - Database Schema

Version: 1.0

Last Updated: July 22, 2026

---

# Purpose

This document defines the database structure of X Cafe.

It describes:

- Main entities
- Relationships
- Required fields
- Data ownership
- Business rules

The schema is designed for the MVP version.

---

# Database Overview

X Cafe uses a relational database because the system contains highly connected data:

- Cafés
- Users
- Tables
- Menu Items
- Orders
- Order Items

PostgreSQL is used because it provides strong relationships, consistency, and reliability.

---

# Entity Relationship Overview

```
Cafe

 |
 |---- Users

 |
 |---- Tables
          |
          |---- QR Code

 |
 |---- Categories
          |
          |---- Menu Items

 |
 |---- Orders
          |
          |---- Order Items
```

---

# 1. Cafe

## Purpose

Represents a café using X Cafe.

Every other entity belongs to a café.

## Schema

```
Cafe
----
id
name
logo
phone
address
createdAt
updatedAt
```

## Relationships

One Cafe has:

- Many Users
- Many Tables
- Many Categories
- Many Menu Items
- Many Orders

---

# 2. User

## Purpose

Represents café staff members.

Customers do not need accounts.

## Schema

```
User
----
id
cafeId
name
email
passwordHash
role
createdAt
updatedAt
```

## Roles

```
ADMIN

KITCHEN
```

## Relationships

User belongs to:

- One Cafe

---

# 3. Table

## Purpose

Represents physical tables inside the café.

## Schema

```
Table
-----
id
cafeId
tableNumber
qrCode
createdAt
updatedAt
```

## Example

```
Table 1

QR:
x-cafe.com/menu/cafe123/table1
```

## Rules

- Table numbers must be unique inside a café.
- Every table has one QR code.

---

# 4. Category

## Purpose

Groups menu items.

Examples:

```
Coffee

Breakfast

Desserts

Drinks
```

## Schema

```
Category
--------
id
cafeId
name
createdAt
updatedAt
```

## Relationships

One category has:

- Many menu items

---

# 5. Menu Item

## Purpose

Represents food and drinks available for ordering.

## Schema

```
MenuItem
---------
id
cafeId
categoryId
name
description
imageUrl
price
available
createdAt
updatedAt
```

## Rules

- Price is stored as number.
- Unavailable items remain in database but cannot be ordered.
- Every item belongs to a category.

---

# 6. Order

## Purpose

Represents a customer's order.

## Schema

```
Order
-----
id
cafeId
tableId
status
totalAmount
notes
createdAt
updatedAt
```

## Order Status

```
NEW

PREPARING

READY

COMPLETED

CANCELLED
```

## Relationships

One order belongs to:

- One Cafe
- One Table

One order has:

- Many Order Items

---

# 7. Order Item

## Purpose

Represents individual products inside an order.

Example:

Order:

```
2 Cappuccino
1 Burger
```

Order Items:

```
Cappuccino x2

Burger x1
```

## Schema

```
OrderItem
----------
id
orderId
menuItemId
quantity
price
createdAt
```

## Rules

The price is copied when the order is created.

Reason:

If the café changes the menu price later, old orders should keep the original price.

---

# Relationships Summary

```
Cafe

1 ──────── *

User


Cafe

1 ──────── *

Table


Cafe

1 ──────── *

Category


Category

1 ──────── *

MenuItem


Cafe

1 ──────── *

Order


Table

1 ──────── *

Order


Order

1 ──────── *

OrderItem


MenuItem

1 ──────── *

OrderItem
```

---

# Prisma Model Preview

Example:

```prisma
model Cafe {
  id        String   @id @default(cuid())
  name      String
  users     User[]
  tables    Table[]
  orders    Order[]
  createdAt DateTime @default(now())
}
```

---

# Database Rules

## Data Ownership

Every café owns its:

- Users
- Tables
- Menu
- Orders

---

## Data Isolation

A café user can only access data belonging to their café.

Example:

Cafe A cannot see Cafe B orders.

---

## Deletion Rules

Do not permanently delete important records.

Prefer:

- Soft delete
- Status changes

Example:

Menu item:

```
available = false
```

instead of deleting.

---

# MVP Schema Limitations

The following are intentionally excluded:

- Payments
- Inventory
- Customer accounts
- Reviews
- Loyalty points
- Reservations
- Multi-branch support

These will require additional tables in future versions.

---

# Final Schema

MVP requires only:

1. Cafe
2. User
3. Table
4. Category
5. MenuItem
6. Order
7. OrderItem

This schema is enough to support the complete X Cafe ordering workflow.