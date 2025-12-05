// Si on est en prod (Vercel), on utilise l'URL d'environnement.
// Sinon (Local), on utilise localhost:8080.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";