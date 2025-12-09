# Click-n-Bite - Digital Restaurant Menu Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload%20CMS-3.42.0-blue?style=flat-square)](https://payloadcms.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, full-stack digital restaurant menu platform that enables restaurants to create QR code menus, manage content through a powerful CMS, and provide contactless ordering experiences. Built with Next.js 15, Payload CMS, and TypeScript.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
  - [Development](#development)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
  - [Multi-tenant Architecture](#multi-tenant-architecture)
  - [Digital Menu System](#digital-menu-system)
  - [Order Management](#order-management)
  - [QR Code Generation](#qr-code-generation)
  - [Admin Dashboard](#admin-dashboard)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## 🚀 Overview

Click-n-Bite is a comprehensive digital menu solution designed for modern restaurants. It provides:

- **QR Code Menus**: Generate and manage QR codes for contactless menu access
- **Content Management**: Powerful CMS for menu management with real-time updates
- **Digital Ordering**: Basket system with order sharing capabilities
- **Multi-tenant Support**: Host multiple restaurants on a single platform
- **Mobile-First Design**: Responsive interface optimized for all devices
- **Multi-language Support**: Internationalization for global restaurants

## ✨ Features

### For Restaurants

- 🍽️ **Digital Menu Creation**: Easy-to-use CMS for menu management
- 📱 **QR Code Generation**: Instant QR codes for table placement
- 🛒 **Digital Ordering**: Customer basket and order management
- 📊 **Real-time Updates**: Instant menu changes without downtime
- 🎨 **Custom Branding**: Personalized themes and styling
- 📈 **Analytics**: Order insights and customer behavior tracking

### For Customers

- 📱 **Mobile-Optimized**: Seamless experience on all devices
- 🛒 **Smart Basket**: Add items, manage quantities, add comments
- 📤 **Order Sharing**: Share orders via WhatsApp, email, or social media
- 🏷️ **Dietary Tags**: Filter by dietary preferences (vegetarian, vegan, gluten-free, etc.)
- 🔍 **Search & Filter**: Easy navigation through categories and subcategories
- 💳 **Contactless Payment**: Secure ordering without physical contact

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Zustand** - State management
- **TanStack Query** - Data fetching and caching

### Backend & CMS

- **Payload CMS 3.42** - Headless CMS with admin interface
- **PostgreSQL** - Primary database
- **Vercel Postgres** - Cloud database adapter
- **Vercel Blob Storage** - File storage solution
- **GraphQL** - API query language

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PNPM** - Package manager
- **Docker** - Database containerization

## 🏗️ Architecture

The application follows a modern full-stack architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (Payload CMS) │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   QR Codes      │    │   File Storage  │    │   Analytics     │
│   (Generated)   │    │   (Vercel Blob) │    │   (Real-time)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Multi-tenant Structure

- Each restaurant is a "tenant" with a unique slug
- Isolated data and configuration per tenant
- Shared infrastructure with tenant-specific routing

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.20.2 or >=20.9.0
- **PNPM** 9 or 10
- **Docker** (for local database)
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/click-n-bite.git
   cd click-n-bite
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

### Environment Setup

Create a `.env.local` file with the following variables:

```env
# Database
POSTGRES_URL=postgresql://postgres:mydbpassword@localhost:5432/bistro

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

#BACKEND API
NEXT_PUBLIC_BASE_URL=http://130.61.17.86:8080

# Vercel (for production)
VERCEL_PROJECT_PRODUCTION_URL=your-vercel-url
CRON_SECRET=your-cron-secret

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=+1234567890

# Restaurant Configuration
NEXT_PUBLIC_RESTAURANT_NAME=Click-n-Bite
```

### Database Setup

1. **Start the database container**

   ```bash
   ./start-database.sh
   ```

2. **Reset database (if needed)**

   ```bash
   pnpm run reset-db
   ```

### Development

1. **Start the development server**

   ```bash
   pnpm dev
   ```

2. **Access the application**
   - Frontend: <http://localhost:3000>
   - Admin Dashboard: <http://localhost:3000/admin>
   - Demo Menu: <http://localhost:3000/menu/demo>

3. **Available scripts**

   ```bash
   pnpm dev          # Start development server
   pnpm build        # Build for production
   pnpm start        # Start production server
   pnpm lint         # Run ESLint
   pnpm lint:fix     # Fix linting issues
   pnpm reset-db     # Reset database and restart
   ```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (frontend)/              # Customer-facing routes
│   │   ├── (landing)/           # Landing page
│   │   └── menu/                # Menu pages
│   └── (payload)/               # Admin and API routes
│       ├── admin/               # Payload admin interface
│       └── api/                 # API endpoints
├── components/                   # Reusable UI components
│   ├── common/                  # Shared components
│   ├── landing/                 # Landing page components
│   ├── ui/                      # Base UI components
│   └── payload/                 # Admin-specific components
├── features/                    # Feature-based modules
│   ├── basket/                  # Shopping basket functionality
│   ├── category/                # Menu categories
│   ├── contact/                 # Contact forms
│   ├── menu/                    # Menu display and management
│   ├── order/                   # Order processing
│   └── tenant/                  # Multi-tenant functionality
├── lib/                         # Utility libraries
│   ├── payload/                 # Payload CMS configuration
│   └── motion/                  # Animation configurations
├── data/                        # Static data and demos
├── constants/                   # Application constants
├── hooks/                       # Custom React hooks
├── providers/                   # Context providers
├── styles/                      # Global styles
└── utils/                       # Utility functions
```

## 🔑 Key Features

### Multi-tenant Architecture

Each restaurant operates as an independent tenant with:

- Unique URL slug (e.g., `/menu/restaurant-name`)
- Isolated menu data and categories
- Custom branding and configuration
- Separate admin access

### Digital Menu System

**Categories & Subcategories**

- Hierarchical menu organization
- Custom icons and colors
- Drag-and-drop ordering
- Subcategory filtering

**Menu Items**

- Rich media support (multiple images)
- Pricing and calorie information
- Dietary tags (vegetarian, vegan, gluten-free, etc.)
- Special instructions and comments
- Real-time availability updates

### Order Management

**Basket System**

- Add/remove items with quantity controls
- Item-specific comments and instructions
- Table number assignment
- Real-time price calculation
- Calorie tracking

**Order Processing**

- QR code generation for orders
- WhatsApp integration for order sharing
- Order preview and confirmation
- Encoded order data for sharing

### QR Code Generation

- Automatic QR code generation for menu access
- Customizable QR code styling
- Analytics tracking for QR code usage
- Mobile-optimized landing pages

### Admin Dashboard

**Content Management**

- Intuitive drag-and-drop interface
- Real-time preview capabilities
- Version control and drafts
- Bulk operations support

**Restaurant Management**

- Multi-tenant administration
- User role management
- Analytics and reporting
- System configuration

## 📚 API Documentation

### Collections

The application uses Payload CMS collections:

- **Tenants**: Restaurant/tenant management
- **Categories**: Menu category organization
- **Menu Items**: Individual menu items
- **Media**: File and image management
- **Users**: Admin user management

### API Endpoints

- `GET /api/tenants` - List all tenants
- `GET /api/categories` - Get categories for a tenant
- `GET /api/menu-items` - Get menu items for a tenant
- `POST /api/orders` - Create new orders
- `GET /api/graphql` - GraphQL endpoint

### GraphQL Playground

Access the GraphQL playground at: `http://localhost:3000/api/graphql-playground`

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**

   ```bash
   vercel --prod
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy database**
   - Use Vercel Postgres for production
   - Configure connection string in environment variables

### Production Checklist

- [ ] Set `PAYLOAD_SECRET` environment variable
- [ ] Configure `POSTGRES_URL` for production database
- [ ] Set up Vercel Blob Storage
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring and analytics
- [ ] Test all features in production environment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
4. **Run tests and linting**

   ```bash
   pnpm lint
   pnpm test
   ```

5. **Commit your changes**

   ```bash
   git commit -m 'Add amazing feature'
   ```

6. **Push to the branch**

   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Ensure responsive design
- Add proper error handling
- Include accessibility features
- Write meaningful documentation

## 🆘 Support

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

### Contact Information

- **Developer**: [Ali Shour](mailto:alishour.dev@outlook.com)
- **Website**: [Click-n-Bite Platform](https://clicknbite.com)
- **Support**: Available 24/7 for enterprise customers

### Common Issues

**Database Connection**

- Ensure Docker is running
- Check PostgreSQL connection string
- Verify database container status

**Build Errors**

- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `pnpm reinstall`
- Check Node.js version compatibility

**Admin Access**

- Verify `PAYLOAD_SECRET` is set
- Check user permissions in admin panel
- Ensure proper tenant configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Payload CMS** for the powerful headless CMS
- **Next.js Team** for the amazing React framework
- **Vercel** for hosting and deployment infrastructure
- **Tailwind CSS** for the utility-first CSS framework
- **All contributors** who help improve this platform

---

**Built with ❤️ by [Ali Shour](mailto:alishour.dev@outlook.com)**

*Transform your restaurant with modern digital solutions.*
