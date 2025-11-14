const DISCORD_LINK = "https://discord.gg/wEbRYca2";
const SERVER_IP = "hermitsmp4real.progamer.me";

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCopyButton();
  initFloatingDiscord();
  initScrollAnimations();
  initFilterButtons();
  initRuleCards();
  initGallery();
  initContactForm();
  initEasterEgg();
});

function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

function initCopyButton() {
  const copyBtn = document.getElementById('copyIPBtn');
  const toast = document.getElementById('copyToast');
  
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(SERVER_IP);
        showToast();

        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          width: 100px;
          height: 100px;
          margin-top: -50px;
          margin-left: -50px;
          animation: ripple 0.6s;
          pointer-events: none;
        `;
        copyBtn.style.position = 'relative';
        copyBtn.style.overflow = 'hidden';
        
        const rect = copyBtn.getBoundingClientRect();
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        
        copyBtn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      } catch (err) {
        console.error('Failed to copy:', err);
        alert(`Server IP: ${SERVER_IP}`);
      }
    });
  }
}

function showToast() {
  const toast = document.getElementById('copyToast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

function initFloatingDiscord() {
  const discordBtn = document.getElementById('floatingDiscord');
  if (discordBtn) {
    discordBtn.href = DISCORD_LINK;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 200) {
        discordBtn.style.opacity = '1';
        discordBtn.style.pointerEvents = 'all';
      } else {
        discordBtn.style.opacity = '0';
        discordBtn.style.pointerEvents = 'none';
      }
      
      lastScroll = currentScroll;
    });
  }
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .rule-card, .stat-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

function initFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const featureCards = document.querySelectorAll('.feature-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      featureCards.forEach(card => {
        const category = card.dataset.category;
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

function initRuleCards() {
  const ruleCards = document.querySelectorAll('.rule-card');

  ruleCards.forEach(card => {
    const header = card.querySelector('.rule-header');
    const content = card.querySelector('.rule-content');

    if (header && content) {
      header.addEventListener('click', () => {
        const isExpanded = card.classList.contains('expanded');

        ruleCards.forEach(c => {
          c.classList.remove('expanded');
          const cont = c.querySelector('.rule-content');
          if (cont) cont.style.maxHeight = '0';
        });

        if (!isExpanded) {
          card.classList.add('expanded');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });
}

function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');

  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        if (response.ok) {
          showFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
          form.reset();
        } else {
          showFormMessage('There was an error sending your message. Please try again later.', 'error');
        }
      } catch (error) {
        showFormMessage('There was an error sending your message. Please try again later.', 'error');
      }
    });
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showFormMessage(message, type) {
  const messageEl = document.getElementById('formMessage');
  if (messageEl) {
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = 'block';

    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 5000);
  }
}

function initEasterEgg() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;

      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
}

function activateEasterEgg() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      createSparkle();
    }, i * 50);
  }

  const message = document.createElement('div');
  message.textContent = '✨ You found the secret! ✨';
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--accent-primary);
    color: var(--dark-bg);
    padding: 2rem 3rem;
    border-radius: 20px;
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: 800;
    z-index: 10001;
    animation: bounceIn 0.6s;
    box-shadow: 0 10px 50px rgba(196, 255, 0, 0.5);
  `;
  
  document.body.appendChild(message);

  setTimeout(() => {
    message.style.animation = 'bounceOut 0.6s';
    setTimeout(() => message.remove(), 600);
  }, 3000);
}

function createSparkle() {
  const sparkle = document.createElement('div');
  const size = Math.random() * 10 + 5;
  
  sparkle.style.cssText = `
    position: fixed;
    width: ${size}px;
    height: ${size}px;
    background: var(--accent-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    left: ${Math.random() * 100}vw;
    top: ${Math.random() * 100}vh;
    animation: sparkleAnimation 1s ease-out forwards;
    box-shadow: 0 0 10px var(--accent-primary);
  `;

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes sparkleAnimation {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: scale(1) rotate(180deg);
      opacity: 0;
    }
  }

  @keyframes bounceIn {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes bounceOut {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      transform: translate(-50%, -50%) scale(0);
    }
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  
  document.querySelectorAll('*').forEach(el => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });
}