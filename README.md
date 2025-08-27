# Job Board Platform

A modern, full-featured job board application built with React and TypeScript. This platform connects job seekers with employers through an intuitive interface for posting, browsing, and applying to job opportunities.

## ✨ Features

### For Job Seekers
- Browse and search job listings
- View detailed job descriptions and requirements
- Apply to jobs with cover letters and resume uploads
- Track application status in personal dashboard
- Responsive design for mobile and desktop

### For Employers/Admins
- Post and manage job listings
- Review and manage job applications
- Update application statuses (pending, approved, rejected)
- Add administrative notes to applications
- Comprehensive admin dashboard

### General Features
- User authentication and authorization
- Real-time data with Supabase backend
- Clean, modern UI with dark/light mode support
- SEO-optimized pages
- Secure data handling with Row Level Security

## 🚀 Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **Routing**: React Router DOM
- **State Management**: React Query
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-board-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials in the `.env` file.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── jobs/           # Job-related components
│   ├── layout/         # Layout components (Header, Footer)
│   └── ui/             # Base UI components (shadcn/ui)
├── contexts/           # React contexts (Auth, etc.)
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
├── lib/                # Utility functions
├── pages/              # Page components
└── assets/             # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Platforms
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed description
3. Include steps to reproduce the problem

---

Built with ❤️ using modern web technologies