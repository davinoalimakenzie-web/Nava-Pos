import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/gemini", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      let response;
      let lastError;
      
      // Retry logic for 503 Unavailable / High Demand
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              systemInstruction,
            }
          });
          break; // Break if successful
        } catch (error: any) {
          lastError = error;
          const isUnavailable = error?.message?.includes("503") || error?.status === 503 || error?.message?.includes("UNAVAILABLE");
          if (isUnavailable && attempt < 3) {
            console.log(`[Retry ${attempt}/3] Gemini API is busy, waiting to retry...`);
            await new Promise(resolve => setTimeout(resolve, attempt * 1500));
            continue;
          }
          throw error;
        }
      }
      
      if (!response) {
        throw lastError;
      }
      
      res.json({ text: response.text });
    } catch (error: any) {
      console.error(error);
      const isUnavailable = error?.message?.includes("503") || error?.status === 503 || error?.message?.includes("UNAVAILABLE");
      res.status(isUnavailable ? 503 : 500).json({ 
        error: isUnavailable 
          ? "Sistem AI sedang sibuk, mohon coba beberapa saat lagi." 
          : error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
