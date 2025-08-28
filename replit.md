# Portfolio Application

## Overview

This is a modern 3D portfolio website built with React, Three.js, and Express. The application features an immersive 3D experience with smooth scroll-based animations, interactive environments, and seamless page transitions. The portfolio showcases skills, projects, and personal information through an engaging visual interface that combines traditional web elements with 3D graphics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Main UI framework using functional components and hooks
- **Three.js Integration**: 3D rendering through @react-three/fiber for declarative 3D scenes
- **Component-based Design**: Modular structure with separate components for 3D scenes, UI sections, and navigation
- **State Management**: Zustand stores for portfolio state, audio controls, and game mechanics
- **Animation System**: GSAP with ScrollTrigger for scroll-based animations and smooth transitions
- **Responsive Design**: Tailwind CSS with custom CSS variables for theming and mobile adaptation

### Backend Architecture  
- **Express.js Server**: Lightweight REST API server with TypeScript support
- **Modular Routing**: Centralized route registration with separation of concerns
- **Development Tooling**: Vite integration for hot module replacement and development workflow
- **Storage Interface**: Abstract storage layer with in-memory implementation for user data

### 3D Scene Architecture
- **Scene Management**: Centralized Scene component orchestrating camera, lighting, and 3D objects
- **Environment System**: Switchable 3D environments based on portfolio sections (Hero, Projects, etc.)
- **Camera Controls**: Animated camera movements synchronized with scroll progress and section changes
- **Lighting System**: Dynamic lighting with ambient, directional, and point lights that respond to user interaction

### Data Layer
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Schema Definition**: Centralized database schema in shared directory
- **Migration System**: Database versioning through Drizzle migrations
- **Type Safety**: Zod validation schemas for runtime type checking

### Asset Management
- **3D Asset Support**: GLTF/GLB model loading with texture and audio file handling
- **Font Loading**: Custom Inter font integration with fallback system
- **Static Assets**: Vite-powered asset optimization and bundling

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL database for production deployment
- **Connection Pooling**: Optimized database connections through Neon's serverless driver

### UI Component Libraries
- **Radix UI**: Headless component primitives for accessibility and consistent behavior
- **Tailwind CSS**: Utility-first styling with custom design system integration
- **Lucide React**: Icon system for consistent visual elements

### 3D Graphics Stack
- **Three.js**: Core 3D rendering engine
- **React Three Fiber**: React renderer for Three.js scenes  
- **React Three Drei**: Helper components and utilities for common 3D patterns
- **React Three Postprocessing**: Visual effects and post-processing pipeline

### Animation and Interaction
- **GSAP**: Professional animation library with timeline and scroll trigger capabilities
- **Framer Motion**: React animation library for UI component transitions
- **React Query**: Data fetching and caching for API interactions

### Development Tools
- **Vite**: Build tool and development server with HMR support
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundling for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration