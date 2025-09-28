# CatalogCraft 🚀

> **Modern Enterprise Application Catalog** - A full-stack web application for discovering, managing, and requesting access to enterprise applications.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-green.svg)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-blue.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Environment Setup](#-environment-setup)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

CatalogCraft is an enterprise-grade application catalog system that enables organizations to:
- **Discover** internal applications through an intuitive interface
- **Manage** application access requests and approvals
- **Track** usage analytics and user engagement
- **Streamline** the application onboarding process

Inspired by the Apple App Store and Salesforce AppExchange, CatalogCraft brings consumer-grade user experience to enterprise application management.

## ✨ Features

### 🏠 **Dashboard**
- Personalized user dashboard with active applications
- Pending access requests overview
- Recommended applications based on department/role
- Usage statistics and analytics

### 🔍 **App Discovery**
- Advanced search with filters and categories
- Department-based recommendations
- Rating and review system
- Detailed application information pages

### 🔐 **Access Management**
- Multi-step access request workflow
- Justification-based approval process
- Status tracking (Pending, Approved, Denied)
- Automated notifications

### 🎨 **Modern UI/UX**
- Responsive design (mobile-first approach)
- Dark/Light theme support
- Accessibility-compliant components
- Smooth animations and transitions

### 🔧 **Enterprise Features**
- Role-based access control
- Department-specific catalogs
- Usage analytics and reporting
- Integration-ready architecture

## 🛠 Tech Stack

### **Frontend**
- **React 18** with TypeScript
- **Tailwind CSS** + **Radix UI** for styling
- **Framer Motion** for animations
- **TanStack Query** for data fetching
- **Wouter** for routing
- **Vite** for build tooling

### **Backend**
- **Express.js** with TypeScript
- **Drizzle ORM** with PostgreSQL
- **Neon Database** (serverless PostgreSQL)
- **WebSocket** support for real-time features
- **Session-based** authentication

### **Development Tools**
- **ESBuild** for fast compilation
- **PostCSS** + **Autoprefixer**
- **Drizzle Kit** for database migrations
- **TSX** for TypeScript execution

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **PostgreSQL** database (or Neon account)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhishek15112003/Catalog.git
   cd Catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your database credentials
   nano .env
   ```

4. **Database setup**
   ```bash
   # Push database schema
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
CatalogCraft/
├── 📂 client/                 # React frontend application
│   ├── 📂 src/
│   │   ├── 📂 components/     # React components
│   │   │   ├── 📂 ui/         # shadcn/ui components
│   │   │   └── 📂 examples/   # Example components
│   │   ├── 📂 hooks/          # Custom React hooks
│   │   ├── 📂 lib/            # Utilities and types
│   │   └── 📂 pages/          # Page components
│   └── index.html
├── 📂 server/                 # Express.js backend
│   ├── index.ts              # Server entry point
│   ├── routes.ts             # API routes
│   ├── db.ts                 # Database connection
│   └── vite.ts               # Vite integration
├── 📂 shared/                 # Shared TypeScript schemas
│   └── schema.ts             # Database schema
├── 📂 attached_assets/        # Design assets and images
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.ts        # Tailwind CSS config
├── drizzle.config.ts         # Database configuration
└── design_guidelines.md      # UI/UX design system
```

## 🔌 API Documentation

### Core Endpoints

```bash
# Authentication
POST   /api/auth/login         # User login
POST   /api/auth/logout        # User logout
GET    /api/auth/me            # Get current user

# Applications
GET    /api/apps               # List all applications
GET    /api/apps/:id           # Get application details
POST   /api/apps/:id/request   # Request app access

# Access Requests
GET    /api/requests           # User's access requests
POST   /api/requests           # Submit new request
PUT    /api/requests/:id       # Update request status
```

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

## 🌐 Environment Setup

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/catalogcraft"

# Session Configuration
SESSION_SECRET="your-super-secure-session-secret"

# Application Configuration
NODE_ENV="development"
PORT=5000

# Optional: Neon Database (for production)
NEON_DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/dbname"
```

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run check        # TypeScript type checking

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema changes to database
```

### Development Workflow

1. **Feature Development**
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature-name
   
   # Make changes and test
   npm run dev
   
   # Type check
   npm run check
   ```

2. **Database Changes**
   ```bash
   # Modify schema in shared/schema.ts
   # Push changes to database
   npm run db:push
   ```

3. **Component Development**
   - Use existing components from `client/src/components/ui/`
   - Follow the design guidelines in `design_guidelines.md`
   - Ensure responsive design and accessibility

### Code Style

- **TypeScript** strict mode enabled
- **ESLint** configuration (recommended)
- **Prettier** for code formatting
- **Tailwind CSS** for styling (utility-first approach)

## 🚢 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Environment Variables (Production)

```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
SESSION_SECRET=your_production_session_secret
PORT=5000
```

### Deployment Platforms

**Recommended platforms:**
- **Vercel** (Full-stack deployment)
- **Railway** (with PostgreSQL)
- **Render** (Free tier available)
- **Heroku** (with Heroku Postgres)

### Docker Deployment (Coming Soon)

```dockerfile
# Dockerfile will be added in future releases
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Write TypeScript with strict typing
- Follow the existing code style and patterns
- Add tests for new features (when testing framework is added)
- Update documentation for significant changes
- Ensure responsive design compatibility

### Issue Reporting

Use the GitHub Issues tab to:
- Report bugs with detailed reproduction steps
- Request new features with clear use cases
- Ask questions about implementation
- Suggest improvements

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Apple App Store, Salesforce AppExchange, Okta Dashboard
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) component library
- **Icons**: [Lucide React](https://lucide.dev/) icon library
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) utility framework

## 📞 Support

For support and questions:
- 📧 **Email**: [Create an issue](https://github.com/Abhishek15112003/Catalog/issues)
- 💬 **Discussions**: Use GitHub Discussions for community help
- 📖 **Documentation**: Check the `design_guidelines.md` for UI/UX specifications

---

**⭐ If you find CatalogCraft helpful, please give it a star on GitHub!**

Made with ❤️ by the CatalogCraft team