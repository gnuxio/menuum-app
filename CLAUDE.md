# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Menuum is a Next.js 16 application for intelligent meal planning. The app uses custom Bearer token authentication (localStorage) and a Go backend API for all authentication, profile, and data management.

**Live at:** https://app.menuum.com/

## Development Commands

**Development server:**
```bash
npm run dev
# Runs on http://localhost:3000
```

**Build:**
```bash
npm run build
# Creates production build with standalone output
```

**Production server:**
```bash
npm run start
# Runs production build
```

**Linting:**
```bash
npm run lint
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript with strict mode enabled
- **UI Components:** shadcn/ui (New York style variant)
- **Styling:** Tailwind CSS v4 with custom theme
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Auth:** Custom Bearer token authentication with localStorage
- **Backend API:** Go microservice (https://api.menuum.com)
- **Deployment:** Docker (standalone mode)

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages and layouts
  - `(auth)/` - Route group for authentication pages (login, register)
  - `page.tsx` - Root page (dashboard) with server-side auth check
  - `layout.tsx` - Root layout with Geist fonts and LayoutWrapper
  - `globals.css` - Tailwind v4 configuration with custom theme variables

- `components/` - React components
  - `ui/` - shadcn/ui components (button, card, input, label)
  - `plans/` - Components for plans/menu feature
  - `profile/` - Components for profile feature
  - `LayoutWrapper.tsx` - Layout wrapper with sidebar state management
  - `Sidebar.tsx` - Collapsible sidebar with navigation
  - `MobileHeader.tsx` - Mobile header with menu toggle

- `hooks/` - Custom React hooks
  - `useAuth.ts` - Authentication hook (user state, loading, signOut, refreshUser)

- `lib/` - Utilities and services
  - `auth/` - Authentication services
    - `client.ts` - Auth client for login, register, logout, token refresh
    - `tokens.ts` - Token management utilities (localStorage)
    - `interceptor.ts` - Fetch wrapper with automatic token refresh
  - `api/` - Backend API client services
    - `profile.ts` - Profile operations with Go backend
    - `plans.ts` - Menu/plans operations with Go backend
  - `types/` - TypeScript type definitions
    - `profile.ts` - Profile data types
    - `plans.ts` - Menu/plan data types
  - `constants/` - Shared constants and configuration values
    - `countries.ts` - List of countries
    - `gender.ts` - Gender options
  - `utils.ts` - Utility functions (cn for class merging)

- `components/ProtectedRoute.tsx` - Client-side route protection wrapper

### Backend Architecture

**Single Go Backend** (`https://api.menuum.com`):
- Authentication service (`/auth/*`)
  - User registration, login, email verification
  - Password reset and change password
  - Token refresh and session management
- Profile management (`/api/v1/profile`)
- Menu/plans management (`/api/v1/menu`)
- All business logic and data storage

**Environment variables:**
```bash
NEXT_PUBLIC_API_URL=                # Go backend URL (defaults to https://api.menuum.com)
NEXT_PUBLIC_AUTH_URL=               # Auth service URL (dev: http://localhost:8080/auth, prod: uses API_URL/auth)
NODE_ENV=                           # Environment (development/production)
```

### Authentication Flow

**Token-based authentication with Bearer tokens stored in localStorage:**

1. User logs in via `authClient.login(email, password)`
2. Backend returns `access_token`, `id_token`, `refresh_token`, and `expires_in`
3. Tokens are stored in localStorage via `setAuthTokens()`
4. All API requests use `fetchWithAuth()` which:
   - Automatically adds `Authorization: Bearer {access_token}` header
   - Checks if token is expired (with 5-minute buffer)
   - Automatically refreshes token if expired or on 401 response
   - Retries original request with new token
5. On logout, tokens are cleared from localStorage

**Key files:**
- `lib/auth/client.ts` - Auth operations (login, register, logout, refresh, etc.)
- `lib/auth/tokens.ts` - Token storage in localStorage
- `lib/auth/interceptor.ts` - `fetchWithAuth()` wrapper with auto-refresh
- `hooks/useAuth.ts` - React hook for auth state in Client Components
- `components/ProtectedRoute.tsx` - Client-side route protection wrapper

