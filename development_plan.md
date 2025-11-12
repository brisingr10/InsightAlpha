# Insight Equity Alpha - Complete Development Plan

## Project Overview
**Insight Equity Alpha** is a full-stack AI-powered venture capital research platform. Think of it as a specialized tool for VC analysts to research startups, generate detailed reports using AI, manage company data in Airtable-style tables, and organize meeting notes with file attachments. The platform has sophisticated role-based access control with four permission levels.

---

## Phase 1: Foundation & Setup

### Step 1: Initialize the Next.js Project
Start by creating a Next.js 13.5+ application with TypeScript. Choose the App Router (not Pages Router) since this uses React Server Components. Set up Tailwind CSS during initialization. Install the Inter font from Google Fonts as your primary typeface.

### Step 2: Set Up the Database with Prisma
Install Prisma as your ORM. Create a PostgreSQL database on Supabase (they provide free hosted Postgres). You'll need two connection strings - a pooled connection for runtime (port 6543) and a direct connection for migrations (port 5432). Configure your `prisma/schema.prisma` file to use PostgreSQL as the provider.

### Step 3: Design the Database Schema
Create your Prisma models starting with the core entities:

**First**, build the **User** model with fields for id, email, passwordHash (you'll hash passwords with bcrypt), name, role (an enum with ADMIN, EDITOR, ANALYST, VIEWER), and timestamps. This is the foundation for authentication.

**Second**, create the **Report** model - this stores your AI-generated company research. Include fields for title, slug (for URLs), contentMarkdown (the full report text), summary, status (DRAFT/PUBLISHED/ARCHIVED), authorId (foreign key to User), reportDate, and timestamps. Each report can have metadata attached.

**Third**, build **ReportMetadata** as a separate table with a one-to-one relationship to Report. Store companyName, ceoName, sectors (array), fundingStage, employeeCount, revenue, foundedYear, location, and markdownNotes. This separation keeps your report table clean.

**Fourth**, create **CompanyMeetingNote** for storing meeting notes attached to companies. Include companyName, title, content, and createdBy fields.

**Fifth**, add **MeetingNoteAttachment** to handle file uploads. Store fileName, fileUrl (the Supabase Storage path), fileSize, and mimeType.

**Sixth**, build the **CompanyTable** system (Airtable-like feature) with tables for CompanyTable, CompanyRow, and TableView. The CompanyTable stores table metadata and columns as JSON. CompanyRow stores actual data as JSON (flexible schema). TableView stores user-specific view configurations (column order, filters, sorting).

**Seventh**, add **AnalysisCategory** for organizing reports and **ApiKey** for external API access with rate limiting.

Run `npx prisma migrate dev` to create your database tables.

### Step 4: Set Up Authentication Infrastructure
Install `bcryptjs` for password hashing and `jose` for JWT tokens. Create utility functions in `lib/auth/`:

- **Password hashing**: Function to hash passwords with 12 salt rounds
- **JWT creation**: Generate tokens containing userId, email, and role with 7-day expiry
- **JWT verification**: Validate tokens from cookies
- **getCurrentUser()**: Extract user data from the request's JWT

Store JWTs in httpOnly cookies (using the `cookie` package) for security - they're immune to XSS attacks.

### Step 5: Implement RBAC Permissions
Create a comprehensive permission system in `lib/permissions.ts`. Define permissions like:
- **VIEWER**: can only view reports
- **ANALYST**: can create and edit their own reports
- **EDITOR**: can edit/delete any report
- **ADMIN**: can manage users and API keys

Build helper functions like `hasPermission(user, 'edit_any_report')` and `canEditReport(user, report)`.

### Step 6: Set Up Middleware
Create Next.js middleware to protect routes. Check for JWT on every request. Redirect unauthenticated users to `/login`. Block non-admins from `/admin/*` routes. Let public routes like `/company/[companyName]` pass through after authentication.

---

## Phase 2: Authentication & User Management

### Step 7: Build Auth API Routes
Create three API routes in `app/api/auth/`:

**Login route** (`POST /api/auth/login`): Accept email/password, verify against database using bcrypt, create JWT, set cookie, return user data.

**Register route** (`POST /api/auth/register`): Validate input with Zod schema (email format, password strength), hash password, create user record (default role: VIEWER), create JWT, set cookie.

**Logout route** (`POST /api/auth/logout`): Clear the JWT cookie by setting it to expire immediately.

### Step 8: Build Login & Register Pages
Create `app/login/page.tsx` and `app/register/page.tsx`. Use React Hook Form with Zod validation. Style them with Tailwind and shadcn/ui components (you'll install these next). Include error handling and success toasts using Sonner.

### Step 9: Install shadcn/ui Component Library
This is crucial - you're using 45+ shadcn/ui components. Initialize shadcn/ui with `npx shadcn-ui@latest init`. Install components one by one as needed: Button, Input, Card, Dialog, Table, Select, Textarea, etc. These are Radix UI primitives styled with Tailwind, and they'll be placed in `components/ui/`.

### Step 10: Build Admin User Management
Create admin pages at `app/(dashboard)/admin/page.tsx` for the user list. Build API routes:
- `GET/POST /api/admin/users` - List all users, create new users
- `PATCH /api/admin/users/[id]` - Update user roles
- `DELETE /api/admin/users/[id]` - Delete users

Create a data table using TanStack React Table showing email, name, role with inline editing. Add role change dropdowns and delete buttons.

---

## Phase 3: AI Report Generation System

### Step 11: Set Up OpenAI Integration
Install the OpenAI SDK (`openai@6.8.1`). Create `lib/openai.ts` with a configured client using your API key. You'll use GPT-4o with the newer Responses API that supports web search.

### Step 12: Build Report Generation Prompt
This is the heart of your AI system. Create a complex prompt that:
1. Instructs GPT-4o to conduct **50+ web searches** before writing
2. Structures reports into 9 sections in Korean:
   - 기업 개요 (Company Overview)
   - 제품/서비스 (Products/Services)
   - 고객군 및 수익모델 (Customer & Revenue)
   - 최근 5년간 투자 및 기업가치 (Investment History)
   - 매출 실적 (Revenue Performance)
   - AI/기술 차별화 (Tech Differentiation)
   - 핵심 경쟁력 (Core Competencies)
   - 최근 전략 움직임 (Recent Strategy)
   - 주요 경쟁사 (Competitors)
3. Outputs 3,000+ characters in markdown format
4. Uses any provided markdown notes as additional context

### Step 13: Create Report Generation API
Build `POST /api/admin/reports/generate` (admin-only). This route:
1. Accepts companyName, ceoName, sector, and optional markdownNotes
2. Calls OpenAI with the prompt and web_search tool enabled
3. Waits for the AI to complete (can take 60+ seconds due to searches)
4. Parses the markdown response
5. Creates Report and ReportMetadata records in the database
6. Generates a slug from the company name
7. Returns the report data

Add proper error handling for API failures and timeouts.

### Step 14: Build Report Management UI
Create pages at `app/(dashboard)/reports/`:
- **List page**: Display all reports in a table with filters (status, category, author)
- **Create page**: Form for manual report creation
- **Edit page**: Markdown editor for modifying reports
- **Generation page**: Form to trigger AI generation with loading states

Use React Hook Form for all forms with Zod validation.

---

## Phase 4: Company Profile System

### Step 15: Build Markdown Section Parser
Create `lib/markdown-parser.ts` with logic to split markdown reports into sections. Use regex to detect Korean section headers (## 1. 기업 개요, ## 2. 제품/서비스, etc.). Map these to English keys like "overview", "products", "customers" for routing.

### Step 16: Create Dynamic Company Pages
Build `app/company/[companyName]/page.tsx` using Next.js dynamic routes. This page:
1. Fetches all reports for the company name from the database
2. Aggregates metadata (sectors, location, CEO) across reports
3. Parses all report content into sections
4. Displays a sidebar with section navigation
5. Shows the selected section's content from the latest report

Create `components/company/CompanyPageLayout.tsx` for the layout with a sticky sidebar.

### Step 17: Build Section Navigation
Create `components/company/SidebarNav.tsx` with links to 9 report sections plus meeting notes. Use `lucide-react` icons for each section (Building2, Package, Users, TrendingUp, DollarSign, Cpu, Target, Briefcase, Users2). Highlight the active section with indigo styling.

### Step 18: Implement Section Display
Create section components that render markdown content. Install `react-markdown` with `remark-gfm` for GitHub-flavored markdown support (tables, task lists). Style the markdown with Tailwind prose classes. Handle empty sections gracefully with "No data" messages.

---

## Phase 5: Meeting Notes with File Upload

### Step 19: Set Up Supabase Storage
Create a Supabase account and set up a storage bucket called `meeting-notes`. Make it publicly accessible (no RLS policies needed for simplicity). Get your Supabase URL and anon key. Install `@supabase/supabase-js`.

### Step 20: Build Storage Utility
Create `lib/supabase-storage.ts` with functions:
- **uploadMeetingNoteAttachment**: Uploads files to `{companyName}/{noteId}/{filename}`, handles Korean characters, returns public URL
- **deleteMeetingNoteAttachment**: Removes files from storage
- **listMeetingNoteAttachments**: Lists files for a note

Implement filename sanitization (replace spaces with underscores, handle special characters) and timestamp-based uniqueness to prevent conflicts.

### Step 21: Create Meeting Notes API
Build `app/api/company/[companyName]/meeting-notes/route.ts` with three endpoints:

**GET**: Fetch all meeting notes for a company (any authenticated user)

**POST** (admin-only): Create a note with file uploads. Process:
1. Parse multipart/form-data request
2. Validate files (50MB max per file, 10 files max, check MIME types)
3. Create database record first (to get noteId)
4. Upload files to Supabase Storage
5. Create MeetingNoteAttachment records
6. Return the complete note with attachment URLs

**DELETE** (admin-only): Delete note and all associated files from storage.

Use Next.js's built-in FormData handling.

### Step 22: Build Meeting Notes UI
Create `components/company/sections/MeetingNotesSection.tsx` to display notes in cards with:
- Title and creation date
- Content preview
- Attachment list with download links (icons based on file type)
- Delete button (admin-only)

Create `components/company/meeting-notes/AddMeetingNoteDialog.tsx` with:
- Dialog form using shadcn/ui Dialog component
- Text inputs for title and content
- File input supporting multiple files
- File list preview with size display
- Upload progress handling
- Success/error toasts

---

## Phase 6: Airtable-like Company Tables

### Step 23: Design Table Column System
Create `lib/company-table-types.ts` with TypeScript types for:
- **ColumnTypes**: TEXT, NUMBER, DATE, URL, SELECT, MULTISELECT, CHECKBOX
- **ColumnConfig**: type, name, format options (date format, number decimals, select options)
- **TableView**: column order, hidden columns, widths, sort config, filters

This gives you a flexible, Airtable-like system where each table can have custom columns.

### Step 24: Build Table CRUD APIs
Create API routes in `app/api/companies/`:
- **GET/POST /api/companies**: List/create tables
- **PATCH/DELETE /api/companies/[tableId]**: Update/delete tables
- **GET/POST /api/companies/[tableId]/rows**: List/create rows
- **PATCH/DELETE /api/companies/[tableId]/rows/[rowId]**: Update/delete rows
- **POST /api/companies/[tableId]/rows/bulk-update**: Batch updates

Store row data as JSON in the `data` field (flexible schema based on column definitions).

### Step 25: Build Editable Grid Component
Create `components/company-table/AirtableGrid.tsx` using TanStack React Table. Implement:
- Dynamic column generation based on table config
- Cell renderers for each column type (text input, number input, date picker, select dropdown, checkbox)
- Inline editing with auto-save on blur
- Row reordering with drag handles
- Column resizing
- Search and filter UI

This is complex - use shadcn/ui's Table, Input, Select, Calendar components. Install `react-day-picker` for date selection.

### Step 26: Implement CSV Import
Create `POST /api/companies/import` to parse CSV files:
1. Accept file upload
2. Parse CSV using a library (or write custom parser)
3. Map CSV columns to table columns
4. Create rows in bulk
5. Return success/error counts

Add a file upload dialog in the UI with column mapping preview.

### Step 27: Build Table Views
Create view management UI allowing users to:
- Save custom views (column order, filters, sorting)
- Share views with team members
- Switch between views with a dropdown
- Set default view per table

Store view configs in the TableView model with JSON serialization.

---

## Phase 7: Dashboard & Analytics

### Step 28: Build Admin Dashboard
Create `app/(dashboard)/dashboard/page.tsx` with:
- **Statistics cards**: Total reports, users, API keys, published reports
- **Recent activity**: Latest reports created
- **Charts**: Reports by status (using Recharts pie chart), reports over time (line chart)

Fetch data from `GET /api/admin/stats` which aggregates counts from the database.

### Step 29: Add API Key Management
Create UI at `app/(dashboard)/admin/api-keys/page.tsx` for:
- Listing API keys with key identifiers (not full keys!)
- Creating new keys (show full key once, never again)
- Setting rate limits (requests per hour)
- Deleting keys

Hash keys with bcrypt before storing. Generate key identifiers (first 8 chars) for display. Implement key validation middleware for external API access.

---

## Phase 8: Advanced Features & Polish

### Step 30: Add Search Functionality
Implement full-text search:
- Create `GET /api/companies/search` using Prisma's `contains` filter
- Add search bar to company table list
- Highlight matching text in results
- Support searching by company name, CEO, sectors

### Step 31: Build User Profile Page
Create `app/(dashboard)/account/page.tsx` allowing users to:
- Update name and email
- Change password (validate old password, hash new one)
- View their role and permissions
- See API key count if admin

Add APIs at `GET/PATCH /api/user/profile` and `PATCH /api/user/password`.

### Step 32: Implement Report Categories
Add category management:
- Create category CRUD APIs
- Add category selector to report form
- Filter reports by category
- Display category badges on report cards

Categories help organize reports by investment stage, sector, or custom taxonomies.

### Step 33: Add Dark Mode
Implement theme switching:
- Use `next-themes` package
- Add theme toggle button to navigation
- Update Tailwind config with dark mode classes
- Ensure all components support dark mode

Your current design already has dark mode color schemes defined in globals.css.

### Step 34: Build Navigation
Create `components/DashboardNav.tsx` with:
- Logo on the left
- Main navigation links (Dashboard, Reports, Companies, Admin)
- User menu dropdown on the right (Account, Logout)
- Role-based link visibility (hide Admin for non-admins)

Use shadcn/ui's NavigationMenu and DropdownMenu components.

---

## Phase 9: Testing & Security

### Step 35: Add Input Validation
Create Zod schemas for all API inputs:
- Email format validation
- Password strength (min 8 chars, uppercase, number)
- File size limits (50MB)
- Required fields
- Type checking (numbers, dates, URLs)

Validate on both client (React Hook Form) and server (API routes).

### Step 36: Implement Rate Limiting
Add rate limiting to API routes:
- Track requests per IP or API key
- Use in-memory cache or Redis
- Return 429 status when limit exceeded
- Implement per-user limits (stored in ApiKey table)

### Step 37: Add Error Handling
Implement comprehensive error handling:
- Try-catch blocks in all API routes
- Prisma error handling (unique constraints, foreign keys)
- OpenAI timeout handling
- File upload error handling (size, type, storage failures)
- User-friendly error messages (no stack traces to client)

### Step 38: Write E2E Tests
Set up Playwright and write tests for:
- Login/logout flow
- Report generation (mock OpenAI)
- Company table CRUD
- Meeting notes upload
- Role-based access control

Store tests in `tests/e2e/`.

---

## Phase 10: Deployment

### Step 39: Environment Configuration
Create `.env.example` documenting all required variables:
- DATABASE_URL (Supabase pooled)
- DIRECT_URL (Supabase direct)
- JWT_SECRET (generate with `openssl rand -base64 32`)
- OPENAI_API_KEY
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_APP_URL

Never commit `.env` to git.

### Step 40: Set Up Database Seeding
Create `prisma/seed.ts` to initialize:
- Admin user with hashed password
- Default categories
- Sample API key
- Example company table

Run with `npx prisma db seed` during first deployment.

### Step 41: Configure Vercel Deployment
Connect your GitHub repo to Vercel:
- Add environment variables in Vercel dashboard
- Configure build command: `npm run build`
- Set Node.js version to 18+
- Enable Vercel Speed Insights
- Set up preview deployments for PRs

Vercel automatically detects Next.js and configures routing.

### Step 42: Set Up Supabase Production
In Supabase dashboard:
- Create production database (upgrade from free if needed)
- Run migrations: `npx prisma migrate deploy`
- Create storage bucket with public access
- Configure CORS for your domain
- Set up database backups

### Step 43: Monitor & Optimize
After deployment:
- Add Vercel Analytics to track page views
- Monitor API latency in Vercel dashboard
- Check OpenAI usage in OpenAI dashboard
- Set up error tracking (Sentry or similar)
- Monitor database query performance (Prisma Pulse)
- Optimize images (use next/image)

---

## Key Design Decisions Explained

**Why App Router?** Server Components reduce bundle size and improve SEO. You're rendering company pages that benefit from server-side data fetching.

**Why Prisma?** Type-safe queries, automatic migrations, great TypeScript support. The schema is your single source of truth.

**Why JWT in httpOnly cookies?** More secure than localStorage (XSS immune), works with Server Components, easy to validate in middleware.

**Why Supabase?** Great free tier, managed Postgres + storage, no infrastructure setup. Easy to scale.

**Why JSON columns for table data?** Allows flexible schema per table (like Airtable). You don't need a rigid structure for every company table.

**Why separate ReportMetadata?** Keeps Report table clean and allows efficient queries on metadata without loading full content.

**Why OpenAI Responses API?** Built-in web search tool eliminates need for external search APIs. GPT-4o gives best quality reports.

**Why role-based permissions?** Enterprises need granular access control. Four roles balance flexibility and simplicity.

---

## Technology Stack Summary

### Frontend
- **Framework:** Next.js 13.5.1 (App Router, React Server Components)
- **Language:** TypeScript 5.2.2
- **UI Library:** React 18.2.0
- **Styling:** Tailwind CSS 3.3.3 + shadcn/ui components
- **Component Library:** Radix UI primitives (45+ components)
- **Icons:** Lucide React
- **Notifications:** Sonner (toast notifications)
- **State Management:** React hooks + Server Components
- **Forms:** React Hook Form + Zod validation
- **Tables:** TanStack React Table
- **Charts:** Recharts
- **Date Handling:** date-fns
- **Markdown:** react-markdown + remark-gfm

### Backend
- **Runtime:** Node.js (Next.js API Routes)
- **Framework:** Next.js API Routes (App Router)
- **Language:** TypeScript
- **Authentication:** JWT (jose library) + bcryptjs
- **ORM:** Prisma 6.19.0
- **Database:** PostgreSQL (Supabase)
- **File Storage:** Supabase Storage
- **AI Integration:** OpenAI GPT-4o (with web search via Responses API)

### Database Models
- **User** - Authentication and RBAC (ADMIN, EDITOR, ANALYST, VIEWER)
- **Report** - AI-generated company research
- **ReportMetadata** - Company details (CEO, sectors, funding, etc.)
- **ReportAttachment** - PDF uploads (currently disabled)
- **ApiKey** - External API access with rate limiting
- **CompanyTable** - Airtable-like tables
- **CompanyRow** - Flexible JSON data storage
- **TableView** - Custom view configurations
- **AnalysisCategory** - Report categorization
- **CompanyMeetingNote** - Meeting notes
- **MeetingNoteAttachment** - File attachments

### Infrastructure
- **Hosting:** Vercel
- **File Storage:** Supabase Storage (meeting-notes bucket)
- **Analytics:** Vercel Speed Insights
- **Testing:** Playwright (E2E tests)

---

## API Routes (23 Total)

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/register` - User registration

### Admin
- `GET/POST /api/admin/users` - User management
- `GET/PATCH/DELETE /api/admin/users/[id]` - User CRUD
- `GET/POST /api/admin/api-keys` - API key management
- `DELETE /api/admin/api-keys/[id]` - API key deletion
- `POST /api/admin/reports/generate` - AI report generation
- `GET /api/admin/stats` - Dashboard statistics

### Reports
- `GET/POST /api/reports` - Report list/creation
- `GET/PATCH/DELETE /api/reports/[slug]` - Report CRUD
- `GET /api/reports/[slug]/content` - Report content

### Companies
- `GET/POST /api/companies` - Company table list/creation
- `GET/PATCH/DELETE /api/companies/[tableId]` - Table CRUD
- `GET/POST /api/companies/[tableId]/rows` - Row management
- `PATCH/DELETE /api/companies/[tableId]/rows/[rowId]` - Row CRUD
- `POST /api/companies/[tableId]/rows/bulk-update` - Bulk updates
- `GET /api/companies/search` - Company search
- `POST /api/companies/import` - CSV import
- `GET /api/companies/reports/by-name` - Get reports by company name

### Company-Specific
- `GET/POST/DELETE /api/company/[companyName]/meeting-notes` - Meeting notes CRUD

### User
- `GET/PATCH /api/user/profile` - User profile
- `PATCH /api/user/password` - Password change

---

## Project Structure

```
C:/dev/projects/researchweb/
├── app/                          # Next.js 13+ App Router
│   ├── (dashboard)/              # Authenticated dashboard routes
│   │   ├── account/              # User account settings
│   │   ├── admin/                # Admin-only pages (users, API keys)
│   │   ├── analysis/             # Analysis tools
│   │   ├── companies/            # Company table management
│   │   ├── dashboard/            # Admin dashboard
│   │   └── reports/              # Report management
│   ├── api/                      # API routes (23 total)
│   ├── company/[companyName]/    # Public company pages
│   ├── home/                     # Homepage
│   ├── login/                    # Login page
│   ├── register/                 # Registration page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── analysis/                 # Analysis-related components
│   ├── companies/                # Company list components
│   ├── company/                  # Company detail page components
│   ├── company-table/            # Airtable-like grid components
│   ├── reports/                  # Report management UI
│   └── ui/                       # Shadcn/ui components (45+)
├── lib/                          # Utility libraries
│   ├── api/                      # API helpers
│   ├── auth/                     # Authentication utilities
│   ├── prisma.ts                 # Prisma client singleton
│   ├── openai.ts                 # OpenAI integration
│   ├── supabase-storage.ts       # Supabase file storage
│   ├── permissions.ts            # RBAC permissions
│   ├── markdown-parser.ts        # Markdown section parser
│   └── company-table-types.ts    # Company table type definitions
├── hooks/                        # React hooks
├── contexts/                     # React contexts
├── prisma/                       # Database schema & migrations
│   ├── schema.prisma             # Database models
│   ├── migrations/               # Migration files
│   └── seed.ts                   # Database seeding
├── scripts/                      # Utility scripts
├── public/                       # Static assets
├── types/                        # TypeScript types
└── tests/                        # E2E tests (Playwright)
```

---

## Current State & Active Issues

Based on the git status, the project is currently working on:
- Meeting notes API fixes (route.ts modified)
- Meeting notes UI refinements (AddMeetingNoteDialog, MeetingNotesSection)
- Supabase storage integration (lib/supabase-storage.ts)
- Supabase RLS (Row Level Security) configuration

### Debugging/Fix Documentation Files
- `DEBUG_MEETING_NOTES.md`
- `FIX_SUPABASE_RLS.md`
- `MEETING_NOTES_FIX_SUMMARY.md`
- `SUPABASE_BUCKET_SETUP.md`

### Testing Scripts
- `scripts/test-supabase-bucket.ts`
- `scripts/test-supabase-upload.ts`
- `scripts/fix-supabase-rls.sql`

Recent commits show ongoing iterations on Prisma and other fixes, which is normal for a complex project.

---

## Security Features

- JWT with httpOnly cookies
- bcrypt password hashing (12 rounds)
- Role-based access control (RBAC)
- API rate limiting (API keys)
- Input validation (Zod schemas)
- SQL injection protection (Prisma)
- CSRF protection (SameSite cookies)
- Environment variable management

---

## Development Commands

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Push schema changes without migrations
npx prisma db push

# Seed database
npx prisma db seed

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Upload reports (custom script)
npm run upload-reports

# Run E2E tests
npm run test:e2e
```

---

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://..." # Pooled (port 6543)
DIRECT_URL="postgresql://..."   # Direct (port 5432)

# Authentication
JWT_SECRET="your-secret-key-here"

# Admin User
ADMIN_EMAIL="admin@researchweb.com"
ADMIN_PASSWORD="Admin123!"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# OpenAI API
OPENAI_API_KEY="sk-proj-..."

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
```

---

## Key Features Summary

1. **Authentication & Authorization (RBAC)** - JWT-based with 4 role levels
2. **AI-Powered Report Generation** - OpenAI GPT-4o with web search (50+ searches per report)
3. **Company Profile Pages** - Dynamic routes aggregating data from multiple reports
4. **Meeting Notes Management** - File attachments via Supabase Storage
5. **Company Table System** - Airtable-like flexible tables with custom columns
6. **Report Management** - CRUD operations with status workflow
7. **Admin Dashboard** - Real-time statistics and user management
8. **API Key Management** - External API access with rate limiting

---

This document serves as a complete reference for building the Insight Equity Alpha platform from scratch. Follow the phases sequentially for best results.
