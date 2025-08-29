# Portfolio Builder - Interactive 3D Portfolio

A modern, interactive 3D portfolio built with React, Three.js, and Express. Features stunning 3D graphics, smooth animations, and a responsive design.

## ✨ Features

- **3D Interactive Environment** - Built with Three.js and React Three Fiber
- **Modern UI Components** - Using Radix UI and Tailwind CSS
- **Responsive Design** - Works on all devices
- **Smooth Animations** - GSAP-powered animations
- **Audio Integration** - Background music and sound effects
- **TypeScript** - Full type safety
- **Production Ready** - Optimized for deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (for database features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd PortfolioBuilder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run preview` - Preview production build
- `npm run deploy` - Full deployment process

## 🚀 Deployment

### Option 1: Automated Deployment

Use the provided deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Option 3: Docker Deployment

1. **Build Docker image**
   ```bash
   docker build -t portfolio-builder .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Option 4: Platform Deployment

#### Heroku
```bash
heroku create your-portfolio-app
heroku config:set NODE_ENV=production
git push heroku main
```

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Railway
```bash
npm install -g @railway/cli
railway login
railway up
```

## 🌍 Environment Variables

Create a `.env` file based on `env.example`:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://username:password@host:port/database
DOMAIN=https://your-domain.com
```

## 📁 Project Structure

```
PortfolioBuilder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── sections/      # Page sections
│   │   └── hooks/         # Custom hooks
│   └── public/            # Static assets
├── server/                 # Express backend
│   ├── routes/            # API routes
│   └── vite.ts            # Vite integration
├── shared/                 # Shared schemas
├── dist/                   # Build output
└── migrations/             # Database migrations
```

## 🔧 Configuration

### Vite Configuration
- Optimized build process
- Asset optimization
- Code splitting
- GLSL shader support

### Server Configuration
- Production-ready Express server
- Static file serving
- API routing
- Error handling

## 📊 Performance

- **Code Splitting** - Automatic chunk optimization
- **Asset Optimization** - Compressed and optimized assets
- **Caching** - Proper cache headers for production
- **Bundle Analysis** - Optimized bundle sizes

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**
   - Ensure Node.js 18+ is installed
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

2. **Port already in use**
   - Change PORT in .env file
   - Kill existing process: `lsof -ti:3000 | xargs kill -9`

3. **Database connection fails**
   - Check DATABASE_URL in .env
   - Ensure PostgreSQL is running

### Debug Mode

Enable debug logging:
```bash
DEBUG=* npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with details

---

**Made with ❤️ by Mohit Yadav**

Your portfolio is now ready for deployment! 🎉
