document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  const getStartedBtn = document.getElementById('getStartedBtn');
  const heroStartBtn = document.getElementById('heroStartBtn');
  const loginModal = document.getElementById('loginModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCancel = document.getElementById('modalCancel');
  const loginForm = document.getElementById('loginForm');
  const termsLinks = document.querySelectorAll('#termsLink, #termsLinkFooter');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('close-popup');
  // Game Launcher moved to separate page (pro.html); no in-page elements.
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.querySelector('.main-nav');
  const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-slide-up, .animate-slide-right, .animate-slide-left, .animate-scale-in');
  const counters = document.querySelectorAll('.count');

  function openModal() {
    if (!loginModal) return;
    loginModal.classList.remove('hidden');
    loginModal.setAttribute('aria-hidden', 'false');
    const username = document.getElementById('username');
    if (username) username.focus();
  }

  // No-op: Game Launcher is on a separate page.

  function closeModal() {
    if (!loginModal) return;
    loginModal.classList.add('hidden');
    loginModal.setAttribute('aria-hidden', 'true');
  }

  function toggleMobileNav() {
    if (!mainNav) return;
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
  }

  function openTerms() {
    if (!popup) return;
    popup.classList.remove('hidden');
  }

  function hideTerms() {
    if (!popup) return;
    popup.classList.add('hidden');
  }

  if (loginBtn) loginBtn.addEventListener('click', openModal);
  if (getStartedBtn) getStartedBtn.addEventListener('click', openModal);
  if (heroStartBtn) heroStartBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCancel) modalCancel.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (closePopup) closePopup.addEventListener('click', hideTerms);
  if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileNav);
  if (termsLinks.length) {
    termsLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        openTerms();
      });
    });
  }

  if (popup) {
    popup.addEventListener('click', (event) => {
      if (event.target === popup) hideTerms();
    });
  }

  // Nothing else required for Game Launcher on index page.

  function animateCounters(entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = +counter.dataset.target || 0;
      const duration = 1600;
      const startTime = performance.now();

      const step = (timestamp) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        counter.textContent = Math.floor(progress * target).toLocaleString();
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      window.requestAnimationFrame(step);
      observer.unobserve(counter);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  if (counters.length) {
    const counterObserver = new IntersectionObserver(animateCounters, {
      threshold: 0.3,
    });
    counters.forEach((counter) => counterObserver.observe(counter));
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      hideTerms();
      if (mainNav && mainNav.classList.contains('open')) {
        toggleMobileNav();
      }
    }
  });

  const chatToggleBtn = document.getElementById('chatToggleBtn');
  const chatClearBtn = document.getElementById('chatClearBtn');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatWidget = document.getElementById('chatWidget');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const CHAT_HISTORY_KEY = 'siteAssistantChatHistory';
  let chatInitialized = false;
  let chatHistory = [];

  function loadChatHistory() {
    try {
      const stored = localStorage.getItem(CHAT_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  function saveChatHistory() {
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
    } catch (error) {
      // ignore storage failures
    }
  }

  function scrollChat() {
    if (!chatBody) return;
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function renderChatEntry(type, text) {
    if (!chatBody) return null;
    const item = document.createElement('div');
    item.className = `chat-message ${type}`;
    item.textContent = text;
    chatBody.appendChild(item);
    return item;
  }

  function appendChatMessage(type, text) {
    if (!chatBody) return null;
    const item = renderChatEntry(type, text);
    chatHistory.push({ type, text });
    saveChatHistory();
    scrollChat();
    return item;
  }

  function renderChatHistory() {
    if (!chatBody) return;
    chatBody.innerHTML = '';
    chatHistory.forEach((entry) => renderChatEntry(entry.type, entry.text));
    scrollChat();
  }

  async function sendChatMessage(message) {
    if (!message || !chatBody) return;

    appendChatMessage('user', message);
    const loadingItem = appendChatMessage('bot loading', 'Thinking...');
    chatInput.value = '';

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();

      if (data.success) {
        loadingItem.textContent = data.response || 'Sorry, no response was returned.';
        loadingItem.classList.remove('loading');
      } else {
        loadingItem.textContent = data.error || 'Unable to get a response from the assistant.';
        loadingItem.classList.remove('loading');
      }
    } catch (error) {
      loadingItem.textContent = 'Network error while connecting to the assistant.';
      loadingItem.classList.remove('loading');
    }

    scrollChat();
  }

  function openChat() {
    if (!chatWidget) return;
    chatWidget.classList.remove('hidden');

    if (!chatInitialized) {
      chatHistory = loadChatHistory();
      renderChatHistory();

      if (chatHistory.length === 0) {
        appendChatMessage('bot', 'Hi! I’m your website assistant. Ask me about the site, its courses, and how to get started.');
      }

      chatInitialized = true;
    }
  }

  function clearChatHistory() {
    chatHistory = [];
    saveChatHistory();
    renderChatHistory();
    appendChatMessage('bot', 'Chat history cleared. Ask anything to continue.');
  }

  function closeChat() {
    if (!chatWidget) return;
    chatWidget.classList.add('hidden');
  }

  if (chatToggleBtn) chatToggleBtn.addEventListener('click', openChat);
  if (chatClearBtn) chatClearBtn.addEventListener('click', clearChatHistory);
  if (chatCloseBtn) chatCloseBtn.addEventListener('click', closeChat);
  if (chatForm) {
    chatForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const text = (chatInput.value || '').trim();
      if (text) {
        sendChatMessage(text);
      }
    });
  }
});
