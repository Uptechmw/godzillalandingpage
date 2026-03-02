# 🦖 Godzilla AI - Unified Application

Production-ready Next.js application with complete authentication system.

## 🎯 Features

- ✅ **Complete Auth System** - Register, login, email verification
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Email Verification** - OTP-based email verification
- ✅ **PostgreSQL Database** - Prisma ORM with type safety
- ✅ **Secure Password Hashing** - bcrypt with cost factor 12
- ✅ **Type-Safe API** - TypeScript throughout
- ✅ **Production Ready** - Error handling, validation, security
- ✅ **No CORS Issues** - Unified architecture

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Initialize database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
web/
├── app/
│   ├── api/auth/          # Authentication API routes
│   │   ├── register/
│   │   ├── login/
│   │   ├── me/
│   │   ├── verify-otp/
│   │   └── resend-otp/
│   ├── (auth)/            # Auth pages
│   ├── dashboard/         # Protected pages
│   └── layout.tsx
├── lib/
│   ├── db.ts              # Prisma client
│   ├── auth.ts            # JWT utilities
│   ├── hash.ts            # Password hashing
│   ├── email.ts           # Email service
│   ├── validation.ts      # Zod schemas
│   └── api-client.ts      # API client
├── middleware.ts          # Route protection
├── prisma/
│   └── schema.prisma      # Database schema
└── .env.local             # Environment variables
```

## 🔐 API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | No | Create account |
| `/api/auth/login` | POST | No | Login user |
| `/api/auth/verify-otp` | POST | No | Verify email |
| `/api/auth/resend-otp` | POST | No | Resend OTP |
| `/api/auth/me` | GET | Yes | Get profile |

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Validation:** Zod
- **Email:** Resend / SendGrid
- **Styling:** Tailwind CSS

## 📚 Documentation

- [Quick Start Guide](../QUICK_START.md)
- [Implementation Summary](../IMPLEMENTATION_SUMMARY.md)
- [Deployment Guide](../DEPLOYMENT_GUIDE.md)
- [API Testing Guide](../API_TESTING.md)
- [Desktop App Integration](../DESKTOP_APP_INTEGRATION.md)

## 🔒 Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# JWT
JWT_SECRET="your-secret-min-32-chars"
JWT_EXPIRES_IN="7d"

# Email
EMAIL_PROVIDER="resend"
RESEND_API_KEY="re_xxxxx"
EMAIL_FROM="noreply@yourdomain.com"

# App
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
COIN_SIGNUP_BONUS="20"
```

## 🧪 Testing

```bash
# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test protected route
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Setup

1. Add environment variables in Vercel dashboard
2. Connect PostgreSQL database
3. Run migrations: `npx prisma migrate deploy`

See [Deployment Guide](../DEPLOYMENT_GUIDE.md) for details.

## 📊 Database Schema

- **User** - User accounts with email verification
- **TokenBalance** - Godzilla Coins balance
- **Transaction** - Coin transaction history
- **Preferences** - User settings
- **EmailVerification** - OTP verification codes

## 🔐 Security Features

- Password hashing with bcrypt (cost 12)
- JWT token authentication
- Email verification required
- Input validation with Zod
- SQL injection prevention (Prisma)
- XSS protection (Next.js)
- CSRF protection (SameSite cookies)
- Secure error handling

## 🎨 Frontend Integration

```typescript
import { login, getCurrentUser } from '@/lib/api-client';

// Login
const { token, user } = await login({
  email: 'user@example.com',
  password: 'password123',
});

// Get profile
const { user } = await getCurrentUser(token);
```

## 🖥️ Desktop App Integration

```typescript
import { apiClient } from './lib/api-client';

// Login from Electron app
const response = await apiClient.login(email, password);

// Store token securely
await SecureTokenStorage.setToken(response.token);
```

See [Desktop App Integration](../DESKTOP_APP_INTEGRATION.md) for complete guide.

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma Client
npm run db:studio    # Open Prisma Studio
npm run db:push      # Push schema to database
```

## 🐛 Troubleshooting

### Prisma Client not found
```bash
npx prisma generate
```

### Database connection fails
- Check DATABASE_URL format
- Verify database is running
- Check connection pooling

### Email not sending
- Verify API key is correct
- Check email provider logs
- Ensure EMAIL_FROM domain is verified

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file

## 🙏 Support

- Documentation: See `/docs` folder
- Issues: GitHub Issues
- Email: support@godzilla.ai

---

Built with ❤️ by the Godzilla AI Team
