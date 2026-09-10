import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Helper to get or initialize a Firebase app instance dynamically based on saved user config
const getFirebaseApp = (config) => {
  if (!config) return null;
  try {
    const configObj = typeof config === 'string' ? JSON.parse(config) : config;
    if (!configObj.apiKey || !configObj.projectId) {
      throw new Error("Missing apiKey or projectId in Firebase configuration.");
    }
    
    const appName = configObj.projectId;
    const existingApps = getApps();
    const existingApp = existingApps.find(app => app.name === appName);
    
    if (existingApp) {
      return existingApp;
    }
    return initializeApp(configObj, appName);
  } catch (error) {
    console.error("Firebase dynamic initialization failed:", error);
    throw new Error(`Invalid Firebase config: ${error.message}`, { cause: error });
  }
};

export const getFirebaseAuth = (config) => {
  const app = getFirebaseApp(config);
  return app ? getAuth(app) : null;
};

export const getFirestoreDb = (config) => {
  const app = getFirebaseApp(config);
  if (!app) return null;
  try {
    const configObj = typeof config === 'string' ? JSON.parse(config) : config;
    if (configObj.databaseId) {
      return getFirestore(app, configObj.databaseId);
    }
  } catch (err) {
    console.error("Error reading databaseId from config:", err);
  }
  return getFirestore(app);
};

export const loginUser = async (config, email, password) => {
  const auth = getFirebaseAuth(config);
  if (!auth) throw new Error("Firebase Auth is not configured.");
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (config, email, password) => {
  const auth = getFirebaseAuth(config);
  if (!auth) throw new Error("Firebase Auth is not configured.");
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async (config) => {
  const auth = getFirebaseAuth(config);
  if (!auth) throw new Error("Firebase Auth is not configured.");
  return signOut(auth);
};

// Firestore CRUD operations

export const saveUserTemplate = async (config, userId, name, htmlCode) => {
  const db = getFirestoreDb(config);
  if (!db) throw new Error("Firebase Database is not configured.");
  
  const colRef = collection(db, 'templates');
  const docRef = await addDoc(colRef, {
    userId,
    name,
    code: htmlCode,
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const loadUserTemplates = async (config, userId) => {
  const db = getFirestoreDb(config);
  if (!db) return [];
  try {
    const colRef = collection(db, 'templates');
    const q = query(colRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Sort in memory by updatedAt desc (safely handles potential missing updatedAt field on new documents)
    list.sort((a, b) => {
      const aTime = a.updatedAt?.seconds || a.updatedAt?.toMillis?.() / 1000 || 0;
      const bTime = b.updatedAt?.seconds || b.updatedAt?.toMillis?.() / 1000 || 0;
      return bTime - aTime;
    });
    
    return list;
  } catch (err) {
    console.error("Failed to load templates from Firestore:", err);
    throw err;
  }
};

export const deleteUserTemplate = async (config, docId) => {
  const db = getFirestoreDb(config);
  if (!db) throw new Error("Firebase Database is not configured.");
  
  const docRef = doc(db, 'templates', docId);
  await deleteDoc(docRef);
};