**Usage in Client Components:**
```typescript
import { useAuth } from '@/hooks/useAuth'
import { authClient } from '@/lib/auth/client'

// In component
const { user, loading, signOut } = useAuth()

// Login
await authClient.login('email@example.com', 'password')

// API calls (automatic token handling)
import { fetchWithAuth } from '@/lib/auth/interceptor'
const response = await fetchWithAuth('https://api.menuum.com/api/v1/profile', {
  method: 'GET'
})
```

### Layout System

**LayoutWrapper Pattern:**
- `app/layout.tsx` wraps all pages with `LayoutWrapper`
- `LayoutWrapper` conditionally renders `Sidebar` based on route
- Sidebar hidden on: `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`
- Sidebar shown on: `/`, `/plans`, `/profile` (dashboard routes)
- Uses React Context for sidebar collapse state
- Responsive: mobile drawer overlay, desktop persistent sidebar

### Styling System

The app uses Tailwind CSS v4 with a custom theme defined in `app/globals.css`:
- CSS variables for theming (`--color-*`, `--radius-*`)
- OKLCH color space for modern color management
- Custom variants for dark mode
- Geist Sans and Geist Mono fonts

### Path Aliases

Configured in `tsconfig.json`:
- `@/*` maps to project root (`./*`)

## Critical Architecture Decisions

### Client-Side Authentication Pattern

**All authentication is handled client-side** with Bearer tokens in localStorage:

**Client Components (all pages are Client Components):**
- All pages use `'use client'` directive
- Auth pages (login/register) use `authClient` directly for login/register
- Protected pages use `ProtectedRoute` wrapper or `useAuth()` hook
- Use `router.push()` or `router.replace()` for navigation (NOT `redirect()`)

**Route Protection:**
1. **ProtectedRoute Component** (`components/ProtectedRoute.tsx`):
   ```typescript
   import { ProtectedRoute } from '@/components/ProtectedRoute'

   export default function DashboardPage() {
     return (
       <ProtectedRoute>
         <DashboardView />
       </ProtectedRoute>
     )
   }
   ```
   - Checks authentication via `useAuth()` hook
   - Shows loading state while checking auth
   - Redirects to `/login` if not authenticated

2. **useAuth Hook** (`hooks/useAuth.ts`):
   ```typescript
   const { user, loading, error, signOut, refreshUser } = useAuth()
   ```
   - Returns current user or null
   - Automatically refreshes expired tokens
   - Provides `signOut()` function for logout

**Important:**
- No server-side middleware or proxy for auth
- All routes are public by default
- Protected routes must explicitly use `ProtectedRoute` wrapper or check `user` from `useAuth()`
- Token refresh happens automatically in `fetchWithAuth()` interceptor

### Backend API Client Pattern

**All API clients use `fetchWithAuth()` for automatic token management:**

**Profile API** (`lib/api/profile.ts`):
- `createProfile(payload)` - POST `/api/v1/profile`
- `getProfile()` - GET `/api/v1/profile`
- `updateProfile(payload)` - PUT `/api/v1/profile`
- `uploadAvatar(file)` - POST `/api/v1/profile/avatar`
- `deleteAvatar()` - DELETE `/api/v1/profile/avatar`

**Plans API** (`lib/api/plans.ts`):
- `getMenuHistory()` - GET `/api/v1/menu/history` - returns all user's menu plans
- `getMenuById(id)` - GET `/api/v1/menu/:id` - returns specific menu with all days/meals
- `createMenu()` - POST `/api/v1/menu` - creates new menu (async, returns 202)

**Common patterns:**
- All use `fetchWithAuth()` from `lib/auth/interceptor.ts`
- Automatic Bearer token injection
- Automatic token refresh on expiration
- Type-safe with TypeScript interfaces
- Error handling with Spanish messages
- Backend wraps responses in `{ data: ... }` structure

**Usage example:**
```typescript
import { getProfile } from '@/lib/api/profile'
import { getMenuHistory } from '@/lib/api/plans'

// Automatic token handling - no need to pass tokens manually
const profile = await getProfile()
const plans = await getMenuHistory()
```

### Type Safety Pattern

