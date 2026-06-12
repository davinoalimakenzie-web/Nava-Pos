import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import firebaseConfig from '../firebase-applet-config.json';

// In development, allow setting a debug token
if (process.env.NODE_ENV !== 'production') {
  (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize App Check ONLY if a real site key is provided to avoid breaking Firestore client
let appCheckInstance = null;
const recaptchaKey = (import.meta as any).env?.VITE_RECAPTCHA_SITE_KEY;
if (recaptchaKey && recaptchaKey !== 'YOUR_RECAPTCHA_SITE_KEY') {
  appCheckInstance = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaKey),
    isTokenAutoRefreshEnabled: true
  });
}
export const appCheck = appCheckInstance;

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
}, firebaseConfig.firestoreDatabaseId);


