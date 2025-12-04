# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Menuum is a Next.js 16 application for intelligent meal planning. The app uses AWS Cognito for authentication and AWS DynamoDB for data storage, with a multi-step onboarding flow to collect user nutrition preferences and goals.

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
- **Auth:** AWS Cognito (via AWS Amplify v6)
- **Database:** AWS DynamoDB
- **Deployment:** Docker (standalone mode)

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages and layouts
  - `(auth)/` - Route group for authentication pages (login, register)
  - `api/` - API routes
    - `profile/onboarding/` - Onboarding data submission endpoint
  - `dashboard/` - Main dashboard after login
  - `onboarding/` - Multi-step onboarding flow
  - `page.tsx` - Root page with auth check using useAuth hook
  - `layout.tsx` - Root layout with Geist fonts
  - `globals.css` - Tailwind v4 configuration with custom theme variables

- `components/` - React components
  - `ui/` - shadcn/ui components (button, card, input, label)
  - `onboarding/` - 8-step onboarding flow components (Step1Objetivo through Step8Confirmacion)

- `hooks/` - Custom React hooks
  - `useAuth.ts` - Authentication hook (user state, loading, signOut)

- `lib/` - Utilities and services
  - `cognito/` - AWS Cognito authentication clients
    - `client.ts` - Browser client configuration (AWS Amplify)
    - `server.ts` - Server-side JWT validation with jose
    - `proxy.ts` - Proxy helper for session management and route protection
  - `dynamodb/` - AWS DynamoDB helpers
    - `client.ts` - DynamoDB operations for user_profiles table
  - `types/` - TypeScript type definitions
    - `onboarding.ts` - Shared types for onboarding flow
  - `utils.ts` - Utility functions (cn for class merging)
  - `amplify-config.ts` - AWS Amplify configuration

- `middleware.ts` - Route protection and session management (edge runtime)

### Authentication Flow

1. Root page (`app/page.tsx`) verifies authentication server-side using Cognito JWT validation
2. Unauthenticated users redirect to `/login`
3. After login, authenticated users see dashboard
4. Auth state in Client Components is managed via the `useAuth` hook
5. Cognito stores JWT tokens in browser cookies (managed by AWS Amplify)
6. Server Components validate JWT tokens using jose library against Cognito JWKS
7. Use AWS Amplify auth functions (`signIn`, `signUp`, `signOut`, `getCurrentUser`) in Client Components
8. Use `getCurrentUser()` from `@/lib/cognito/server` in Server Components/Actions

### Onboarding Flow

The onboarding process (`app/onboarding/page.tsx`) consists of 8 steps that collect user data:

1. **Step1Objetivo** - Weight goals (lose, maintain, gain muscle)
2. **Step2Basicos** - Age (number), weight (number), height (number)
3. **Step3Sexo** - Gender selection
4. **Step4Actividad** - Activity level
5. **Step5Preferencias** - Dietary preferences
6. **Step6Restricciones** - Dietary restrictions (string array)
7. **Step7Habitos** - Cooking habits (skill level, time, equipment array)
8. **Step8Confirmacion** - Review and submit with error handling

All user data is stored in a single state object (`UserOnboardingData` type from `lib/types/onboarding.ts`) and validated per-step. On completion, data is sent to the backend Go API which saves to the `user_profiles` table in DynamoDB.

**Type Safety**: All components use shared types from `lib/types/onboarding.ts`:
- `UserOnboardingData` - Main data structure
- `OnboardingStepProps` - Props for Steps 1-7
- `Step8Props` - Props for confirmation step with error handling

### Styling System

The app uses Tailwind CSS v4 with a custom theme defined in `app/globals.css`:
- CSS variables for theming (`--color-*`, `--radius-*`)
- OKLCH color space for modern color management
- Custom variants for dark mode
- Geist Sans and Geist Mono fonts

### Path Aliases

