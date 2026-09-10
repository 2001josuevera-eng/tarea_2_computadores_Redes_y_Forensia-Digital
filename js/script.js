const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const shareButton = document.getElementById('shareButton');
const modalBackdrop = document.getElementById('autor');
const closeModalButton = document.getElementById('closeModalButton');
const toast = document.getElementById('toast');
const topologyCards = document.querySelectorAll('.topology-card');
const revealElems = document.querySelectorAll('.reveal');
const motivationTriggers = document.querySelectorAll('.motivation-trigger');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  body.classList.toggle('dark-mode', isDark);
  const label = isDark ? 'Modo claro' : 'Modo oscuro';
  if (themeToggle) {
    themeToggle.textContent = label;
    themeToggle.setAttribute('aria-label', label);
  }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

function openModal() {
  if (!modalBackdrop) return;
  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove('open');
  modalBackdrop.setAttribute('aria-hidden', 'true');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('site-theme', nextTheme);
    applyTheme(nextTheme);
  });
}

if (shareButton) {
  const originalText = shareButton.textContent;

  shareButton.addEventListener('click', async () => {
    const shareData = {
      title: 'Arquitectura de Computadores, Redes e Investigación de Ciberdelitos',
      text: 'Sitio académico sobre arquitectura de computadores, redes y ciberdelitos.',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        shareButton.textContent = 'Compartido';
        shareButton.setAttribute('aria-label', 'Contenido compartido');
        showToast('Contenido compartido correctamente');
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
        shareButton.textContent = 'Enlace copiado';
        shareButton.setAttribute('aria-label', 'Enlace copiado');
        showToast('Enlace copiado correctamente');
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        shareButton.textContent = 'Enlace copiado';
        shareButton.setAttribute('aria-label', 'Enlace copiado');
        showToast('Enlace copiado correctamente');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(window.location.href);
          shareButton.textContent = 'Enlace copiado';
          shareButton.setAttribute('aria-label', 'Enlace copiado');
          showToast('Enlace copiado correctamente');
        } catch (clipboardError) {
          shareButton.textContent = 'No disponible';
          shareButton.setAttribute('aria-label', 'No se pudo compartir ni copiar');
          showToast('No se pudo compartir ni copiar el enlace');
        }
      }
    }

    setTimeout(() => {
      shareButton.textContent = originalText;
      shareButton.setAttribute('aria-label', 'Compartir sitio');
    }, 1800);
  });
}

const authorNavLink = document.querySelector('a[href="#autor"]');

if (authorNavLink) {
  authorNavLink.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
  });
}

if (closeModalButton) {
  closeModalButton.addEventListener('click', closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

topologyCards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    topologyCards.forEach((item) => item.classList.remove('is-active'));
    card.classList.add('is-active');
  });

  card.addEventListener('click', () => {
    topologyCards.forEach((item) => item.classList.remove('is-active'));
    card.classList.add('is-active');
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      card.click();
    }
  });
  card.setAttribute('tabindex', '0');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElems.forEach((element) => observer.observe(element));

motivationTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.motivation-item');
    const isOpen = item.classList.contains('is-open');

    document.querySelectorAll('.motivation-item').forEach((entry) => {
      entry.classList.remove('is-open');
      const button = entry.querySelector('.motivation-trigger');
      if (button) {
        button.setAttribute('aria-expanded', 'false');
        button.lastElementChild.textContent = '+';
      }
    });

    if (!isOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.lastElementChild.textContent = '−';
    }
  });
});

initializeTheme();
