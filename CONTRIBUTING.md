# Contributing to Hello Platform

Thank you for your interest in contributing to the Hello Platform! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/hello.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit your changes: `git commit -m "Add your feature"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

### Prerequisites
- Node.js 18 or higher
- MongoDB 6 or higher
- Docker (optional, for containerized development)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your local settings

4. Start MongoDB

5. Run the development server:
```bash
npm run dev
```

### Using Docker

```bash
docker-compose up
```

## Project Structure

```
hello/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Business logic
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── public/             # Frontend files
└── tests/              # Test files (to be added)
```

## Code Style

### JavaScript
- Use ES6+ features
- Use async/await for asynchronous code
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic

### Naming Conventions
- Files: camelCase (e.g., `userController.js`)
- Classes: PascalCase (e.g., `User`)
- Variables/Functions: camelCase (e.g., `getUserData`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)

## Making Changes

### Adding New Features

1. **Models**: Create or update models in `src/models/`
2. **Controllers**: Add business logic in `src/controllers/`
3. **Routes**: Define endpoints in `src/routes/`
4. **Middleware**: Add reusable logic in `src/middleware/`
5. **Frontend**: Update UI in `public/`

### Database Changes

If you modify schemas:
1. Update the model file
2. Consider migration impact
3. Document breaking changes
4. Update API documentation

### API Changes

When modifying APIs:
1. Maintain backward compatibility when possible
2. Update `API.md` documentation
3. Update frontend if needed
4. Test all affected endpoints

## Testing

Currently, the project uses manual testing. Future contributions should include:

### Test Structure (To Be Implemented)
```bash
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
└── e2e/           # End-to-end tests
```

### Running Tests
```bash
npm test
```

## Gamification System

When adding new features that award points or badges:

1. Update `src/middleware/gamification.js`
2. Document point values in `API.md`
3. Update badge list if adding new badges
4. Consider level progression impact

### Point Guidelines
- Small actions (likes, comments): 2-5 points
- Medium actions (posts, joins): 5-20 points
- Large actions (creations): 20-100 points

## Commit Messages

Use clear, descriptive commit messages:

- `feat: Add leaderboard sorting`
- `fix: Resolve authentication bug`
- `docs: Update API documentation`
- `style: Format code`
- `refactor: Improve gamification logic`
- `test: Add user registration tests`
- `chore: Update dependencies`

## Pull Request Process

1. **Update Documentation**: Ensure README, API.md, and USAGE_GUIDE.md are updated
2. **Test Thoroughly**: Test your changes in different scenarios
3. **Clean Code**: Remove console.logs and debug code
4. **Small PRs**: Keep pull requests focused and manageable
5. **Description**: Clearly describe what changes you made and why

### PR Checklist
- [ ] Code follows the project style
- [ ] Documentation is updated
- [ ] Changes are tested
- [ ] Commit messages are clear
- [ ] No breaking changes (or documented if necessary)
- [ ] API.md is updated for API changes
- [ ] USAGE_GUIDE.md is updated for user-facing changes

## Feature Requests

Have an idea? We'd love to hear it!

1. Check existing issues first
2. Create a new issue with the "enhancement" label
3. Describe the feature and use case
4. Discuss with maintainers before implementing

## Bug Reports

Found a bug? Help us fix it!

1. Check if it's already reported
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots if applicable

## Security Issues

**DO NOT** create public issues for security vulnerabilities.

Instead, please email security details privately to the maintainers.

## Areas for Contribution

### High Priority
- [ ] Add automated tests (unit, integration, e2e)
- [ ] Implement WebSocket for real-time updates
- [ ] Add profile customization
- [ ] Implement notifications system
- [ ] Add search functionality

### Medium Priority
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Rate limiting middleware
- [ ] Image upload support
- [ ] Advanced leaderboard filtering

### Nice to Have
- [ ] Dark mode
- [ ] Social media integration
- [ ] Activity feed
- [ ] Advanced analytics
- [ ] Mobile app

## Code Review

All contributions go through code review:

1. Maintainers review for:
   - Code quality
   - Security concerns
   - Performance implications
   - Documentation completeness

2. Address feedback promptly
3. Keep discussions respectful and constructive

## Questions?

- Open an issue for general questions
- Check existing documentation first
- Join community discussions

## License

By contributing, you agree that your contributions will be licensed under the project's ISC License.

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Special mentions for major features

Thank you for making Hello Platform better! 🎉
