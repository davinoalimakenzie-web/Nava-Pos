import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc 
} from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

// Safely initialize Firebase from our applet configuration
let db: any = null;
try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, "utf-8");
    const firebaseConfig = JSON.parse(configContent);
    const firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    console.log("🔥 Firebase Firestore initialized successfully for Retool Backend Bridge!");
  } else {
    console.warn("⚠️ firebase-applet-config.json not found!");
  }
} catch (error) {
  console.error("🔴 Failed to initialize Firebase inside backend:", error);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ==========================================
  // RETOOL SECURE REST API BRIDGE (OPSI B)
  // ==========================================

  // Middleware untuk validasi API Key Retool
  const checkApiKey = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const apiKey = process.env.RETOOL_API_KEY || "retool_pos_nava_secret_secure_key_2026";
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        error: "Missing or invalid Authorization header. Silakan cantumkan Bearer Token Anda di Retool." 
      });
    }
    
    const token = authHeader.split(" ")[1];
    if (token !== apiKey) {
      return res.status(403).json({ 
        error: "Akses Ditolak: Token API Retool salah atau tidak diizinkan." 
      });
    }
    
    next();
  };

  // 1. GET /api/retool/status - Cek status koneksi & verifikasi API Key
  app.get("/api/retool/status", checkApiKey, (req, res) => {
    res.json({
      status: "online",
      databaseId: db ? "initialized" : "unconfigured",
      message: "Retool REST API Bridge untuk POS Nava berjalan dengan sempurna dan aman!"
    });
  });

  // 2. GET /api/retool/:collection - Mendapatkan seluruh data dari suatu koleksi (e.g. inventory, transactions)
  app.get("/api/retool/:collection", checkApiKey, async (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database Firestore backend belum terkonfigurasi di server." });
    }
    try {
      const colName = req.params.collection;
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      res.json(data);
    } catch (error: any) {
      console.error(`Error listing collection ${req.params.collection}:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // 3. GET /api/retool/:collection/:id - Mengambil satu baris dokumen spesifik berdasarkan ID
  app.get("/api/retool/:collection/:id", checkApiKey, async (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database Firestore backend belum terkonfigurasi di server." });
    }
    try {
      const colName = req.params.collection;
      const docId = req.params.id;
      const docRef = doc(db, colName, docId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return res.status(404).json({ error: `Dokumen dengan ID '${docId}' tidak ditemukan di tabel '${colName}'.` });
      }
      
      res.json({
        id: docSnap.id,
        ...docSnap.data()
      });
    } catch (error: any) {
      console.error(`Error reading document ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // 4. POST /api/retool/:collection - Menambahkan baris data baru (atau menimpa data jika ID sudah ada)
  app.post("/api/retool/:collection", checkApiKey, async (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database Firestore backend belum terkonfigurasi di server." });
    }
    try {
      const colName = req.params.collection;
      const { id, ...data } = req.body;
      
      // Gunakan ID yang dikirim atau generate acak jika kosong
      const docId = id || Math.random().toString(36).substring(2, 10);
      const docRef = doc(db, colName, docId);
      
      await setDoc(docRef, data, { merge: true });
      res.json({ 
        success: true, 
        message: "Dokumen berhasil disimpan!", 
        id: docId 
      });
    } catch (error: any) {
      console.error(`Error creating document in ${req.params.collection}:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // 5. PUT /api/retool/:collection/:id - Mengupdate atau mengedit field data (menggunakan sistem merge)
  app.put("/api/retool/:collection/:id", checkApiKey, async (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database Firestore backend belum terkonfigurasi di server." });
    }
    try {
      const colName = req.params.collection;
      const docId = req.params.id;
      const docRef = doc(db, colName, docId);
      
      await setDoc(docRef, req.body, { merge: true });
      res.json({ 
        success: true, 
        message: "Dokumen berhasil diperbarui!", 
        id: docId 
      });
    } catch (error: any) {
      console.error(`Error updating document ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // 6. DELETE /api/retool/:collection/:id - Menghapus dokumen permanen dari database
  app.delete("/api/retool/:collection/:id", checkApiKey, async (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database Firestore backend belum terkonfigurasi di server." });
    }
    try {
      const colName = req.params.collection;
      const docId = req.params.id;
      const docRef = doc(db, colName, docId);
      
      await deleteDoc(docRef);
      res.json({ 
        success: true, 
        message: "Dokumen berhasil dihapus!", 
        id: docId 
      });
    } catch (error: any) {
      console.error(`Error deleting document ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  });

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
      const isUnavailable = error?.message?.includes("503") || error?.status === 503 || error?.message?.includes("UNAVAILABLE");
      const isQuotaExceeded = error?.message?.includes("429") || error?.status === 429 || error?.message?.includes("quota");
      
      let errorMessage = error.message;
      if (isUnavailable) errorMessage = "Sistem AI sedang sibuk, mohon coba beberapa saat lagi.";
      if (isQuotaExceeded) errorMessage = "Kuota harian AI (Gratis) Anda telah habis, mohon cek tagihan Anda, atau tunggu beberapa saat.";

      console.warn("Gemini API Status:", errorMessage || error.message);

      res.status(isQuotaExceeded ? 429 : (isUnavailable ? 503 : 500)).json({ 
        error: errorMessage
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
