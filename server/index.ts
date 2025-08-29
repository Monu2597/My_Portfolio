import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;

// Set the environment for Express
app.set('env', process.env.NODE_ENV || 'development');

// Security middleware for production
if (isProduction) {
  // Add security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
}

// Add CORS headers to fix potential browser security issues
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Health check endpoint for deployment platforms
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    isProduction: isProduction
  });
});

// Add a simple test route to verify server is working
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!", timestamp: new Date().toISOString() });
});

// Add a fallback route for the main application
app.get("/app", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    const server = await registerRoutes(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = isProduction ? "Internal Server Error" : err.message || "Internal Server Error";

      log(`Error: ${err.message || 'Unknown error'}`, "error");
      
      if (isProduction) {
        // In production, don't expose internal errors
        res.status(status).json({ message });
      } else {
        // In development, show full error details
        res.status(status).json({ message, error: err.message, stack: err.stack });
      }
    });

    // CRITICAL: In production, ONLY serve static files, NEVER setup Vite
    if (isProduction) {
      log(`🚀 PRODUCTION MODE: Serving static files from production build`);
      log(`📁 Build directory: ${path.resolve(__dirname, "..", "dist", "public")}`);
      
      // Serve static files first
      serveStatic(app);
      
      log("✅ Static file serving configured for production");
    } else {
      log("🔧 DEVELOPMENT MODE: Setting up Vite development server...");
      
      try {
        await setupVite(app, server);
        log("✅ Vite development server setup complete");
      } catch (error) {
        log(`❌ Error setting up Vite: ${error}`);
        log("🔄 Falling back to static file serving...");
        serveStatic(app);
      }
    }

    // Start server with proper host binding for deployment
    const host = isProduction ? '0.0.0.0' : 'localhost';
    server.listen({
      port: PORT,
      host,
    }, () => {
      log(`🚀 Server running on ${host}:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
      log(`📊 Express environment: ${app.get('env')}`);
      if (isProduction) {
        log("✅ Production deployment ready!");
        log("🌐 Your portfolio is now accessible at:");
        log(`   http://localhost:${PORT}`);
        log(`   http://0.0.0.0:${PORT}`);
      }
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        log('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      log('SIGINT received, shutting down gracefully');
      server.close(() => {
        log('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    log(`Failed to start server: ${error}`, "error");
    process.exit(1);
  }
})();
