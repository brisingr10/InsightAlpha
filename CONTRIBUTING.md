# Contributing to Insight Equity Alpha

Thank you for your interest in contributing to Insight Equity Alpha! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/InsightAlpha.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Set up your environment variables (see `.env.example`)
6. Generate Prisma client: `npx prisma generate`

## Development Workflow

### Making Changes

1. Make your changes in your feature branch
2. Follow the existing code style and conventions
3. Write or update tests as needed
4. Ensure the build passes: `npm run build`
5. Lint your code: `npm run lint`
6. Commit your changes with a clear message

### Commit Messages

Follow the conventional commits specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add company search functionality`

### Pull Request Process

1. Update the README.md if needed
2. Ensure all tests pass
3. Push your branch to your fork
4. Open a Pull Request against the `main` branch
5. Describe your changes clearly in the PR description
6. Wait for code review and address any feedback

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` when possible

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design

### API Routes

- Use proper HTTP status codes
- Include error handling
- Validate input data
- Return consistent response formats

## Database Changes

### Schema Updates

1. Modify `prisma/schema.prisma`
2. Generate migration: `npx prisma migrate dev --name your-migration-name`
3. Test the migration locally
4. Include migration files in your PR

### Best Practices

- Always use Prisma for database queries
- Use transactions for multi-step operations
- Add indexes for frequently queried fields
- Document complex queries

## Testing

Currently, the project focuses on build-time type checking and linting. When adding tests:

- Place unit tests next to the code they test
- Use descriptive test names
- Test edge cases and error scenarios

## Documentation

- Update README.md for user-facing changes
- Add inline comments for complex logic
- Update API documentation when adding/modifying endpoints
- Keep DEPLOYMENT.md current with infrastructure changes

## Role-Based Access Control

When adding features that involve RBAC:

1. Check permissions using the `rbac.ts` utilities
2. Implement proper authorization checks
3. Test with different user roles
4. Document permission requirements

## Security

- Never commit sensitive data or credentials
- Use environment variables for configuration
- Validate and sanitize user input
- Follow security best practices for authentication

## Questions?

If you have questions or need help:

- Open an issue for discussion
- Check existing issues and PRs
- Review the README.md and documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
