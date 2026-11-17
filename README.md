# ascend-web

> Dedicated client-side React 18 + Vite web application engineered for desktop-first responsiveness on the Starweaver Ascend platform. Approved by review leads **Syed Imaduddin** and **Sambeet**.

---

## 1. Technical Specifications & Architecture Matrix

| Specification | Version / Value | Details & Policy |
| :--- | :--- | :--- |
| **Framework** | React `18.3.1` | Pure client-side SPA. **Strictly zero React Server Components (RSC)**. |
| **Language** | TypeScript `5.4.5` | Ultra-strict compiler (`strict: true`, zero type inference). |
| **Build Tool & Bundler**| Vite `5.2.11` | Instant HMR, ESM bundling, camelCase CSS modules. |
| **Routing** | `react-router-dom` `6.23.1` | Client-side routing with `ProtectedRoute` guards. |
| **Styling Engine** | Scoped CSS3 Modules | Co-located `*.module.css` + `src/styles/tokens.css`. **Strictly NO Tailwind CSS**. |
| **Data Communication** | Native `fetch` wrapper | Generic typed `ApiClient` from `@starweaver/ascend-core`. **Strictly NO React Query**. |
| **Testing Harness** | Playwright `1.44.1` | Desktop E2E testing (TDD first) across `1440x900` and `1920x1080` viewports. |
| **Linter** | ESLint `8.57.0` | `eslint-plugin-unused-imports`, `@typescript-eslint/typedef`, zero-warning policy (`--max-warnings 0`). |
| **Code Formatter** | Prettier `3.2.5` | Single quotes, 2 spaces, trailing commas, print width 100. |
| **Target Runtime** | Node.js `>= 20.0.0` (LTS) | Tested on Node v20.20.2 / npm 10.8.2. |

---

## 2. Port & Network Specifications

The application uses deterministic ports configured in `vite.config.ts`, `playwright.config.ts`, and `.env`:

| Service / Process | Default Port | Protocol / URL | Configuration Location | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Vite Dev Server** | `5173` | `http://localhost:5173` | `vite.config.ts` (`server.port: 5173`, `strictPort: true`) | Local development server with Hot Module Replacement. |
| **Vite Preview Server** | `4173` | `http://localhost:4173` | `vite.config.ts` (`preview.port: 4173`, `strictPort: true`) | Local preview of optimized production build (`dist/`). |
| **Playwright Web Server** | `5173` | `http://localhost:5173` | `playwright.config.ts` (`webServer.url`) | Automatically started by Playwright runner during test execution. |
| **Backend REST API** | `8080` | `http://localhost:8080/api` | `.env` (`VITE_API_BASE_URL`) | Express backend API endpoint for authentication and data. |
| **Playwright Report Viewer**| `9323` | `http://localhost:9323` | Default Playwright CLI | Interactive HTML test report server (`npx playwright show-report`). |

---

## 3. Desktop Viewport Specifications

All desktop layouts and E2E suites enforce three desktop responsive tiers:

| Viewport Name | Resolution | Target Form Factor | Media Query Breakpoint |
| :--- | :--- | :--- | :--- |
| **Laptop / Small Desktop** | `1280 x 800` | 13" - 14" Laptops, smaller desktop displays | Base grid / `@media (min-width: 1280px)` |
| **Desktop Standard (Default)** | `1440 x 900` | Standard 15" - 16" Laptops, 24" Desktop monitors | `@media (min-width: 1440px)` |
| **Desktop Widescreen** | `1920 x 1080` | 27"+ Full HD / QHD External Monitors | `@media (min-width: 1920px)` |

---

## 4. Environment Variables (`.env`)

Public client variables must be prefixed with `VITE_`. Server secrets are forbidden in `ascend-web`.

| Variable Name | Required | Default Value | Description |
| :--- | :---: | :--- | :--- |
| `VITE_API_BASE_URL` | **Yes** | `http://localhost:8080` | Backend Express REST API endpoint. |

Setup instructions:
```bash
# Copy example environment configuration
cp .env.example .env
```

---

## 5. Quick Start: How to Run This Project

### Step 1: Clone & Navigate to Repository
```bash
cd c:\Users\shrey\Desktop\starweaver\ascend-web
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Install Playwright Chromium Browser (One-Time Setup)
```bash
npx playwright install chromium
```

### Step 4: Start the Vite Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 6. Complete Command Reference

### Development & Build Commands

```bash
# Start local development server on http://localhost:5173 (with strict port & HMR)
npm run dev

# Run TypeScript type checking + Vite production build (outputs to dist/)
npm run build

# Preview the production build locally on http://localhost:4173
npm run preview
```

### Quality Assurance & Linting Commands

```bash
# Run TypeScript compiler checks with zero emit (validates ultra-strict flags)
npm run type-check

