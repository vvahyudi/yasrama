# Yayasan Raden Rahmat Website

Website resmi Yayasan Raden Rahmat - Lembaga pendidikan Islam yang mengintegrasikan nilai-nilai Ahlussunnah wal Jama'ah An-Nahdliyah dengan kurikulum modern.

## 🌟 Features

### Public Website
- ✅ **Modern UI/UX** - Desain responsif dan menarik dengan animasi smooth
- ✅ **SEO Optimized** - Meta tags lengkap, sitemap, dan robots.txt
- ✅ **Accessibility** - WCAG compliant dengan skip links dan ARIA labels
- ✅ **Performance** - Image optimization dengan blur placeholders
- ✅ **Error Handling** - Error boundaries dan loading states
- ✅ **Smooth Navigation** - Page transitions dan smooth scroll

### Admin Dashboard
- ✅ **Authentication** - Secure JWT-based login system dengan bcrypt
- ✅ **Content Management** - Manage news, activities, and events
- ✅ **User Management** - Role-based access control (Admin, Editor, Viewer)
- ✅ **Clean Interface** - Dashboard tanpa header/footer untuk fokus optimal
- ✅ **Responsive** - Mobile-friendly admin panel dengan hamburger menu
- ✅ **Protected Routes** - Automatic authentication check & redirect

## 🚀 Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Package Manager:** pnpm

### Backend & Database
- **ORM:** Prisma 7
- **Database:** PostgreSQL (Prisma Data Proxy)
- **Authentication:** JWT + bcryptjs
- **API:** Next.js API Routes

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/vvahyudi/yasrama.git

# Navigate to directory
cd yasrama

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🏗️ Project Structure (SoC Architecture)

```
yasrama/
├── public/                      # Static assets
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # DB migrations
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (minimal)
│   │   │
│   │   ├── (public)/           # Public website route group
│   │   │   ├── layout.tsx      # With Header & Footer
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── kegiatan/       # Activities
│   │   │   ├── lembaga/        # Institutions (PAUD, SD)
│   │   │   ├── pendaftaran/    # Registration
│   │   │   └── profil/         # Profile & organization
│   │   │
│   │   ├── admin/              # Admin dashboard
│   │   │   ├── layout.tsx      # Clean (no header/footer)
│   │   │   ├── login/          # Login page
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   ├── news/           # News management
│   │   │   └── users/          # User management
│   │   │
│   │   └── api/                # API routes
│   │       └── auth/           # Authentication endpoints
│   │
│   ├── components/
### Public Website (with Header & Footer)
- **/** - Beranda
- **/profil** - Profil Yayasan
- **/profil/struktur-organisasi** - Struktur Organisasi
- **/lembaga/paud** - PAUD Raden Rahmat
- **/lembaga/sd** - SD Raden Rahmat
- **/pendaftaran** - Informasi Pendaftaran PPDB
- **/pendaftaran/brosur** - Brosur Pendaftaran
- **/kegiatan** - Kegiatan Yayasan

### Admin Dashboard (clean interface)
- **/admin/login** - Login page
- **/admin/dashboard** - Main dashboard dengan stats
- **/admin/news** - News management (CRUD)
- **/admin/users** - User management
- **/admin/activities** - Activities management (coming soon)Session management
│   │   └── utils.ts            # Helper functions
│   │
│   └── styles/                 # Global styles
│
└── Documentation
    ├── LAYOUT_ARCHITECTURE.md  # Layout SoC explanation
    ├── SOC_IMPLEMENTATION.md   # Implementation summary
    ├── DASHBOARD_SETUP.md      # Dashboard setup guide
    └── DASHBOARD_SUMMARY.md    # Dashboard features summary
```

## 🎨 Available Scripts

