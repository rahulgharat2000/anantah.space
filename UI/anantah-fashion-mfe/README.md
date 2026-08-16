# Anantah Space Fashion MFE

React/TypeScript micro-frontend for the Anantah Space Fashion storefront. It exposes `FashionApp` through Module Federation and owns all `/fashion/*` routes.

## Structure

- `src/app`: routing, providers, layouts, and application boundaries
- `src/features`: customer and administration feature modules
- `src/shared`: API clients, validation, accessibility, and utilities
- `src/design-system`: shared tokens and reusable controls, introduced in Step 2

## Design system

Step 2 establishes semantic design tokens and accessible shared controls for buttons, icon actions, search, segmented selection, feedback, empty states, and loading placeholders. Usage and ownership rules are documented in `src/design-system/README.md`.

Feature-specific commerce UI, including product cards and pricing presentation, stays within its owning feature rather than entering the design system prematurely.

## Authentication boundary

Step 3 integrates the Fashion MFE with the shared Anantah browser session through `src/app/providers/AuthProvider.tsx`. The provider validates stored session shape and expiry, observes same-tab auth events and cross-tab storage events, and exposes live sign-in state to the Fashion application shell.

The current Auth MFE issues development-only `demo_` tokens. Fashion deliberately does not attach those tokens to API requests. A non-demo bearer token can be attached by the shared API client when the production identity provider contract is introduced.

## Home composition

Step 4 makes `/fashion` a CMS-composed home page while `/fashion/catalog` remains the catalog route. The home renderer supports hero, editorial, collection-grid, and service-strip blocks returned by `/api/v1/fashion/content/pages/home`.

Content links are restricted to application-relative paths, unknown block kinds render nothing, and API failure shows a retry action plus a direct catalog escape path. The current backend content source is a curated published-content adapter; CMS authoring and database-backed publication are deferred to the administration step.

## Local dev

```powershell
npm install
npm run dev
```

Runs on `http://localhost:4176`.

Set `VITE_FASHION_API_URL` in `.env.local` if the backend is not running on `http://localhost:5134`.

```powershell
npm run typecheck
npm run build
```
