import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  );
}

export function getFirebaseApp() {
  if (!isFirebaseConfigured()) {
    throw new Error("Konfigurasi Firebase belum diisi di .env.local");
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

export function getDb() {
  return getDatabase(getFirebaseApp());
}