Configured in `tsconfig.json`:
- `@/*` maps to project root
- Specific aliases from `components.json`:
  - `@/components` - components directory
  - `@/lib` - lib directory
  - `@/hooks` - hooks directory
  - `@/components/ui` - UI components

## Environment Variables

Required in `.env.local`:
```bash
# AWS Cognito Configuration
NEXT_PUBLIC_COGNITO_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_COOKIE_DOMAIN=localhost

# AWS DynamoDB Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
DYNAMODB_USER_PROFILES_TABLE=user_profiles

# Backend API
NEXT_PUBLIC_API_URL=https://api.menuum.com
```

See `AWS_SETUP.md` for detailed setup instructions.

## Docker Deployment

The project includes a multi-stage Dockerfile optimized for Next.js standalone output:
- Uses Node 25.1.0 Alpine base image
- Supports npm, yarn, or pnpm
- Production image runs on port 3000
- Configured with `output: 'standalone'` in `next.config.ts`

## Component Patterns

**UI Components** follow shadcn/ui patterns:
- Use `class-variance-authority` for variant management
- Use `tailwind-merge` via `cn()` utility for class merging
- Radix UI primitives for accessible components

**Page Components** use these conventions:
- `'use client'` directive for client-side interactivity
- TypeScript types for props and state
- Framer Motion for page transitions and animations
- Lucide React icons throughout

**Form Validation** in onboarding:
- Per-step validation via `canProceed()` function
- Navigation disabled until required fields are complete
- No form library used - vanilla React state management
- Error handling with user feedback on Step 8
- Numeric fields (edad, peso, estatura) are stored as numbers, not strings

## Critical Architecture Decisions

### Server vs Client Components

**Server Components (default):**
- Use for pages that need auth verification before rendering
- Example: `app/page.tsx` - checks JWT token server-side before rendering
- Can use `redirect()` directly in async component body
- Use `getCurrentUser()` from `@/lib/cognito/server`

**Client Components (use 'use client'):**
- Required for interactivity (onClick, useState, useEffect)
- All onboarding steps are Client Components (need form interactions)
- Auth pages (login/register) are Client Components (forms + navigation)
- Use `useAuth()` hook for auth state in Client Components
- Use AWS Amplify auth functions: `signIn()`, `signUp()`, `signOut()`, `getCurrentUser()`
- Import `@/lib/cognito/client` to auto-configure Amplify
- Use `router.push()` or `router.replace()` for navigation (NOT `redirect()`)

### AWS Cognito SSR Architecture

**Three Authentication Layers (IMPORTANT - use correct one):**

1. **Browser Client** (`lib/cognito/client.ts`):
   ```typescript
   import '@/lib/cognito/client' // Auto-configures Amplify
   import { signIn, signUp, signOut, getCurrentUser } from 'aws-amplify/auth'
   ```
   - For Client Components only
   - Configures AWS Amplify with Cognito settings
   - Handles cookies automatically in browser
   - Used in: login, register, useAuth hook, Sidebar

2. **Server Client** (`lib/cognito/server.ts`):
   ```typescript
   import { getCurrentUser, getIdToken } from '@/lib/cognito/server'
   ```
   - For Server Components, Server Actions, Route Handlers
   - Validates JWT tokens using jose library against Cognito JWKS
   - Extracts user information from decoded token claims
   - Returns `CognitoUser` object or `null`
   - Used in: dashboard (app/page.tsx), protected pages

3. **Proxy Client** (`lib/cognito/proxy.ts`):
   ```typescript
   import { updateSession } from '@/lib/cognito/proxy'
   ```
   - **Do NOT import directly** - used only by `proxy.ts`
   - Validates JWT tokens from cookies on each request
   - Handles route protection and redirects
   - Returns modified NextResponse

### Route Protection Pattern

**Proxy** (`proxy.ts`):
- Runs on ALL requests (see config matcher)
- Calls `updateSession()` from `lib/cognito/proxy.ts` which:
  1. Validates JWT token from cookies using Cognito JWKS
  2. Redirects unauthenticated users from protected pages to `/login`
  3. Redirects authenticated users from auth pages to `/dashboard`
