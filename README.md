# TilesPro - Premium Tiles E-Commerce Platform

A modern, professional Next.js application for selling premium tiles with advanced filtering, user authentication, and admin features.

## Features

✨ **User Authentication**
- Sign up and login with email/password
- JWT-based session management
- Protected routes for authenticated users

🏠 **Tile Catalog**
- Browse all tiles in a responsive grid
- Filter by tile type (General, Bathroom, Kitchen, Outdoors)
- Filter by color and dimensions
- Real-time filtering with URL parameters
- Detailed tile information pages

❤️ **Like System**
- Save favorite tiles for later
- View liked tiles (requires login)
- Persistent like storage

📧 **Contact & Support**
- Q&A page with FAQs
- Contact form for customer inquiries
- Email notifications via SendGrid
- Rate limiting for spam protection

🎨 **Professional Design**
- Tailwind CSS styling
- Responsive mobile-first design
- Gradient accents and smooth animations
- Clean, modern UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js 5
- **Database**: PostgreSQL + Prisma ORM
- **Email**: SendGrid API
- **Security**: bcryptjs for password hashing

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud-based)
- SendGrid account (optional, for email notifications)

### Environment Setup

1. **Clone and install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Configure database:**
   - Create a PostgreSQL database (e.g., `tiles_db`)
   - Update `.env.local` with your database URL:
     ```
     DATABASE_URL="postgresql://user:password@localhost:5432/tiles_db"
     ```

3. **Generate NextAuth secret:**
   ```bash
   openssl rand -base64 32
   ```
   - Add the generated value to `.env.local`:
     ```
     NEXTAUTH_SECRET="your-generated-secret"
     ```

4. **Setup SendGrid (Optional):**
   - Get your API key from [SendGrid](https://sendgrid.com)
   - Add to `.env.local`:
     ```
     SENDGRID_API_KEY="your-sendgrid-api-key"
     ```

### Database Setup

1. **Push schema to database:**
   ```bash
   npm run db:push
   ```

2. **Seed database with sample data:**
   ```bash
   npm run db:seed
   ```

   This creates:
   - Demo user (email: `demo@example.com`, password: `password123`)
   - 18 sample tiles across all categories
   - Sample likes

### Running the Application

**Development:**
```bash
npm run dev
```
Visit http://localhost:3000 to see the app.

**Production build:**
```bash
npm run build
npm run start
```

## Project Structure

```
tiles-business/
├── app/
│   ├── layout.tsx                 - Root layout
│   ├── page.tsx                   - Homepage
│   ├── tiles/                     - Tile catalog
│   ├── qa/                        - Q&A and contact
│   ├── auth/                      - Authentication pages
│   └── api/                       - API routes
├── components/                    - Reusable React components
├── lib/                           - Utilities (auth, database)
├── prisma/                        - Database schema and seed
└── public/                        - Static assets
```

## API Endpoints

### Tiles
- `GET /api/tiles` - Get all tiles with optional filters
  - Query params: `type`, `color`, `dimensions`
- `GET /api/tiles/[id]` - Get specific tile details

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/[...nextauth]` - NextAuth routes

### Interactions
- `POST /api/likes` - Like a tile (requires auth)
- `DELETE /api/likes` - Unlike a tile (requires auth)

### Contact
- `POST /api/contact` - Submit contact form

## Demo Credentials

Once seeded, you can login with:
- **Email**: demo@example.com
- **Password**: password123

## Customization

### Adding New Tiles
Edit `prisma/seed.ts` to add more tile data, then run:
```bash
npm run db:seed
```

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Component-specific classes in individual component files

### Colors
The app uses a purple-to-pink gradient theme. To change:
1. Update Tailwind classes in components
2. Modify `globals.css` gradient definitions
3. Update `tailwind.config.ts` color palette

## Security Considerations

- Passwords are hashed using bcryptjs
- Session tokens are JWT-based and time-limited
- Database queries use Prisma parameterized statements
- Contact form includes rate limiting
- SendGrid credentials stored in environment variables

## Future Enhancements

- Shopping cart functionality
- Order management system
- Payment integration (Stripe/PayPal)
- Admin dashboard
- Image optimization and CDN integration
- Advanced search with Elasticsearch
- User reviews and ratings
- Inventory management
- Email notifications for order updates

## License

Private project for TilesPro Business

## Support

For questions or issues, contact: support@tilespro.com

---

Built with ❤️ using Next.js and Tailwind CSS
