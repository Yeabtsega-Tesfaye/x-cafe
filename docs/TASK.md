# X Cafe - Development Plan

**Version:** 1.0.0

**Status:** Planning

**Last Updated:** July 22, 2026

---

# Purpose

This document defines how the development work will be divided between two developers and provides the timeline for completing the MVP within one week.

The objective is to finish a fully functional version of X Cafe that includes the complete customer ordering experience, kitchen workflow, and administration dashboard.

---

# Team Members

## Person 1

Primary Responsibility:

Customer Experience & Ordering System

---

## Person 2

Primary Responsibility:

Administration & Dashboard Management

---

# Person 1 Responsibilities

## Project Foundation

Responsible for:

- Initial Next.js project setup
- Tailwind CSS configuration
- Folder structure
- Global styling
- Documentation
- Customer UI architecture

---

## Customer Menu

Build:

- QR Menu page
- Food listing
- Category navigation
- Search functionality
- Food details
- Responsive customer interface

---

## Shopping Cart

Build:

- Add items
- Remove items
- Increase quantity
- Decrease quantity
- Order summary
- Price calculation

---

## Customer Ordering

Build:

- Checkout page
- Order confirmation
- Customer notes
- Submit order
- Order status page

---

## Components

Responsible for:

- FoodCard
- CategoryTabs
- MenuGrid
- SearchBar
- CartDrawer
- CartItem
- QuantitySelector
- OrderSummary
- StatusBadge

---

## Routes

Responsible for:

```
/menu/[cafeId]/[tableId]
```

```
/cart
```

```
/order
```

---

## Folder Ownership

```
app/menu/

features/menu/

features/cart/

features/orders/

components/customer/
```

---

# Person 2 Responsibilities

## Authentication

Build:

- Login
- Logout
- Session Management
- Route Protection
- Role Authorization

---

## Admin Dashboard

Build:

- Dashboard Overview
- Statistics Cards
- Menu Management
- Category Management
- Table Management
- Settings

---

## Kitchen Dashboard

Build:

- Incoming Orders
- Order Queue
- Order Details
- Update Order Status
- Completed Orders

---

## QR Code Management

Build:

- Generate QR Codes
- Download QR Codes
- Assign QR Codes
- Manage Tables

---

## Components

Responsible for:

- Sidebar
- Topbar
- DashboardCard
- KitchenOrderCard
- OrderQueue
- QRCodeCard
- TableCard

---

## Routes

Responsible for:

```
/login
```

```
/dashboard
```

```
/kitchen
```

```
/tables
```

---

## Folder Ownership

```
features/auth/

features/dashboard/

features/kitchen/

features/tables/

components/admin/
```

---

# Shared Responsibilities

Both developers are responsible for reviewing and maintaining the following parts of the project.

---

## Database

```
prisma/schema.prisma
```

Responsibilities:

- Design schema
- Review relationships
- Create migrations
- Verify data integrity

---

## API Design

Agree on every endpoint before implementation.

Examples:

```
GET    /api/menu

POST   /api/orders

PATCH  /api/orders/:id

GET    /api/dashboard

POST   /api/login
```

---

## Shared UI Components

```
components/ui/
```

Examples:

- Button
- Input
- Card
- Badge
- Dialog
- Toast
- Skeleton
- Table
- Dropdown

---

## Code Reviews

Every completed feature should be reviewed by the other developer before merging into the development branch.

---

# Git Workflow

## Main Branch

Production-ready code only.

```
main
```

---

## Development Branch

Shared integration branch.

```
development
```

---

## Personal Branches

Person 1

```
feature/customer-ordering
```

Person 2

```
feature/admin-dashboard
```

Workflow

```
Feature Branch

↓

Development Branch

↓

Testing

↓

Main Branch
```

---

# Development Timeline

The goal is to complete the MVP within **7 days**.

---

# Day 1

## Both

- Create GitHub repository
- Clone project
- Install dependencies
- Configure Prisma
- Configure PostgreSQL
- Configure Better Auth
- Configure shadcn/ui
- Configure Socket.IO
- Create project structure
- Complete project documentation
- Define API contracts

### Deliverable

Project setup completed and running locally.

---

# Day 2

## Person 1

- Build QR Menu page
- Food cards
- Categories
- Search
- Customer layout

## Person 2

- Authentication
- Login page
- Dashboard layout
- Sidebar
- Top navigation

### Deliverable

Customer can browse menu.

Admin can access dashboard.

---

# Day 3

## Person 1

- Shopping cart
- Quantity controls
- Order summary
- Checkout page

## Person 2

- Menu management
- Category management
- Table management
- QR generation

### Deliverable

Customer can prepare an order.

Admin can manage café information.

---

# Day 4

## Person 1

- Submit order
- Order confirmation
- Customer status page

## Person 2

- Kitchen dashboard
- Order queue
- Update order status

### Deliverable

Complete order flow between customer and kitchen.

---

# Day 5

## Both

- Connect frontend and backend
- Implement API endpoints
- Connect database
- Implement real-time updates
- Verify complete workflow

### Deliverable

Complete ordering system works end-to-end.

---

# Day 6

## Both

- Responsive design improvements
- Loading states
- Error handling
- Validation
- Bug fixes
- UI polishing

### Deliverable

Stable MVP ready for testing.

---

# Day 7

## Both

- Final testing
- Cross-browser testing
- Performance optimization
- Deployment
- Prepare demo data
- Prepare presentation

### Deliverable

Publicly deployed MVP.

---

# Definition of Done

The project is considered complete when the following functionality works correctly.

## Customer

- Scan QR code
- View digital menu
- Search menu
- Add items to cart
- Modify quantities
- Place order
- Track order status

---

## Kitchen

- Receive new orders
- View order queue
- Update order status
- Complete orders

---

## Administrator

- Login
- Manage menu
- Manage categories
- Manage tables
- Generate QR codes
- View dashboard

---

# Project Deliverables

By the end of the project, the following should be completed.

- Fully responsive web application
- Customer ordering system
- Kitchen dashboard
- Admin dashboard
- Authentication
- Database integration
- Real-time order updates
- QR code ordering
- Online deployment
- Complete documentation

---

# Success Criteria

The MVP is successful when a customer can scan a QR code, browse the menu, place an order, and receive live status updates while café staff manage orders through the kitchen dashboard and administrators manage the café through the admin dashboard without any manual ordering process.