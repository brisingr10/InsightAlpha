# InsightAlpha

**Insight Equity Alpha** - AI-Powered Venture Capital Research Platform

A full-stack web application designed for VC analysts to research startups, generate AI-powered reports, manage company data, and organize meeting notes with file attachments.

## 🚀 Features

- **Startup Research**: Comprehensive company profiles with industry insights and funding data
- **AI Report Generation**: Automatically generate detailed research reports using AI
- **Airtable-Style Tables**: Manage company data with sorting, filtering, and inline editing
- **Meeting Notes**: Track discussions with file attachments (pitch decks, financials, etc.)
- **Role-Based Access Control**: Four permission levels (Viewer, Analyst, Manager, Admin)
- **Secure Authentication**: Built on Supabase Auth

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel-ready

## 📋 User Roles & Permissions

### Viewer
- Read-only access to all data
- View companies, reports, and meeting notes

### Analyst
- All Viewer permissions
- Create and generate AI-powered reports

### Manager
- All Analyst permissions
- Edit and manage company data
- Create and edit meeting notes
- Manage file attachments

### Admin
- Full system access
- User management
- Role assignment
- System configuration

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── companies/    # Company CRUD operations
│   │   ├── reports/      # Report management & AI generation
│   │   └── meetings/     # Meeting notes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Main dashboard
│   ├── companies/        # Company management UI
│   ├── reports/          # Research reports UI
│   └── meetings/         # Meeting notes UI
├── components/           # Reusable React components
├── lib/
│   ├── prisma.ts        # Prisma client
│   ├── rbac.ts          # Role-based access control
│   ├── utils.ts         # Utility functions
│   └── supabase/        # Supabase client setup
└── prisma/
    └── schema.prisma    # Database schema
```

## 🗄️ Database Schema

### Key Models

- **User**: Authentication and role management
- **Company**: Startup information and metadata
- **Report**: Research reports (manual and AI-generated)
- **MeetingNote**: Meeting documentation
- **Attachment**: File attachments for meetings

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Supabase account)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/brisingr10/InsightAlpha.git
cd InsightAlpha
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
DATABASE_URL="your-postgres-url"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
OPENAI_API_KEY="your-openai-api-key"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 🔧 Development

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

### Database Management
```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

## 📦 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/brisingr10/InsightAlpha)

## 🔐 Security Features

- Supabase authentication with email/password
- Role-based access control (RBAC)
- Server-side session management
- Protected API routes
- SQL injection prevention via Prisma

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- ORM by [Prisma](https://www.prisma.io/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
