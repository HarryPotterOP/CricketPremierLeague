const FIREBASE_AUTH = {
  USERS_COLLECTION: 'users',
  async init() {
    try {
      if (typeof firebase !== 'undefined' && auth) {
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      }
    } catch (error) {}
  },
  async register(email, password, displayName) {
    try {
      if (!window.firebaseReady || !auth || !db) return { success: false, message: 'Firebase not initialized.' };
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedDisplayName = displayName.trim();
      const lowerUsername = trimmedDisplayName.toLowerCase();
      if (!trimmedEmail || !trimmedDisplayName || !password) return { success: false, message: 'All fields are required' };
      const usernameCheck = await db.collection(this.USERS_COLLECTION).where('username', '==', lowerUsername).limit(1).get();
      if (!usernameCheck.empty) return { success: false, message: 'Username taken' };
      const userCredential = await auth.createUserWithEmailAndPassword(trimmedEmail, password);
      const uid = userCredential.user.uid;
      await auth.currentUser.updateProfile({ displayName: trimmedDisplayName });
      await db.collection(this.USERS_COLLECTION).doc(uid).set({
        email: trimmedEmail,
        username: lowerUsername,
        displayName: trimmedDisplayName,
        bio: '',
        avatarColor: this.getRandomColor(),
        bannerImage: '',
        profileImage: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      if (typeof SESSION_MANAGER !== 'undefined') {
        SESSION_MANAGER.setSession(uid);
        sessionStorage.setItem('justLoggedIn', 'true');
      } else {
        localStorage.setItem('firebaseLoginTimestamp', Date.now().toString());
        sessionStorage.setItem('justLoggedIn', 'true');
      }
      return { success: true, message: 'Registration successful!', uid };
    } catch (error) {
      return { success: false, message: this.getErrorMessage(error.code) };
    }
  },
  async login(emailOrUsername, password) {
    try {
      if (!window.firebaseReady || !auth || !db) return { success: false, message: 'Firebase not initialized.' };
      let email = emailOrUsername;
      if (!emailOrUsername.includes('@')) {
        const lowerUsername = emailOrUsername.toLowerCase();
        const snapshot = await db.collection(this.USERS_COLLECTION).where('username', '==', lowerUsername).limit(1).get();
        if (snapshot.empty) return { success: false, message: 'Username not found' };
        email = snapshot.docs[0].data().email;
      }
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      if (typeof SESSION_MANAGER !== 'undefined') {
        SESSION_MANAGER.setSession(userCredential.user.uid);
        sessionStorage.setItem('justLoggedIn', 'true');
      } else {
        localStorage.setItem('firebaseLoginTimestamp', Date.now().toString());
        sessionStorage.setItem('justLoggedIn', 'true');
      }
      return { success: true, message: 'Login successful!', user: userCredential.user };
    } catch (error) {
      return { success: false, message: this.getErrorMessage(error.code) };
    }
  },
  async logout() {
    try {
      if (typeof SESSION_MANAGER !== 'undefined') {
        SESSION_MANAGER.clearSession();
      } else {
        localStorage.removeItem('firebaseLoginTimestamp');
        localStorage.clear();
        sessionStorage.clear();
      }
      await auth.signOut();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  async resetPassword(email) {
    try {
      if (!window.firebaseReady || !auth) return { success: false, message: 'Firebase not initialized.' };
      if (!email) return { success: false, message: 'Please enter your email address' };
      await auth.sendPasswordResetEmail(email);
      return { success: true, message: 'Password reset email sent! Check your inbox.' };
    } catch (error) {
      return { success: false, message: this.getErrorMessage(error.code) };
    }
  },
  async getCurrentUser() {
    return new Promise((resolve) => {
      if (!auth) return resolve(null);
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        unsubscribe();
        if (user) {
          const userData = await this.getUserData(user.uid);
          resolve({ uid: user.uid, email: user.email, ...userData });
        } else {
          resolve(null);
        }
      });
    });
  },
  async getUserData(uid) {
    try {
      if (!db) return null;
      const doc = await db.collection(this.USERS_COLLECTION).doc(uid).get();
      return doc.exists ? doc.data() : null;
    } catch (error) {
      return null;
    }
  },
  async updateProfile(displayName, bio, avatarColor = null, profileImage = null, bannerImage = null) {
    try {
      if (!auth || !db) return { success: false, message: 'Firebase not initialized' };
      const user = auth.currentUser;
      if (!user) return { success: false, message: 'Not authenticated' };
      if (displayName) await user.updateProfile({ displayName });
      const updateData = {};
      if (displayName) updateData.displayName = displayName;
      if (bio !== undefined) updateData.bio = bio;
      if (avatarColor) updateData.avatarColor = avatarColor;
      if (profileImage) updateData.profileImage = profileImage;
      if (bannerImage) updateData.bannerImage = bannerImage;
      if (Object.keys(updateData).length > 0) {
        await db.collection(this.USERS_COLLECTION).doc(user.uid).update(updateData);
      }
      return { success: true, message: 'Profile updated!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  getErrorMessage(errorCode) {
    const messages = {
      'auth/email-already-in-use': 'Email taken',
      'auth/invalid-email': 'Invalid email',
      'auth/weak-password': 'Weak password',
      'auth/user-not-found': 'User not found',
      'auth/wrong-password': 'Wrong password',
      'auth/too-many-requests': 'Too many attempts',
    };
    return messages[errorCode] || 'Error: ' + errorCode;
  },
  getRandomColor() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
};
const AUTH = FIREBASE_AUTH;
window.AUTH = AUTH;
AUTH.init();