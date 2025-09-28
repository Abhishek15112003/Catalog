# App Catalog Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Apple App Store and Salesforce AppExchange for enterprise app discovery, combined with Okta Dashboard patterns for user management and access control.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Light mode: 59 100% 29% (deep blue-green)
- Dark mode: 201 79% 46% (bright blue)

**Accent Colors:**
- Success: 142 76% 36% (green for approved access)
- Warning: 45 93% 47% (amber for pending requests)
- Error: 0 84% 60% (red for denied/error states)

**Neutral Grays:**
- Light mode backgrounds: 220 14% 96%
- Dark mode backgrounds: 222 84% 5%
- Text: 220 9% 46% (light) / 220 13% 91% (dark)

### Typography
**Fonts:** Inter (primary), JetBrains Mono (code/technical details)
**Hierarchy:**
- Headers: 600-700 weight, 24-48px
- Body: 400-500 weight, 14-16px
- Captions: 400 weight, 12-14px

### Layout System
**Spacing Units:** Consistent use of Tailwind units: 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6, p-8
- Section margins: mb-8, mb-12, mb-16
- Grid gaps: gap-4, gap-6, gap-8

### Component Library

**Navigation:**
- Top navigation bar with logo, search, and user profile
- Sidebar with collapsible categories and filters
- Breadcrumb navigation for deep navigation paths

**App Cards:**
- Grid layout (3-4 columns desktop, 1-2 mobile)
- App icon, name, category badge, rating stars
- Access status indicator (Available/Request Required/Pending)
- Quick action buttons (Install/Request Access/View Details)

**App Detail Pages:**
- Hero section with large app icon, title, publisher
- Tabbed content: Overview, Features, Reviews, Requirements
- Right sidebar: Access status, usage stats, related apps
- Prominent CTA button for access requests

**Dashboard Components:**
- Status cards for active apps, pending requests, recent activity
- Quick access grid for frequently used apps
- Notification center for access updates

**Forms & Interactions:**
- Multi-step access request wizard with progress indicator
- Inline validation with clear error messages
- Loading states with skeleton screens
- Success confirmations with next action suggestions

### Search & Filtering
- Prominent search bar with predictive suggestions
- Filter sidebar: Categories, Access Status, Ratings, Departments
- Sort options: Popularity, Alphabetical, Recently Added, Rating
- Search result highlighting and zero-state illustrations

### Visual Hierarchy
- Clear information architecture with consistent card-based layouts
- Strategic use of color for status indicators and CTAs
- Typography scale that emphasizes app names and key actions
- Generous whitespace for improved readability

### Responsive Design
- Mobile-first approach with touch-friendly interaction areas
- Adaptive grid layouts that stack appropriately
- Collapsible navigation and filter panels on smaller screens
- Optimized card sizes for different viewport widths

This design system emphasizes discoverability, clear access status communication, and streamlined workflows while maintaining the familiar patterns users expect from modern app marketplaces.