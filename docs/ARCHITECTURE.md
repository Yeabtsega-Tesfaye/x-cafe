# X Cafe - System Architecture

Version: 1.0
Last Updated: July 22, 2026

---

# Overview

X Cafe is a web-based QR ordering system for cafés. Customers scan a QR code placed on their table, browse the digital menu, place orders, and receive order status updates. Orders are sent directly to the kitchen in real time, while café staff manage everything from an admin dashboard.

The system is designed to be simple, fast, and scalable enough for small and medium-sized cafés.

---

# Architecture Goals

- Keep the system simple
- Fast order processing
- Real-time kitchen updates
- Mobile-first customer experience
- Easy to maintain
- Easy to extend with new features

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js Route Handlers |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Better Auth |
| Realtime | Socket.IO |
| Deployment | Vercel |

---

# High Level Architecture

```
                Customer
                   │
             Scan QR Code
                   │
                   ▼
            Next.js Web App
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
   Customer Pages      Admin Dashboard
                              │
                              ▼
                     Kitchen Dashboard
                              │
                              ▼
                       Route Handlers
                              │
                              ▼
                         PostgreSQL
```

---

# Project Structure

```
src/
│
├── app/
├── components/
├── features/
│   ├── auth/
│   ├── menu/
│   ├── orders/
│   ├── kitchen/
│   ├── dashboard/
│   └── tables/
│
├── lib/
├── hooks/
├── types/
├── utils/
└── prisma/
```

---

# Core Modules

## Authentication

Handles login and user sessions.

Roles:

- Admin
- Kitchen Staff

Customers do not need an account.

---

## Menu

Responsible for:

- Categories
- Food Items
- Prices
- Availability

---

## Tables

Each table has:

- Table Number
- Unique QR Code

Scanning the QR opens the menu for that table.

---

## Orders

Handles:

- Create Order
- Update Status
- Cancel Order
- Order History

---

## Kitchen Dashboard

Displays incoming orders.

Kitchen staff can change order status:

- New
- Preparing
- Ready
- Completed

---

## Admin Dashboard

Allows café owners to:

- Manage Menu
- Manage Tables
- View Orders
- View Sales
- Manage Staff

---

# Request Flow

Customer scans QR

↓

Menu loads

↓

Customer adds items

↓

Customer places order

↓

Order is saved to database

↓

Kitchen Dashboard receives order

↓

Kitchen updates status

↓

Customer sees updated status

---

# Authentication

Only staff members can log in.

Customers access the menu without authentication using the QR code.

Protected Pages:

- Dashboard
- Kitchen
- Menu Management
- Settings

---

# Real-Time Communication

Socket.IO is used to send live updates.

Events include:

- New Order
- Order Accepted
- Preparing
- Ready
- Completed

This removes the need to refresh the page.

---

# Deployment

Frontend:
Vercel

Backend:
Next.js Route Handlers

Database:
PostgreSQL

Images:
Vercel Blob (or Cloudinary if needed)

---

# Future Improvements

- Online Payments
- Inventory Management
- Multi-Branch Support
- Customer Accounts
- Loyalty Program
- Analytics Dashboard
- AI Sales Forecasting

---

# Architecture Principles

- Keep components reusable.
- Write clean TypeScript.
- Mobile-first design.
- Server-side validation.
- Never trust client input.
- Keep business logic separate from UI.
- Build features as independent modules.
- Prefer simplicity over unnecessary complexity.

---

# Summary

X Cafe follows a modern full-stack architecture using Next.js, PostgreSQL, Prisma, and Socket.IO. The architecture is intentionally lightweight for the MVP while remaining flexible enough to support future growth.