- Protected routes: `/dashboard`, `/onboarding`
- Public routes: `/login`, `/register`
- Token validation happens on every request for protected routes

**Important**: Do NOT add auth checks in `useEffect` with `redirect()` - this creates infinite loops. Let proxy handle route protection.

### Type Safety Pattern

**Shared Types** (`lib/types/onboarding.ts`):
- Single source of truth for onboarding data structure
- Eliminates duplicate interface definitions
- Numeric fields (edad, peso, estatura) are `number` type, not `string`
- Arrays must be typed: `string[]` not `any[]`

**Example - DO NOT create inline interfaces:**
```typescript
// ❌ Bad - duplicate interface
interface StepProps {
  data: { objetivo: string; edad: number; ... }
}

// ✅ Good - import shared type
import { OnboardingStepProps } from '@/lib/types/onboarding'
```

### API Integration Pattern

**Profile API** (`lib/api/profile.ts`):
- Communicates with Go backend at `NEXT_PUBLIC_API_URL`
- Uses `fetchAuthSession()` from AWS Amplify to get Cognito ID token
- Sends JWT token in `Authorization: Bearer {token}` header
- Backend validates JWT against Cognito JWKS
- Backend extracts user ID from token `sub` claim
- Backend saves data to DynamoDB `user_profiles` table

**IMPORTANT**: Backend Go API must validate Cognito JWT tokens:
- JWKS URL: `https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json`
- Issuer: `https://cognito-idp.{region}.amazonaws.com/{userPoolId}`
- User ID claim: `sub` (not `user_id`)

## Styling Conventions

**Color Palette:**
- Primary: Green (#22C55E) and Emerald (#10B981)
- Accent: Orange (#F97316) - used sparingly
- Neutrals: Gray (NOT slate)
- Gradients: `from-green-600 to-emerald-600` for headings

**Glassmorphism Pattern:**
```typescript
className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50"
```

**Selection States:**
- Selected: `border-green-500 bg-green-50 shadow-lg shadow-green-500/20`
- Unselected: `border-gray-200 bg-white hover:border-gray-300 hover:shadow-md`

**Animations:**
- Use Framer Motion for all animations
- Stagger delays: `delay: index * 0.05` for list items
- Entry animations: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`

## Common Pitfalls to Avoid

1. **Using `redirect()` in Client Components** - Causes "not a function" errors
2. **Forgetting to import `@/lib/cognito/client`** - Required in Client Components using auth
3. **Mixing up auth contexts** - Use Amplify functions in Client, `getCurrentUser()` in Server
4. **Creating duplicate type definitions** - Always import from `lib/types/`
5. **Using slate colors** - Should be gray (palette consistency)
6. **Storing numbers as strings** - Age, weight, height are `number` type
7. **Missing type assertions on arrays** - Use `[] as string[]` not just `[]`
8. **Auth checks in useEffect** - Let proxy handle route protection
9. **Incorrect token in API calls** - Always use IdToken (not AccessToken) for backend calls
10. **Missing AWS credentials** - DynamoDB operations require AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

## Key Considerations

- **Language**: Spanish is used throughout the UI
- **Branding**: Package name is "menuum-frontend" and app displays "Menuum"
- **Domain**: Live at https://app.menuum.com/
- **Database**: User profiles stored in DynamoDB `user_profiles` table (partition key: `user_id`)
- **Authentication**: AWS Cognito with JWT tokens (IdToken for user claims, AccessToken for AWS services)
- **Form Library**: None - vanilla React state management with validation functions
- **Next.js Version**: 16 with Turbopack
- **Routing Layer**: Uses `proxy.ts` (Next.js 16's replacement for `middleware.ts`) running on Node.js runtime
- **AWS Setup**: See `AWS_SETUP.md` for detailed Cognito and DynamoDB configuration instructions
