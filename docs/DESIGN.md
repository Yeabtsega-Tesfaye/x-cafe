# X Cafe - Design System

Version: 1.0

Last Updated: July 22, 2026

---

# Design Philosophy

X Cafe is designed to feel modern, clean, and fast.

The interface should never feel crowded or confusing.

Customers should be able to place an order within a few taps without needing instructions.

Design Priorities:

- Simplicity
- Speed
- Consistency
- Accessibility
- Mobile First

---

# Theme

Style:

Modern Minimal

Keywords:

- Clean
- Elegant
- Premium
- Soft
- Responsive

---

# Color Palette

Primary

Black
#0F172A

Accent

Orange
#F97316

Background

#FFFFFF

Secondary Background

#F8FAFC

Border

#E2E8F0

Success

#22C55E

Warning

#F59E0B

Danger

#EF4444

Text

Primary
#0F172A

Secondary
#64748B

Muted
#94A3B8

---

# Typography

Font

Geist

Fallback

Inter

Font Sizes

Heading 1

36px

Heading 2

30px

Heading 3

24px

Heading 4

20px

Body

16px

Small Text

14px

Caption

12px

---

# Border Radius

Buttons

12px

Cards

16px

Inputs

12px

Dialogs

20px

---

# Shadows

Cards

Soft shadow only.

Avoid heavy shadows.

---

# Spacing

Use an 8px spacing system.

8px

16px

24px

32px

48px

64px

---

# Buttons

Primary

- Orange background
- White text

Secondary

- White background
- Black border

Danger

- Red background

Disabled

- Gray background

Buttons should always have:

- Rounded corners
- Hover animation
- Loading state

---

# Cards

Cards are used for:

- Menu Items
- Orders
- Statistics

Every card includes:

- Rounded corners
- Soft border
- Light shadow
- 16px padding

---

# Icons

Use Lucide Icons.

Icons should remain simple and consistent.

Avoid mixing icon libraries.

---

# Images

Food images should:

- High quality
- Same aspect ratio
- Rounded corners
- Optimized for web

---

# Animations

Keep animations short.

Duration:

150ms–250ms

Use animations for:

- Button hover
- Modal open
- Drawer
- Toast
- Page transition

Avoid unnecessary animations.

---

# Layout

Customer

Bottom navigation when needed.

Large buttons.

Easy thumb reach.

Admin

Sidebar

Top Navbar

Content Area

Kitchen

Large order cards

High contrast

Minimal distractions

---

# Responsive Breakpoints

Mobile

<768px

Tablet

768px+

Desktop

1024px+

---

# Forms

Every form should include:

- Label
- Placeholder
- Validation
- Error Message

Never rely only on placeholders.

---

# Tables

Dashboard tables should include:

- Search
- Sorting
- Pagination

---

# Empty States

Every page without data should display:

- Icon
- Short message
- Action button

Example:

"No orders yet."

---

# Loading States

Use Skeleton components.

Avoid blank screens.

---

# Error States

Show clear messages.

Example:

"Something went wrong."

Provide a Retry button.

---

# Notifications

Toast notifications should appear for:

- Order Created
- Order Updated
- Menu Saved
- Error

---

# Accessibility

Minimum touch target:

44px

Use proper contrast.

Support keyboard navigation.

Use semantic HTML.

---

# UI Components

The project will use:

- shadcn/ui

Custom Components:

- Food Card
- Category Card
- Order Card
- Status Badge
- QR Card
- Table Card
- Sales Card
- Dashboard Card

---

# Design Rules

- Mobile First
- Keep pages uncluttered.
- Maximum content width: 1440px.
- Do not use more than two primary colors.
- Use consistent spacing.
- Reuse components whenever possible.
- Prefer icons with labels.
- Every action should provide feedback.
- Never sacrifice usability for visual effects.

---

# Overall Experience

X Cafe should feel:

Fast.

Modern.

Professional.

Simple enough for anyone to use without instructions.