# Run ESLint across all .ts and .tsx files (enforces zero warnings & unused imports)
npm run lint

# Automatically fix autofixable linting and import ordering errors
npm run lint:fix

# Check formatting across all TS, TSX, and CSS files with Prettier
npm run format:check

# Automatically format all source files with Prettier
npm run format
```

### Testing Commands (Playwright E2E Desktop)

```bash
# Run Playwright desktop smoke tests headless (1440x900 & 1920x1080 viewports)
npm run test:e2e

# Run Playwright with the interactive visual UI runner
npm run test:e2e:ui

# Run Playwright in headed mode (visible browser window)
npx playwright test --headed

# Open the HTML test execution report from the last run
npx playwright show-report
```

### Definition of Done (DoD) Gate Command

```bash
# Executes the full Phase 1 exit gate (Lint + Type-Check + Playwright E2E)
npm run audit:phase1
```

---

## 7. Non-Negotiable Engineering Rules

1. **Ultra-Strict TypeScript (`tsconfig.json`)**:
   * `strict: true`
   * `noImplicitAny: true`
   * `noUnusedLocals: true` (no unused variables)
   * `noUnusedParameters: true` (no unused parameters)
   * `noImplicitReturns: true`
   * `noFallthroughCasesInSwitch: true`
   * `exactOptionalPropertyTypes: true`
2. **Zero Type Inference**:
   * `@typescript-eslint/typedef` requires explicit type annotations on **every** variable declaration, function parameter, class member, and interface property.
   * `@typescript-eslint/explicit-function-return-type` requires explicit return types on every function and method.
   * `@typescript-eslint/no-explicit-any` strictly forbids `any`.
3. **Zero Unused Code**:
   * `unused-imports/no-unused-imports` throws an error on unreferenced imports.
   * `unused-imports/no-unused-vars` throws an error on unreferenced variables.
4. **Pure CSS3 Modules Architecture**:
   * Every component has a co-located `[ComponentName].module.css` file.
   * Global design tokens are defined in `src/styles/tokens.css` using native CSS variables (`--color-*`, `--spacing-*`, `--radius-*`, etc.).
   * Modern reset and desktop typography are defined in `src/styles/global.css`.
   * **Strictly NO Tailwind CSS**: Zero utility classes, zero tailwind configs, zero `@apply` directives. Codebase grep confirms `0` occurrences.
5. **Lightweight Typed API Client**:
   * Generic native `fetch` client from `@starweaver/ascend-core`.
   * **Strictly NO React Query / TanStack Query**.
6. **Playwright E2E Testing (TDD First)**:
   * E2E tests are written and verified failing **BEFORE** UI component code is authored.
   * Tests run against desktop viewports (`1440x900` and `1920x1080`).

---

## 8. Directory & File Organization

```text
ascend-web/
├── eslint.config.mjs        # Ultra-strict ESLint Flat Config (unused-imports, typedef, no-any)
├── .gitignore
├── .prettierrc              # Prettier code formatting rules
├── .prettierignore
├── .env.example             # Example environment variables
├── .env                     # Local environment variables
├── index.html               # Single Page Application HTML root
├── package.json             # NPM dependencies and scripts
├── playwright.config.ts     # Playwright E2E configuration (1440x900, 1920x1080)
├── tsconfig.json            # Ultra-strict compiler flags + path alias (@/*)
├── tsconfig.node.json       # Node tooling compiler configuration
├── vite.config.ts           # Vite bundler configuration (port 5173, CSS modules)
├── src/
│   ├── App.tsx              # Root router configuration
│   ├── main.tsx             # React 18 client application mount
│   ├── vite-env.d.ts        # Vite client types & env typing
│   ├── pages/
│   │   └── Home/
│   │       ├── HomePage.tsx          # Phase 1 desktop landing page (explicit types)
│   │       └── HomePage.module.css   # Scoped CSS3 Module with desktop media queries
│   └── styles/
│       ├── tokens.css       # Design tokens (colors, spacing, typography, radii, shadows)
│       └── global.css       # Modern CSS reset & desktop base typography
└── tests/
    └── e2e/
        └── smoke.spec.ts    # Playwright desktop smoke test suite
```

---

## 9. Phase 1 Definition of Done (DoD) Exit Gate Status

- [x] `npm run lint` exits with code `0` (0 errors, 0 warnings).
- [x] `npm run type-check` (`tsc --noEmit`) exits with code `0` (0 compiler errors).
- [x] `npm run test:e2e` passes 100% across `1440x900` and `1920x1080` desktop viewports.
- [x] CSS codebase verified with **0 occurrences of Tailwind CSS**.
- [x] Production build (`npm run build`) bundles cleanly under 55 KB gzip.
