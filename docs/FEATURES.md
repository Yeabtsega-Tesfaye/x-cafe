# X Cafe - Features Document

Version: 1.0

Last Updated: July 22, 2026

---

## Purpose

This document defines all planned features of X Cafe.

Features are divided into:

- MVP Features (Version 1)
- Future Features

The MVP focuses on creating a complete ordering workflow between customers, kitchen staff, and café owners.

---

## Product Users

X Cafe has three main users:

## Customer

The person ordering food.

## Kitchen Staff

The person preparing orders.

## Café Owner/Admin

The person managing the café.

---

# MVP Features (Version 1)

---

# 1. QR Code Table System

## Description

Each table in a café has a unique QR code.

Customers scan the QR code to access the digital menu.

## Features

- Generate QR code for each table
- Link QR code to specific café/table
- Customer opens menu without login
- Track table number with order

## Priority

Critical

---

# 2. Digital Menu

## Description

Customers can browse available food and drinks digitally.

## Features

- View categories
- View food items
- Food images
- Food descriptions
- Prices
- Availability status
- Search menu items

## Admin Controls

Admin can:

- Add items
- Edit items
- Delete items
- Change prices
- Mark unavailable items

## Priority

Critical

---

# 3. Customer Ordering

## Description

Customers can create and submit orders directly from their phone.

## Features

- Add items to cart
- Change quantity
- Remove items
- Add notes

Example:

"Less sugar"

"Extra cheese"

- View order summary
- Submit order

## Priority

Critical

---

# 4. Order Management

## Description

Handles the complete lifecycle of customer orders.

## Order Status

```
New

↓

Accepted

↓

Preparing

↓

Ready

↓

Completed
```

## Features

- Create orders
- Update status
- View order history
- Track current order

## Priority

Critical

---

# 5. Kitchen Dashboard

## Description

A dedicated interface for kitchen staff.

## Features

- View new orders
- See order details
- See table number
- Change order status
- Manage order queue

## Design Requirements

- Large text
- High contrast
- Simple controls
- Easy to use during busy hours

## Priority

Critical

---

# 6. Admin Dashboard

## Description

A management panel for café owners.

## Features

Dashboard overview:

- Today's orders
- Total sales
- Popular items

Management:

- Menu management
- Table management
- Staff management

## Priority

High

---

# 7. Authentication

## Description

Controls access for café staff.

## Users

Admin

Kitchen Staff

## Features

- Login
- Logout
- Role permissions

Customers do not require accounts.

## Priority

High

---

# 8. Table Management

## Description

Allows cafés to manage physical tables.

## Features

- Create tables
- Delete tables
- Generate QR codes
- Assign table numbers

## Priority

High

---

# 9. Basic Analytics

## Description

Provides simple business insights.

## Features

- Total orders
- Total revenue
- Best-selling items

## Priority

Medium

---

# MVP User Flow

```
Customer

Scan QR

↓

Open Menu

↓

Select Food

↓

Place Order

↓

Kitchen Receives Order

↓

Kitchen Prepares Food

↓

Order Completed
```

---

# Future Features

These features are intentionally excluded from MVP.

---

# 1. Online Payments

Support:

- Telebirr
- Chapa
- CBE Birr
- Bank payments

---

# 2. Inventory Management

Features:

- Ingredient tracking
- Stock alerts
- Supplier management

---

# 3. Customer Accounts

Features:

- Order history
- Favorite meals
- Personal recommendations

---

# 4. Loyalty Program

Features:

- Points
- Rewards
- Discounts
- Membership levels

---

# 5. Reservations

Features:

- Table booking
- Schedule management
- Customer reminders

---

# 6. Multi-Branch Support

For restaurant chains.

Features:

- Multiple locations
- Branch analytics
- Central management

---

# 7. Advanced Analytics

Features:

- Sales prediction
- Customer behavior
- Peak hours analysis
- Revenue reports

---

# 8. AI Features

Possible future features:

- AI menu recommendations
- Demand prediction
- Automatic inventory suggestions
- AI business assistant

---

# Feature Priority Matrix

| Feature | Priority | Version |
|---|---|---|
| QR System | Critical | MVP |
| Digital Menu | Critical | MVP |
| Ordering | Critical | MVP |
| Kitchen Dashboard | Critical | MVP |
| Order Management | Critical | MVP |
| Authentication | High | MVP |
| Admin Dashboard | High | MVP |
| Analytics | Medium | MVP |
| Payments | Medium | Future |
| Inventory | Low | Future |
| Loyalty | Low | Future |
| AI Features | Low | Future |

---

# MVP Definition

X Cafe MVP is complete when:

A customer can:

1. Scan a QR code.
2. View a menu.
3. Add items.
4. Place an order.
5. Receive order updates.

A kitchen employee can:

1. Receive orders.
2. Update order status.

A café owner can:

1. Manage menu.
2. Manage tables.
3. View basic information.

Anything beyond this belongs to future versions.