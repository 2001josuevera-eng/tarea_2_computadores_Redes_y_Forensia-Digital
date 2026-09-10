const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const shareButton = document.getElementById('shareButton');
const modalBackdrop = document.getElementById('autor');
const closeModalButton = document.getElementById('closeModalButton');
const toast = document.getElementById('toast');
const topologyCards = document.querySelectorAll('.topology-card');
const topologyDetailTitle = document.getElementById('topologyDetailTitle');
const topologyDetailText = document.getElementById('topologyDetailText');
const topologyAdvantage = document.getElementById('topologyAdvantage');
const topologyRisk = document.getElementById('topologyRisk');
const topologyUse = document.getElementById('topologyUse');
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

const topologyDetails = {
  estrella: {
    title: 'Estrella',
    text: 'Los dispositivos se conectan a un punto central que facilita la administración y el diagnóstico de la red.',
    advantage: 'Detectar fallos por dispositivo es sencillo.',
    risk: 'Si falla el equipo central, la red puede quedar interrumpida.',
    use: 'Redes LAN modernas en hogares e instituciones.'
  },
  anillo: {
    title: 'Anillo',
    text: 'Cada nodo se conecta con el siguiente y la información circula siguiendo un recorrido circular.',
    advantage: 'El acceso al medio puede organizarse de forma predecible.',
    risk: 'Una interrupción en el recorrido puede afectar a varios nodos.',
    use: 'Redes especializadas y sistemas que requieren circulación ordenada.'
  },
  bus: {
    title: 'Bus',
    text: 'Todos los dispositivos comparten un canal principal por el que circulan los datos de la red.',
    advantage: 'Utiliza poco cableado y resulta sencillo de montar en escenarios pequeños.',
    risk: 'La congestión y una falla en el canal principal afectan a toda la red.',
    use: 'Redes antiguas, laboratorios o demostraciones de conceptos de comunicación.'
  }
};

function selectTopology(card, announce = true) {
  const details = topologyDetails[card.dataset.topology];
  if (!details) return;

  topologyCards.forEach((item) => {
    const isSelected = item === card;
    item.classList.toggle('is-active', isSelected);
    item.setAttribute('aria-selected', String(isSelected));
  });

  topologyDetailTitle.textContent = details.title;
  topologyDetailText.textContent = details.text;
  topologyAdvantage.textContent = details.advantage;
  topologyRisk.textContent = details.risk;
  topologyUse.textContent = details.use;

  if (announce) showToast(`Topología ${details.title.toLowerCase()} seleccionada`);
}

topologyCards.forEach((card) => {
  card.addEventListener('mouseenter', () => selectTopology(card, false));

  card.addEventListener('click', () => {
    selectTopology(card);
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      card.click();
    }
  });
  card.setAttribute('tabindex', '0');
});

const initialTopology = document.querySelector('.topology-card.is-active');
if (initialTopology && topologyDetailTitle) selectTopology(initialTopology, false);

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
