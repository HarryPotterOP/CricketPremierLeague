const firebaseConfig = {
  apiKey: "AIzaSyBR4-br7u-QfbNBPn7ZuuxVRMez79GvksI",
  authDomain: "legendarycricket-b7467.firebaseapp.com",
  projectId: "legendarycricket-b7467",
  storageBucket: "legendarycricket-b7467.firebasestorage.app",
  messagingSenderId: "905986000464",
  appId: "1:905986000464:web:98d60dbab04ee41e0bf355"
};
let auth, db, firebaseReady = false;
function initializeFirebase() {
  try {
    if (!firebase.apps || firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    auth = firebase.auth();
    db = firebase.firestore();
    firebaseReady = true;
    window.firebaseReady = true;
    return true;
  } catch (error) {
    return false;
  }
}
if (typeof firebase !== 'undefined') {
  initializeFirebase();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!firebaseReady) initializeFirebase();
  });
} else {
  if (!firebaseReady) initializeFirebase();
}
Object.defineProperty(window, 'firebaseReady', {
  get: () => firebaseReady,
  set: (val) => { firebaseReady = val; },
  configurable: true
});
window.getFirebaseAuth = () => auth;
window.getFirebaseDb = () => db;
