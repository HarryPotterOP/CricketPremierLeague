const SESSION_MANAGER = {
  SESSION_DURATION: 7 * 24 * 60 * 60 * 1000,
  LOGIN_TIMESTAMP_KEY: 'firebaseLoginTimestamp',
  USER_ID_KEY: 'currentUserId',
  MAX_RETRY_ATTEMPTS: 50,
  RETRY_INTERVAL: 100,
  getRootPath() {
    const path = window.location.pathname;
    const pagesIdx = path.indexOf('/pages/');
    if (pagesIdx !== -1) {
      const afterPages = path.substring(pagesIdx + '/pages/'.length);
      const depth = afterPages.split('/').filter(Boolean).length;
      return '../'.repeat(depth);
    }
    return './';
  },
  validateSession() {
    const loginTimestamp = localStorage.getItem(this.LOGIN_TIMESTAMP_KEY);
    const currentUserId = localStorage.getItem(this.USER_ID_KEY);
    if (!loginTimestamp || !currentUserId) {
      this.clearSession();
      return false;
    }
    const elapsed = Date.now() - parseInt(loginTimestamp, 10);
    if (elapsed > this.SESSION_DURATION) {
      this.clearSession();
      return false;
    }
    return true;
  },
  clearSession() {
    localStorage.removeItem(this.LOGIN_TIMESTAMP_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
    sessionStorage.clear();
  },
  setSession(userId) {
    localStorage.setItem(this.LOGIN_TIMESTAMP_KEY, Date.now().toString());
    localStorage.setItem(this.USER_ID_KEY, userId);
  },
  async init(redirectPath = 'index.html', protectPage = true) {
    const root = this.getRootPath();
    if (!this.validateSession()) {
      await this.logout(root + 'index.html');
      return;
    }
    if (protectPage && !this.validateSession()) {
      this.redirectToLogin(root + 'index.html');
      return;
    }
    let attempts = 0;
    while (!window.firebaseReady && attempts < this.MAX_RETRY_ATTEMPTS) {
      await new Promise(resolve => setTimeout(resolve, this.RETRY_INTERVAL));
      attempts++;
    }
    if (window.firebaseReady && auth) {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          if (protectPage) this.redirectToLogin(root + 'index.html');
          else this.updateUI(null);
        } else {
          if (!this.validateSession()) {
            if (!protectPage) {
              this.updateUI(null);
            }
            this.logout(root + 'index.html');
          } else {
            const storedUserId = localStorage.getItem(this.USER_ID_KEY);
            if (storedUserId && storedUserId !== user.uid) {
              this.clearSession();
              this.logout(root + 'index.html');
            } else {
              this.setSession(user.uid);
              this.updateUI(user);
            }
          }
        }
      });
    }
  },
  isSessionExpired() {
    const loginTimestamp = localStorage.getItem(this.LOGIN_TIMESTAMP_KEY);
    if (!loginTimestamp) return false;
    const elapsed = Date.now() - parseInt(loginTimestamp, 10);
    return elapsed > this.SESSION_DURATION;
  },
  redirectToLogin(redirectPath = '../index.html') {
    window.location.href = redirectPath;
  },
  async logout(redirectPath = '../index.html') {
    try {
      if (typeof LOADER_MANAGER !== 'undefined') {
        LOADER_MANAGER.reset();
      }
      this.clearSession();
      if (typeof AUTH !== 'undefined' && AUTH.logout) {
        await AUTH.logout();
      } else {
        if (typeof auth !== 'undefined') await auth.signOut();
      }
      this.redirectToLogin(redirectPath);
    } catch (error) {
      this.redirectToLogin(redirectPath);
    }
  },
  async updateUI(user) {
    if (user) {
      const path = window.location.pathname;
      const isLoginPage = path.endsWith('index.html') || path.endsWith('/') || path === '' || path.endsWith('index');
      const isRegisterPage = path.endsWith('register.html');
      if (!isLoginPage && !isRegisterPage) {
        const loginLinks = document.querySelectorAll('a[href*="index.html"], a[href*="register.html"]');
        loginLinks.forEach(link => {
          const text = link.textContent.toLowerCase();
          if (text.includes('login') || text.includes('register')) {
            link.style.display = 'none';
          }
        });
      }
      try {
        const userData = typeof AUTH !== 'undefined' ? await AUTH.getUserData(user.uid) : null;
        if (userData) {
          const displayName = userData.displayName || user.email;
          const username = userData.username || displayName.toLowerCase();
          const avatarColor = userData.avatarColor || '#FF6B35';
          const bio = userData.bio || '';
          const profileImage = userData.profileImage;
          const bannerImage = userData.bannerImage;
          const elements = {
            'nav-username-text': displayName,
            'avatar-letter': displayName.charAt(0).toUpperCase(),
            'profile-card-name': displayName,
            'profile-card-username': '@' + username,
            'profile-card-letter': displayName.charAt(0).toUpperCase(),
            'profile-card-bio': bio
          };
          for (const [id, value] of Object.entries(elements)) {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
          }
          if (profileImage) {
            const profileImg = document.getElementById('profile-card-avatar-img');
            if (profileImg) {
              profileImg.src = profileImage;
              profileImg.style.display = 'block';
              const cardLetter = document.getElementById('profile-card-letter');
              if (cardLetter) cardLetter.style.display = 'none';
            }
            const navImg = document.getElementById('nav-user-img');
            if (navImg) {
              navImg.src = profileImage;
              navImg.style.display = 'block';
              const navLetter = document.getElementById('avatar-letter');
              if (navLetter) navLetter.style.display = 'none';
            }
          } else {
            const avatarBtn = document.getElementById('user-avatar-btn');
            if (avatarBtn) avatarBtn.style.backgroundColor = avatarColor;
            const cardAvatar = document.getElementById('profile-card-avatar');
            if (cardAvatar) cardAvatar.style.backgroundColor = avatarColor;
          }
          if (bannerImage) {
            const bannerImg = document.getElementById('profile-card-banner-img');
            if (bannerImg) {
              bannerImg.src = bannerImage;
              bannerImg.style.display = 'block';
            }
          }
          const userMenuNav = document.getElementById('user-menu-nav');
          if (userMenuNav) {
            userMenuNav.classList.remove('profile-loading');
          }
        }
      } catch (err) {
        const userMenuNav = document.getElementById('user-menu-nav');
        if (userMenuNav) {
          userMenuNav.classList.remove('profile-loading');
        }
      }
    }
  }
};
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const pathParts = path.split('/').filter(Boolean);
  const isRootLevel = pathParts.length === 0 || (pathParts.length === 1 && (pathParts[0] === 'index.html' || pathParts[0] === 'register.html'));
  const isLoginPage = (path.endsWith('index.html') && isRootLevel) || path.endsWith('/') || path === '';
  const isRegisterPage = (path.endsWith('register.html') && isRootLevel);
  if (isLoginPage || isRegisterPage) {
    SESSION_MANAGER._redirectLoggedInUser();
  } else {
    SESSION_MANAGER.init('index.html', true);
  }
});
SESSION_MANAGER._redirectLoggedInUser = async function() {
  if (!this.validateSession()) {
    this.clearSession();
    return;
  }
  let attempts = 0;
  while (!window.firebaseReady && attempts < this.MAX_RETRY_ATTEMPTS) {
    await new Promise(resolve => setTimeout(resolve, this.RETRY_INTERVAL));
    attempts++;
  }
  if (window.firebaseReady && auth) {
    auth.onAuthStateChanged((user) => {
      if (user && this.validateSession()) {
        const storedUserId = localStorage.getItem(this.USER_ID_KEY);
        if (storedUserId && storedUserId === user.uid) {
          const root = this.getRootPath();
          window.location.href = root + 'pages/home.html';
        } else {
          this.clearSession();
        }
      }
    });
  }
};