**Type organization:**
- `lib/types/profile.ts` - Profile data structures and related types
- `lib/types/plans.ts` - Menu/plan data structures and related types
- `lib/constants/` - Shared constants (countries, gender, goals, activities, etc.)

**Constants structure:**
All constants are centralized in `lib/constants/` for reusability:
- `countries.ts` - COUNTRIES array with country names and codes
- `gender.ts` - GENDER_VALUES and GENDER_LABELS
- `goals.ts` - GOALS array and GOAL_LABELS for user weight/health goals
- `activities.ts` - ACTIVITIES array and ACTIVITY_LABELS for activity levels
- `index.ts` - Barrel export for convenient importing

**Key principles:**
- Single source of truth for each data structure
- Eliminates duplicate interface definitions
- Numeric fields are `number` type, not `string`
- Arrays must be typed: `string[]` not `any[]`
- Constants exported from `lib/constants/` for reusability
- Use barrel imports when importing multiple constants: `import { GOALS, ACTIVITIES } from '@/lib/constants'`

**Example - DO NOT create inline interfaces or constants:**
```typescript
// ❌ Bad - duplicate interface or inline constants
interface ProfileProps {
  data: { name: string; age: number; ... }
}
const GOALS = [{ id: 'weight_loss', label: 'Perder peso' }];

// ✅ Good - import shared types and constants
import { ProfileData } from '@/lib/types/profile';
import { GOALS, GOAL_LABELS } from '@/lib/constants/goals';
// OR use barrel import
import { GOALS, GOAL_LABELS, ACTIVITIES } from '@/lib/constants';
```

## Styling Conventions

**Color Palette:**
- Primary: Green (#22C55E) and Emerald (#10B981)
- Accent: Orange (#F97316) - used sparingly
- Neutrals: Gray (NOT slate)
- Gradients: `from-green-600 to-emerald-600` for headings and buttons

**Glassmorphism Pattern:**
```typescript
className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50"
```

**Selection States:**
- Selected: `border-green-500 bg-green-50 shadow-lg shadow-green-500/20`
- Unselected: `border-gray-200 bg-white hover:border-gray-300 hover:shadow-md`

**Button Styles:**
- Primary CTA: `bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700`
- Shadow: `shadow-lg shadow-green-500/20 hover:shadow-green-500/40`
- Hover effect: `hover:scale-[1.02]`

**Animations:**
- Use Framer Motion for all animations
- Stagger delays: `delay: index * 0.05` for list items
- Entry animations: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- Page transitions: `initial={{ opacity: 0, x: 30 }}` → `exit={{ opacity: 0, x: -30 }}`

## Common Pitfalls to Avoid

1. **Using `redirect()` in Client Components** - Causes "not a function" errors; use `router.push()`
2. **Manual token management** - Always use `fetchWithAuth()`, never manually add Authorization headers
3. **Forgetting ProtectedRoute wrapper** - Protected pages need explicit protection (no automatic middleware)
4. **Creating duplicate type definitions** - Always import from `lib/types/`
5. **Using slate colors** - Should be gray (palette consistency)
6. **Storing numbers as strings** - Age, weight, height are `number` type
7. **Missing type assertions on arrays** - Use `[] as string[]` not just `[]`
8. **Direct fetch() calls to backend** - Always use `lib/api/*` clients or `fetchWithAuth()`
9. **Assuming server-side auth** - All auth is client-side with localStorage tokens

## Key Considerations

- **Language**: Spanish is used throughout the UI
- **Branding**: Package name is "menuum-frontend" and app displays "Menuum"
- **Domain**: Live at https://app.menuum.com/
- **Backend**: Go API at https://api.menuum.com (handles both auth and data)
- **Auth Strategy**: Client-side Bearer tokens in localStorage (NO Supabase, NO server-side sessions)
- **Token Refresh**: Automatic via `fetchWithAuth()` interceptor with 5-minute expiration buffer
- **Route Protection**: Client-side via `ProtectedRoute` component (NO middleware)
- **Form Library**: None - vanilla React state management with validation functions
- **Next.js Version**: 16 with Turbopack
- **Plans Feature**: Menu generation with async processing (202 status on creation)