```bash
pnpm dev          # Start development server (Turbopack)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🌐 Pages

- **/** - Beranda
- **/profil** - Profil Yayasan
- **/profil/struktur-organisasi** - Struktur Organisasi
- **/lembaga/paud** - PAUD Raden Rahmat
- **/lembaga/sd** - SD Raden Rahmat
- **/pendaftara` dengan konfigurasi berikut:

```env
# Database (PostgreSQL via Prisma)
DATABASE_URL="your-database-connection-string"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yayasanradenrahmat.com
NODE_ENV=production
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Create admin user via Prisma Studio
npx prisma studio
```

Lihat [DASHBOARD_SETUP.md](DASHBOARD_SETUP.md) untuk setup guide lengkap.

### SEO Configuration

Edit metadata di [src/app/layout.tsx](src/app/layout.tsx) untuk informasi SEO global.  
Edit [src/app/(public)/layout.tsx](src/app/(public)/layout.tsx) untuk konfigurasi public pages
```env
NEXT_PUBLIC_SITE_URL=https://yayasanradenrahmat.com
# Add more env variables as needed
```

### SEO Configuration

Edit metadata di [src/app/layout.tsx](src/app/layout.tsx) untuk mengubah informasi SEO global.

## 📱 Responsive Design

Website ini fully responsive untuk semua device:
- 📱 Mobile (< 640px)
- 📱 Tablet (640px - 1024px)
- 🖥️ Desktop (> 1024px)

## ♿ Accessibility Features

- ✅ Skip to content link
- ✅ ARIA labels
- ✅ Semantic HTML
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

## 🚀 Performance Optimizations

- ✅ Image optimization with Next.js Image
- ✅ Blur placeholders for images
- ✅ Code splitting & lazy loading
- ✅ Route-based code splitting (public vs admin)
- ✅ CSS optimization with Tailwind
- ✅ Turbopack for faster development

## 🏛️ Architecture Highlights

### Separation of Concerns (SoC)
Website menggunakan route groups untuk memisahkan layout public dan admin:
- **Public routes** `(public)/` - Menggunakan Header & Footer
- **Admin routes** `admin/` - Clean interface tanpa Header/Footer

Lihat [LAYOUT_ARCHITECTURE.md](LAYOUT_ARCHITECTURE.md) untuk penjelasan lengkap.

### Authentication Flow
```
1. User visit /admin/dashboard
2. requireAuth() checks JWT cookie
3. If no valid token → Redirect to /admin/login
4. User enters credentials
5. API verifies with database
6. JWT token generated & set as httpOnly cookie
7. User redirected to dashboard
```

### Database Schema
6 main models:
- **User** - Authentication & authorization
- **News** - Berita dan pengumuman
- **Event** - Kegiatan dan acara
- **Activity** - Aktivitas sekolah
- **ContactInquiry** - Form kontak
- **Registration** - Data pendaftaran PPDB

## 📚 Documentation

- [LAYOUT_ARCHITECTURE.md](LAYOUT_ARCHITECTURE.md) - Layout SoC explanation
- [SOC_IMPLEMENTATION.md](SOC_IMPLEMENTATION.md) - Implementation summary
- [DASHBOARD_SETUP.md](DASHBOARD_SETUP.md) - Dashboard setup & API docs
- [DASHBOARD_SUMMARY.md](DASHBOARD_SUMMARY.md) - Dashboard features
- [IMPROVEMENTS.md](IMPROVEMENTS.md) - Roadmap & recommendations

## 📄 License

© 2025 Yayasan Raden Rahmat. All rights reserved.

## 👥 Author

**Ahmad Wahyudi**
- GitHub: [@vvahyudi](https://github.com/vvahyudi)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

Untuk informasi lebih lanjut:
- 🌐 Website: [yayasanradenrahmat.com](https://yayasanradenrahmat.com)
- 📧 Email: info@yayasanradenrahmat.com
- 📍 Alamat: Sumenep, Jawa Timur

---

Made with ❤️ for Yayasan Raden Rahmat

