const LOADER_MANAGER = {
  LOADER_SHOWN_KEY: 'loaderShown',
  JUST_LOGGED_IN_KEY: 'justLoggedIn',
  LOADER_ANIMATION_DURATION: 4200,
  init() {
    const loaderElement = document.getElementById('loader');
    if (!loaderElement) return;
    const hasShownLoader = sessionStorage.getItem(this.LOADER_SHOWN_KEY) === 'true';
    const isJustLoggedIn = sessionStorage.getItem(this.JUST_LOGGED_IN_KEY) === 'true';
    if (hasShownLoader) {
      this.hideLoader();
    } else if (isJustLoggedIn) {
      sessionStorage.setItem(this.LOADER_SHOWN_KEY, 'true');
      sessionStorage.removeItem(this.JUST_LOGGED_IN_KEY);
      this.showLoader();
    } else {
      this.hideLoader();
    }
  },
  showLoader() {
    const loaderElement = document.getElementById('loader');
    if (!loaderElement) return;
    loaderElement.style.display = 'flex';
    loaderElement.style.top = '0';
    setTimeout(() => {
      this.hideLoader();
    }, this.LOADER_ANIMATION_DURATION);
  },
  hideLoader() {
    const loaderElement = document.getElementById('loader');
    if (!loaderElement) return;
    loaderElement.style.top = '-100%';
    setTimeout(() => {
      loaderElement.style.display = 'none';
    }, 700);
  },
  reset() {
    sessionStorage.removeItem(this.LOADER_SHOWN_KEY);
    sessionStorage.removeItem(this.JUST_LOGGED_IN_KEY);
  },
  hasShownLoader() {
    return sessionStorage.getItem(this.LOADER_SHOWN_KEY) === 'true';
  },
  show() {
    sessionStorage.setItem(this.LOADER_SHOWN_KEY, 'true');
    this.showLoader();
  },
  hide() {
    this.hideLoader();
  }
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('loader')) {
      LOADER_MANAGER.init();
    }
  });
} else {
  if (document.getElementById('loader')) {
    LOADER_MANAGER.init();
  }
}
