# Deployment Guide - Insight Equity Alpha

This guide will walk you through deploying the Insight Equity Alpha platform to production.

## Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **Supabase Account** - Sign up at [supabase.com](https://supabase.com)
3. **OpenAI API Key** (optional) - For AI report generation

## Step 1: Set Up Supabase

1. Create a new project in Supabase
2. Navigate to Settings → API
3. Copy the following values:
   - Project URL (starts with https://)
   - anon/public key
   - service_role key

## Step 2: Configure Environment Variables

In your Vercel project settings, add the following environment variables:

```env
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

OPENAI_API_KEY=[your-openai-api-key]
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Step 3: Initialize Database

1. After deployment, run migrations:
```bash
npx prisma db push
```

2. (Optional) Seed initial data:
```bash
npx prisma db seed
```

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure environment variables
4. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Step 5: Post-Deployment Setup

1. **Create Admin User**
   - Sign up through the application
   - Manually update the user's role in Supabase:
   ```sql
   UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```

2. **Configure Supabase Auth**
   - Go to Authentication → Settings
   - Set Site URL to your Vercel URL
   - Add Redirect URLs:
     - `https://your-app.vercel.app/auth/callback`
     - `http://localhost:3000/auth/callback` (for development)

3. **Enable Row Level Security (RLS)**
   - Apply RLS policies to protect your data
   - Example policy:
   ```sql
   CREATE POLICY "Users can view all data"
   ON public.companies FOR SELECT
   TO authenticated
   USING (true);
   ```

## Environment-Specific Configuration

### Development
```bash
npm run dev
```

### Production Build Test
```bash
npm run build
npm start
```

## Monitoring and Maintenance

1. **Check Logs**: Use Vercel's dashboard to monitor application logs
2. **Database Monitoring**: Use Supabase's dashboard to monitor database performance
3. **Error Tracking**: Consider adding Sentry or similar service

## Troubleshooting

### Build Failures
- Ensure all environment variables are set
- Run `npx prisma generate` locally to verify schema
- Check build logs in Vercel dashboard

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check Supabase project is active
- Ensure database is accessible from Vercel's IP ranges

### Authentication Issues
- Verify Supabase URL and keys
- Check redirect URLs in Supabase settings
- Ensure cookies are enabled

## Security Checklist

- [ ] Environment variables are set as secrets in Vercel
- [ ] Row Level Security (RLS) is enabled on all tables
- [ ] Service role key is kept secure and not exposed to client
- [ ] HTTPS is enforced
- [ ] Authentication is required for protected routes
- [ ] CORS is properly configured

## Performance Optimization

1. **Enable Caching**
   - Configure appropriate cache headers
   - Use Vercel's Edge Network

2. **Database Optimization**
   - Add indexes to frequently queried fields
   - Use Prisma's query optimization features

3. **Image Optimization**
   - Use Next.js Image component
   - Configure image domains in next.config.js

## Scaling Considerations

- **Database**: Upgrade Supabase plan as needed
- **API Rate Limits**: Monitor and adjust API quotas
- **File Storage**: Configure Supabase Storage for attachments
- **CDN**: Leverage Vercel's global CDN

## Support

For issues or questions:
- Check the [README.md](README.md) for general documentation
- Review Prisma schema in `prisma/schema.prisma`
- Contact support or file an issue on GitHub
