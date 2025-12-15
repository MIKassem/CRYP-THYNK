/**
 * Backend Express Server
 * 
 * This server handles:
 * 1. Serving static files (the built React app) in production
 * 2. Client-side routing (SPA fallback to index.html)
 * 
 * Currently this is a minimal server with NO API endpoints.
 * To integrate with a backend/LLM:
 * - Add POST /api/chat endpoint for message processing
 * - Add GET /api/lessons/:id/prompt for lesson data
 * - Add authentication/session management as needed
 * 
 * See BACKEND_INTEGRATION_GUIDE.md for detailed instructions.
 */

import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Start Server
 * Initializes and starts the Express server
 */
async function startServer() {
  const app = express();
  const server = createServer(app);

  // Determine static file path based on environment
  // In production: serve from dist/public (built files)
  // In development: Vite dev server handles this
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Serve static files (HTML, CSS, JS, images)
  app.use(express.static(staticPath));

  // ========== TODO: Add API Routes Here ==========
  // Example:
  // app.use(express.json());
  // app.post("/api/chat", async (req, res) => { ... });
  // app.get("/api/lessons/:id/prompt", (req, res) => { ... });

  // ========== SPA Fallback Route ==========
  // Handle client-side routing - serve index.html for all routes
  // This must be the LAST route so it doesn't override API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // Start listening on specified port
  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

// Start the server and handle any errors
startServer().catch(console.error);
