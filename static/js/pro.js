// pro.js - Game launcher functionality
// Handles game selection, viewer management, and access control
//
// ========================================
// HOW TO ADD GAMES:
// 1. Use the Manage Games button in the Game Launcher.
// 2. Choose a file from the game_storage folder.
// 3. Customize title, description, icon, image, status, and thumbnails.
//
// Each game slot now stores a file name in the `file` field instead of a full URL.
// The selected HTML file is served from the `game_storage` folder.
// ========================================

(function () {
  'use strict';

  // Configuration
  let GAME_SLOTS = [
    {
      id: 1,
      title: 'Tuff Client 1.12.2 -_-',
      description: 'Minecraft -_-',
      icon: '',
      image: 'https://i.postimg.cc/nrMnwBfL/image-2026-06-02-191525587.png',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: 'Tuff_client.html',
      status: 'available'
    },
    {
      id: 2,
      title: 'PolyTrack',
      description: 'PolyTrack game -_-',
      icon: '',
      image: 'https://i.postimg.cc/0j3Kt93W/image-2026-06-02-193916628.png',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: 'Poly_Track.html',
      status: 'available'
    },
    {
      id: 3,
      title: 'Super Mario 64',
      description: 'Mario game -_-',
      icon: '',
      image: 'https://i.postimg.cc/c4szZ0vS/image-2026-06-02-192850900.png',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 4,
      title: 'Basketball Legends',
      description: 'Basketball game -_-',
      icon: '',
      image: 'https://i.postimg.cc/6Qw2bjjy/image-2026-06-02-194053208.png',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 5,
      title: 'Soccer Bros',
      description: 'Soccer game -_-',
      icon: '',
      image: 'https://i.postimg.cc/Bn0D9PRr/image-2026-06-03-181814312.png',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 6,
      title: 'Escape Road',
      description: 'Car game -_-',
      icon: '',
      image: 'https://i.postimg.cc/rmJZxLxN/image-2026-06-03-182855533.png',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 7,
      title: 'Game Slot 7',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 8,
      title: 'Game Slot 8',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 9,
      title: 'Game Slot 9',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 10,
      title: 'Game Slot 10',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 11,
      title: 'Game Slot 11',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 12,
      title: 'Game Slot 12',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 13,
      title: 'Game Slot 13',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 14,
      title: 'Game Slot 14',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 15,
      title: 'Game Slot 15',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 16,
      title: 'Game Slot 16',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 17,
      title: 'Game Slot 17',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 18,
      title: 'Game Slot 18',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 19,
      title: 'Game Slot 19',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 20,
      title: 'Game Slot 20',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 21,
      title: 'Game Slot 21',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 22,
      title: 'Game Slot 22',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 23,
      title: 'Game Slot 23',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 24,
      title: 'Game Slot 24',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 25,
      title: 'Game Slot 25',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 26,
      title: 'Game Slot 26',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 27,
      title: 'Game Slot 27',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 28,
      title: 'Game Slot 28',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 29,
      title: 'Game Slot 29',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 30,
      title: 'Game Slot 30',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 31,
      title: 'Game Slot 31',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 32,
      title: 'Game Slot 32',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 33,
      title: 'Game Slot 33',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 34,
      title: 'Game Slot 34',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 35,
      title: 'Game Slot 35',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 36,
      title: 'Game Slot 36',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 37,
      title: 'Game Slot 37',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 38,
      title: 'Game Slot 38',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 39,
      title: 'Game Slot 39',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 40,
      title: 'Game Slot 40',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 41,
      title: 'Game Slot 41',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 42,
      title: 'Game Slot 42',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 43,
      title: 'Game Slot 43',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 44,
      title: 'Game Slot 44',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 45,
      title: 'Game Slot 45',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 46,
      title: 'Game Slot 46',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 47,
      title: 'Game Slot 47',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 48,
      title: 'Game Slot 48',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 49,
      title: 'Game Slot 49',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    },
    {
      id: 50,
      title: 'Game Slot 50',
      description: 'Choose a game file from game_storage to configure this slot.',
      icon: '',
      image: '',
      thumbnailLink: '',
      thumbnailLabel: '',
      file: '',
      status: 'available'
    }
  ];

  // DOM Elements
  const proRoot = document.getElementById('proRoot');
  const accessDenied = document.getElementById('accessDenied');
  const gamesGrid = document.getElementById('gamesGrid');
  const gameSelection = document.getElementById('gameSelection');
  const gameViewer = document.getElementById('gameViewer');
  const gameFrame = document.getElementById('gameFrame');
  const gameLoading = document.getElementById('gameLoading');
  const currentGameTitle = document.getElementById('currentGameTitle');
  const closeBtn = document.getElementById('closeBtn');
  const closeGameBtn = document.getElementById('closeGameBtn');
  const backToGames = document.getElementById('backToGames');
  const openBlankBtn = document.getElementById('openBlankBtn');
  const manageGamesBtn = document.getElementById('manageGamesBtn');
  const carouselScrollbar = document.querySelector('.carousel-scrollbar-inner');

  // Panel Elements
  const panelOverlay = document.getElementById('panelOverlay');
  const slidePanel = document.getElementById('slidePanel');
  const panelTitle = document.getElementById('panelTitle');
  const panelContent = document.getElementById('panelContent');
  const closePanelBtn = document.getElementById('closePanelBtn');
  const actionButtons = document.querySelectorAll('.action-btn[data-panel]');

  // Panel State
  let currentPanel = null;

  // State
  let unlocked = false;
  let currentGame = null;
  let availableGameFiles = [];

  function getGameUrl(slot) {
    if (!slot || !slot.file) return '';
    return `${window.location.origin}/game_storage/${encodeURIComponent(slot.file)}`;
  }

  async function fetchGameFiles() {
    try {
      const response = await fetch('/api/game-files');
      if (!response.ok) throw new Error('Could not load game files');
      availableGameFiles = await response.json();
    } catch (error) {
      console.warn('Could not load available game files:', error);
      availableGameFiles = [];
    }
  }

  async function fetchGameConfig() {
    try {
      const response = await fetch('/api/game-config');
      if (!response.ok) throw new Error('Could not load game config');
      const config = await response.json();
      if (Array.isArray(config) && config.length) {
        GAME_SLOTS = config;
      }
    } catch (error) {
      console.warn('Could not load game configuration, using defaults:', error);
    }
  }

  async function saveGameConfig(config) {
    try {
      const response = await fetch('/api/game-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Could not save game configuration');
      }
      const result = await response.json();
      if (result.success) {
        GAME_SLOTS = result.data;
      }
      return result;
    } catch (error) {
      console.error('Could not save game configuration:', error);
      throw error;
    }
  }

  // ========================================
  // Access Control
  // ========================================

  function showAccessDenied() {
    window.location.replace('/login');
  }

  async function revealPro() {
    unlocked = true;
    accessDenied.classList.add('hidden');
    proRoot.classList.remove('hidden');
    proRoot.classList.add('fade-in');
    proRoot.setAttribute('aria-hidden', 'false');

    await Promise.all([fetchGameFiles(), fetchGameConfig()]);
    populateGames();
    setupEventListeners();
    updateScrollbarPosition();
  }

  // ========================================
  // Game Card Generation
  // ========================================

  function populateGames() {
    if (!gamesGrid) return;
    gamesGrid.innerHTML = '';

    GAME_SLOTS.forEach((slot, index) => {
      const card = createGameCard(slot, index);
      gamesGrid.appendChild(card);
    });
  }

  function openGameInNewTab(game) {
    const gameUrl = getGameUrl(game);
    if (!gameUrl) {
      alert('No game file is configured for this slot. Please manage the slot and choose a file from game_storage.');
      return;
    }

    const newWin = window.open('about:blank', '_blank');
    if (!newWin) {
      alert('Popup blocked. Please allow popups so games can open in a blank page.');
      return;
    }

    try {
      newWin.document.open();
      newWin.document.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${game.title}</title>
    <style>
      html, body { margin: 0; height: 100%; overflow: hidden; }
      iframe { border: 0; width: 100%; height: 100vh; }
    </style>
  </head>
  <body>
    <iframe src="${gameUrl}" title="${game.title}" allowfullscreen></iframe>
  </body>
</html>`);
      newWin.document.close();
      newWin.focus();
    } catch (error) {
      newWin.close();
      console.error('Could not open game in about:blank:', error);
      window.open(gameUrl, '_blank', 'noopener,noreferrer');
    }
  }

  function createGameCard(slot, index) {
    const card = document.createElement('article');
    card.className = 'game-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Play ${slot.title}`);
    card.style.animationDelay = `${index * 0.05}s`;

    const isConfigured = slot.file && slot.file.trim() !== '';
    const statusDotClass = slot.status === 'in-progress' ? 'in-progress' : '';
    const statusText = isConfigured ? (slot.status === 'in-progress' ? 'In Progress' : 'New') : 'Not Configured';
    const icon = slot.icon || '';

    card.innerHTML = `
      <div class="game-card-thumbnail">
        ${slot.image ? `<img src="${slot.image}" alt="${slot.title} thumbnail">` : `<span class="game-card-icon">${icon || '🎮'}</span>`}
        ${!isConfigured ? '<div class="not-configured-overlay">Coming Soon</div>' : ''}
      </div>
      <div class="game-card-content">
        <h3>${slot.title}</h3>
        <p>${slot.description}</p>
        <div class="game-card-meta">
          <span class="game-card-status">
            <span class="game-card-status-dot ${statusDotClass}"></span>
            ${statusText}
          </span>
          ${isConfigured ? `
            <span class="game-card-play-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              Play
            </span>
          ` : ''}
        </div>
      </div>
      <button class="game-card-edit-btn" type="button" aria-label="Edit ${slot.title} slot">Edit</button>
    `;

    const editButton = card.querySelector('.game-card-edit-btn');
    if (editButton) {
      editButton.addEventListener('click', (event) => {
        event.stopPropagation();
        openGameSlotEditor(slot, index);
      });
    }

    if (isConfigured) {
      card.addEventListener('click', () => openGameInNewTab(slot));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openGameInNewTab(slot);
        }
      });
    } else {
      card.style.opacity = '0.5';
      card.style.cursor = 'not-allowed';
    }

    return card;
  }

  // ========================================
  // Game Viewer Management
  // ========================================

  function loadGame(game) {
    currentGame = game;
    currentGameTitle.textContent = game.title;

    // Show loading state
    gameLoading.classList.remove('hidden');

    // Load game from selected game file
    gameFrame.src = getGameUrl(game);
    gameFrame.title = game.title;

    // Show viewer, hide selection
    gameSelection.classList.add('hidden');
    gameViewer.classList.remove('hidden');

    // Focus the iframe after a short delay
    setTimeout(() => {
      gameFrame.focus();
    }, 100);
  }

  function closeGame() {
    // Stop the game by clearing iframe src
    gameFrame.src = 'about:blank';

    // Reset state
    currentGame = null;
    currentGameTitle.textContent = 'Game Title';

    // Hide loading for next game
    gameLoading.classList.add('hidden');

    // Hide viewer, show selection
    gameViewer.classList.add('hidden');
    gameSelection.classList.remove('hidden');

    // Scroll to top of games section
    gameSelection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleIframeLoad() {
    // Hide loading when iframe finishes loading
    gameLoading.classList.add('hidden');
  }

  // ========================================
  // Scrollbar Position Update
  // ========================================

  function updateScrollbarPosition() {
    if (!gamesGrid || !carouselScrollbar) return;

    gamesGrid.addEventListener('scroll', () => {
      const scrollPercentage = gamesGrid.scrollLeft / (gamesGrid.scrollWidth - gamesGrid.clientWidth);
      carouselScrollbar.style.transform = `translateX(${scrollPercentage * 70}%)`;
    });
  }

  // ========================================
  // Event Listeners
  // ========================================

  // ========================================
  // Panel Management
  // ========================================

  const PANEL_CONTENT = {
    settings: {
      title: 'Settings',
      content: `
        <div class="panel-section">
          <h4 class="panel-section-title">Preferences</h4>
          <div class="toggle-item">
            <div class="toggle-label">
              <span class="toggle-label-text">Dark Mode</span>
              <span class="toggle-label-desc">Easy on the eyes</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="toggleDarkMode" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <div class="toggle-label">
              <span class="toggle-label-text">Sound Effects</span>
              <span class="toggle-label-desc">Game audio and effects</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="toggleSound" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <div class="toggle-label">
              <span class="toggle-label-text">Animations</span>
              <span class="toggle-label-desc">Smooth transitions</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="toggleAnimations" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <div class="toggle-label">
              <span class="toggle-label-text">Compact Mode</span>
              <span class="toggle-label-desc">Smaller UI elements</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="toggleCompact">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="panel-section">
          <h4 class="panel-section-title">Theme</h4>
          <div class="theme-selector">
            <div class="theme-option selected" data-theme="dark">
              <span class="theme-option-icon">🌙</span>
              Dark
            </div>
            <div class="theme-option" data-theme="light">
              <span class="theme-option-icon">☀️</span>
              Light
            </div>
            <div class="theme-option" data-theme="auto">
              <span class="theme-option-icon">🔄</span>
              Auto
            </div>
          </div>
        </div>
        <button class="panel-btn panel-btn-primary" id="saveSettingsBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Save Settings
        </button>
      `
    },
    help: {
      title: 'Help',
      content: `
        <div class="help-section">
          <h4>Getting Started</h4>
          <p>Click on any game card to start playing. Use the action buttons below for quick access to settings, chat, and more.</p>
        </div>
        <div class="help-section">
          <h4>How to Play</h4>
          <p>Select a game from the carousel. It will open in a new tab for full-screen play. Return to the launcher tab to choose another game.</p>
        </div>
        <div class="help-section">
          <h4>Keyboard Shortcuts</h4>
          <p><strong>ESC</strong> - Close the current panel<br>
          <strong>Left/Right Arrow</strong> - Scroll through games</p>
        </div>
        <div class="help-section">
          <h4>Contact Support</h4>
          <p>Need help? Reach out to our support team at <a href="mailto:support@example.com" class="help-link">support@example.com</a></p>
        </div>
      `
    },
    chat: {
      title: 'Chat',
      content: `
        <div class="chat-messages" id="chatMessages">
          <div class="chat-message chat-system-message">
            <div class="chat-message-content chat-system-text">
              <div class="chat-message-text">Welcome to the global chat! Messages you send here will be visible to all users in real-time.</div>
            </div>
          </div>
        </div>
        <div class="chat-input-wrapper">
          <input type="text" class="chat-input" id="chatInput" placeholder="Type a message...">
          <button class="chat-send-btn" id="chatSendBtn">Send</button>
        </div>
      `
    },
    store: {
      title: 'Store',
      content: `
        <div class="store-item">
          <div class="store-item-info">
            <div class="store-item-name">Badge Pack</div>
            <div class="store-item-desc">5 exclusive badges for your achievements</div>
            <span class="store-item-price">100 points</span>
          </div>
        </div>
        <div class="store-item">
          <div class="store-item-info">
            <div class="store-item-name">Custom Theme</div>
            <div class="store-item-desc">Unlock custom color themes</div>
            <span class="store-item-price">250 points</span>
          </div>
        </div>
        <div class="store-item">
          <div class="store-item-info">
            <div class="store-item-name">XP Booster</div>
            <div class="store-item-desc">2x experience for 7 days</div>
            <span class="store-item-price">500 points</span>
          </div>
        </div>
        <div class="store-item">
          <div class="store-item-info">
            <div class="store-item-name">VIP Membership</div>
            <div class="store-item-desc">Access to exclusive games</div>
            <span class="store-item-price">1000 points</span>
          </div>
        </div>
      `
    },
    community: {
      title: 'Community',
      content: `
        <div class="panel-section">
          <h4 class="panel-section-title">Stats</h4>
          <div class="community-stat">
            <div class="community-stat-value">12,450</div>
            <div class="community-stat-label">Active Players</div>
          </div>
          <div class="community-stat">
            <div class="community-stat-value">89,320</div>
            <div class="community-stat-label">Games Played Today</div>
          </div>
          <div class="community-stat">
            <div class="community-stat-value">1,240</div>
            <div class="community-stat-label">Achievements Unlocked</div>
          </div>
          <div class="community-stat">
            <div class="community-stat-value">Top 1%</div>
            <div class="community-stat-label">Your Ranking</div>
          </div>
        </div>
        <div class="panel-section">
          <h4 class="panel-section-title">Connect</h4>
          <div class="theme-selector">
            <a href="#" class="theme-option">Discord</a>
            <a href="#" class="theme-option">Twitter</a>
            <a href="#" class="theme-option">YouTube</a>
          </div>
        </div>
      `
    },
    manage: {
      title: 'Manage Games',
      content: `
        <div class="panel-section">
          <h4 class="panel-section-title">Manage Your Slots</h4>
          <p>Select a slot to choose a game file from the game_storage folder and edit metadata for the Game Launcher.</p>
          <div class="panel-field">
            <label for="manageSlotSelect">Choose slot</label>
            <select id="manageSlotSelect" class="panel-input"></select>
          </div>
        </div>
        <div id="manageSlotEditor"></div>
      `
    }
  };

  function openPanel(panelType) {
    const panelData = PANEL_CONTENT[panelType];
    if (!panelData) return;

    currentPanel = panelType;
    panelTitle.textContent = panelData.title;
    panelContent.innerHTML = panelData.content;

    // Show panel and overlay
    panelOverlay.classList.remove('hidden');
    // Small delay to allow display:block to apply before opacity transition
    requestAnimationFrame(() => {
      panelOverlay.classList.add('visible');
    });
    slidePanel.classList.add('open');
    slidePanel.setAttribute('aria-hidden', 'false');

    // Setup panel-specific event listeners
    setupPanelListeners(panelType);
  }

  function openGameSlotEditor(slot, index) {
    openPanel('manage');
    const slotSelect = document.getElementById('manageSlotSelect');
    if (slotSelect) {
      slotSelect.value = index;
      slotSelect.dispatchEvent(new Event('change'));
    }
  }

  function renderGameSlotEditor(index) {
    const editor = document.getElementById('manageSlotEditor');
    const slot = GAME_SLOTS[index];
    if (!editor || !slot) return;

    const fileOptions = ['<option value="">Choose a game file...</option>']
      .concat(availableGameFiles.map(file => {
        const selected = file === slot.file ? ' selected' : '';
        return `<option value="${escapeHtml(file)}"${selected}>${escapeHtml(file)}</option>`;
      }))
      .join('');

    editor.innerHTML = `
      <div class="panel-section">
        <div class="panel-field">
          <label for="gameFileSelect">Game file</label>
          <select id="gameFileSelect" class="panel-input">${fileOptions}</select>
        </div>
        <div class="panel-field">
          <label for="gameTitleInput">Title</label>
          <input id="gameTitleInput" class="panel-input" type="text" value="${escapeHtml(slot.title || '')}" />
        </div>
        <div class="panel-field">
          <label for="gameDescriptionInput">Description</label>
          <textarea id="gameDescriptionInput" class="panel-input">${escapeHtml(slot.description || '')}</textarea>
        </div>
        <div class="panel-field">
          <label for="gameIconInput">Icon</label>
          <input id="gameIconInput" class="panel-input" type="text" value="${escapeHtml(slot.icon || '')}" placeholder="Emoji or short icon text" />
        </div>
        <div class="panel-field">
          <label for="gameImageInput">Thumbnail image URL</label>
          <input id="gameImageInput" class="panel-input" type="text" value="${escapeHtml(slot.image || '')}" placeholder="Optional image URL" />
        </div>
        <div class="panel-field">
          <label for="gameThumbnailLinkInput">Thumbnail link</label>
          <input id="gameThumbnailLinkInput" class="panel-input" type="text" value="${escapeHtml(slot.thumbnailLink || '')}" placeholder="Optional link" />
        </div>
        <div class="panel-field">
          <label for="gameThumbnailLabelInput">Thumbnail label</label>
          <input id="gameThumbnailLabelInput" class="panel-input" type="text" value="${escapeHtml(slot.thumbnailLabel || '')}" placeholder="Optional label" />
        </div>
        <div class="panel-field">
          <label for="gameStatusSelect">Status</label>
          <select id="gameStatusSelect" class="panel-input">
            <option value="available"${slot.status === 'available' ? ' selected' : ''}>Available</option>
            <option value="in-progress"${slot.status === 'in-progress' ? ' selected' : ''}>In Progress</option>
            <option value="coming-soon"${slot.status === 'coming-soon' ? ' selected' : ''}>Coming Soon</option>
            <option value="unavailable"${slot.status === 'unavailable' ? ' selected' : ''}>Unavailable</option>
          </select>
        </div>
        <div class="panel-actions">
          <button id="saveGameSlotBtn" class="panel-btn panel-btn-primary">Save Slot</button>
          <button id="cancelGameSlotBtn" class="panel-btn">Cancel</button>
        </div>
        <div id="gameSlotMessage" class="panel-message"></div>
      </div>
    `;

    setupGameSlotEditorListeners(index);
  }

  function setupGameSlotEditorListeners(index) {
    const slot = GAME_SLOTS[index];
    if (!slot) return;

    const fileSelect = document.getElementById('gameFileSelect');
    const titleInput = document.getElementById('gameTitleInput');
    const descriptionInput = document.getElementById('gameDescriptionInput');
    const iconInput = document.getElementById('gameIconInput');
    const imageInput = document.getElementById('gameImageInput');
    const thumbnailLinkInput = document.getElementById('gameThumbnailLinkInput');
    const thumbnailLabelInput = document.getElementById('gameThumbnailLabelInput');
    const statusSelect = document.getElementById('gameStatusSelect');
    const saveBtn = document.getElementById('saveGameSlotBtn');
    const cancelBtn = document.getElementById('cancelGameSlotBtn');
    const messageEl = document.getElementById('gameSlotMessage');

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        closePanel();
      });
    }

    if (!saveBtn) return;

    saveBtn.addEventListener('click', async () => {
      const updatedSlot = {
        ...slot,
        title: titleInput?.value.trim() || slot.title,
        description: descriptionInput?.value.trim() || slot.description,
        icon: iconInput?.value.trim(),
        image: imageInput?.value.trim(),
        thumbnailLink: thumbnailLinkInput?.value.trim(),
        thumbnailLabel: thumbnailLabelInput?.value.trim(),
        status: statusSelect?.value || slot.status,
        file: fileSelect?.value.trim() || ''
      };

      GAME_SLOTS[index] = updatedSlot;
      try {
        await saveGameConfig(GAME_SLOTS);
        messageEl.textContent = 'Slot saved successfully.';
        messageEl.className = 'panel-message panel-message-success';
        populateGames();
      } catch (error) {
        messageEl.textContent = 'Could not save slot. Please try again.';
        messageEl.className = 'panel-message panel-message-error';
      }
    });
  }

  function renderManagePanel() {
    const slotSelect = document.getElementById('manageSlotSelect');
    const editor = document.getElementById('manageSlotEditor');

    if (!slotSelect || !editor) return;

    slotSelect.innerHTML = GAME_SLOTS.map((slot, index) => {
      const title = slot.title || `Game Slot ${index + 1}`;
      return `<option value="${index}">${slot.id || index + 1}: ${escapeHtml(title)}</option>`;
    }).join('');

    slotSelect.addEventListener('change', () => {
      renderGameSlotEditor(Number(slotSelect.value));
    });

    renderGameSlotEditor(Number(slotSelect.value) || 0);
  }

  function closePanel() {
    panelOverlay.classList.remove('visible');
    slidePanel.classList.remove('open');
    slidePanel.setAttribute('aria-hidden', 'true');

    setTimeout(() => {
      panelOverlay.classList.add('hidden');
      currentPanel = null;
    }, 300);
  }

  // ========================================
  // Real-time Chat System with Flask-SocketIO
  // ========================================

  let socket = null;
  let chatConnected = false;
  let typingTimeout = null;

  // Get user identity - use server-provided username or fallback
  function getCurrentUser() {
    const serverUsername = window.PRO_USERNAME || null;
    
    if (serverUsername) {
      // Use server-provided username
      const initials = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W'];
      return {
        id: 'user_' + serverUsername,
        name: serverUsername,
        avatar: serverUsername.charAt(0).toUpperCase()
      };
    }
    
    // Fallback to localStorage-based identity
    try {
      const saved = localStorage.getItem('proCurrentUser');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    
    // Generate random identity
    const initials = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W'];
    const user = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: 'User' + Math.floor(Math.random() * 1000),
      avatar: initials[Math.floor(Math.random() * initials.length)]
    };
    try {
      localStorage.setItem('proCurrentUser', JSON.stringify(user));
    } catch (e) {
      // ignore
    }
    return user;
  }

  // Initialize Socket.IO connection
  function initSocketIO() {
    if (socket) return;
    
    // Connect to Socket.IO server using long-polling
    socket = io({
      transports: ['polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10
    });

    // Connection established
    socket.on('connect', function() {
      console.log('Connected to chat server');
      chatConnected = true;
      
      // Join the chat room and send user info
      const user = getCurrentUser();
      socket.emit('join_chat', {
        username: user.name,
        avatar: user.avatar
      });
      
      updateChatConnectionStatus(true);
    });

    // Disconnected
    socket.on('disconnect', function() {
      console.log('Disconnected from chat server');
      chatConnected = false;
      updateChatConnectionStatus(false);
    });

    // Connection error
    socket.on('connect_error', function(error) {
      console.error('Chat connection error:', error);
      chatConnected = false;
      updateChatConnectionStatus(false);
    });

    // Receive chat history when joining.
    // Note: the chat panel now loads history via REST when opened to avoid race conditions.
    socket.on('chat_history', function(data) {
      const chatMessages = document.getElementById('chatMessages');
      if (chatMessages && currentPanel === 'chat') {
        // Only render if UI already exists; otherwise it will be loaded when the panel opens.
        chatMessages.innerHTML = '';
        data.messages.forEach(msg => {
          appendChatMessage({
            name: msg.username,
            avatar: msg.avatar,
            text: msg.message,
            timestamp: msg.timestamp
          });
        });
      }
    });

    // Receive new message
    socket.on('new_message', function(data) {
      if (currentPanel === 'chat') {
        appendChatMessage({
          name: data.username,
          avatar: data.avatar,
          text: data.message,
          timestamp: data.timestamp
        });
      }
    });

    // User typing indicator
    socket.on('user_typing', function(data) {
      // Could show typing indicator here if desired
    });
  }

  // Update chat connection status indicator
  function updateChatConnectionStatus(connected) {
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    if (connected) {
      if (chatInput) chatInput.disabled = false;
      if (chatSendBtn) chatSendBtn.disabled = false;
    } else {
      if (chatInput) chatInput.disabled = true;
      if (chatSendBtn) chatSendBtn.disabled = true;
      if (chatMessages) {
        // Show connection status
        const statusDiv = document.createElement('div');
        statusDiv.className = 'chat-status-message';
        statusDiv.textContent = 'Connecting to chat...';
        chatMessages.appendChild(statusDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
  }

  // Append a message to the chat display
  function appendChatMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    // Remove connection status if present
    const statusMsg = chatMessages.querySelector('.chat-status-message');
    if (statusMsg) statusMsg.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    
    // Format timestamp if available
    let timeDisplay = '';
    if (message.timestamp) {
      try {
        const date = new Date(message.timestamp);
        timeDisplay = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        timeDisplay = '';
      }
    }
    
    messageDiv.innerHTML = `
      <div class="chat-message-avatar">${message.avatar}</div>
      <div class="chat-message-content">
        <div class="chat-message-header">
          <div class="chat-message-name">${escapeHtml(message.name)}</div>
          ${timeDisplay ? `<div class="chat-message-time">${timeDisplay}</div>` : ''}
        </div>
        <div class="chat-message-text">${escapeHtml(message.text)}</div>
      </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Send a chat message via Socket.IO
  function sendChatMessage(text) {
    if (!socket || !chatConnected) {
      console.warn('Not connected to chat server');
      return;
    }
    
    const user = getCurrentUser();
    socket.emit('send_message', {
      username: user.name,
      avatar: user.avatar,
      message: text
    });
  }

  // Send typing indicator
  function sendTypingIndicator() {
    if (!socket || !chatConnected) return;
    
    const user = getCurrentUser();
    socket.emit('typing', { username: user.name });
  }

  // ========================================
  // Settings Management
  // ========================================

  // Default settings
  const DEFAULT_SETTINGS = {
    darkMode: true,
    soundEnabled: true,
    animationsEnabled: true,
    compactMode: false,
    theme: 'dark'
  };

  // Load settings from localStorage
  function loadSettings() {
    try {
      const saved = localStorage.getItem('proSettings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : { ...DEFAULT_SETTINGS };
    } catch (e) {
      return { ...DEFAULT_SETTINGS };
    }
  }

  // Save settings to localStorage
  function saveSettings(settings) {
    try {
      localStorage.setItem('proSettings', JSON.stringify(settings));
      applySettings(settings);
      return true;
    } catch (e) {
      console.error('Failed to save settings:', e);
      return false;
    }
  }

  // Apply settings to the page
  function applySettings(settings) {
    const root = document.documentElement;

    // Dark mode
    if (settings.darkMode) {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    } else {
      root.classList.remove('dark-mode');
      root.classList.add('light-mode');
    }

    // Compact mode
    if (settings.compactMode) {
      root.classList.add('compact-mode');
    } else {
      root.classList.remove('compact-mode');
    }

    // Theme-specific styles
    switch (settings.theme) {
      case 'dark':
        root.setAttribute('data-theme', 'dark');
        break;
      case 'light':
        root.setAttribute('data-theme', 'light');
        break;
      case 'auto':
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        break;
    }

    // Sound enabled (store for game use)
    root.setAttribute('data-sound', settings.soundEnabled.toString());

    // Animations (store for CSS/GSAP use)
    if (!settings.animationsEnabled) {
      root.style.setProperty('--pro-transition', 'none');
    } else {
      root.style.removeProperty('--pro-transition');
    }
  }

  // Current settings state
  let currentSettings = loadSettings();
  applySettings(currentSettings);

  // Initialize Socket.IO when the page loads
  // This ensures the chat connection is ready when the user opens the chat panel
  document.addEventListener('DOMContentLoaded', function() {
    initSocketIO();
  });

  // Legacy function for backwards compatibility (now a no-op)
  function setupChatStorageListener() {
    // Socket.IO handles real-time updates now
  }

  async function loadChatHistoryIntoUI(limit = 20) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    // Optional: show loading state
    const existingStatus = chatMessages.querySelector('.chat-status-message');
    if (existingStatus) existingStatus.remove();

    const statusDiv = document.createElement('div');
    statusDiv.className = 'chat-status-message';
    statusDiv.textContent = 'Loading chat...';
    chatMessages.appendChild(statusDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const res = await fetch(`/api/chat/messages?limit=${encodeURIComponent(limit)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const messages = await res.json();

      chatMessages.innerHTML = '';
      messages.forEach(msg => {
        appendChatMessage({
          name: msg.username,
          avatar: msg.avatar,
          text: msg.message,
          timestamp: msg.timestamp
        });
      });
    } catch (e) {
      console.error('Failed to load chat history:', e);
      chatMessages.innerHTML = '';

      const errDiv = document.createElement('div');
      errDiv.className = 'chat-status-message';
      errDiv.textContent = 'Failed to load messages. Retrying soon...';
      chatMessages.appendChild(errDiv);
    }
  }

  // Legacy function for backwards compatibility
  function renderChatMessages() {
    // Chat messages are now loaded via REST when the chat panel opens.
  }

  // Legacy function for backwards compatibility
  function broadcastChatMessage(message) {
    // Use Socket.IO instead
    sendChatMessage(message.text);
  }

  function setupPanelListeners(panelType) {
    // Settings panel
    if (panelType === 'settings') {
      // Load current settings into toggles
      const darkModeToggle = document.getElementById('toggleDarkMode');
      const soundToggle = document.getElementById('toggleSound');
      const animationsToggle = document.getElementById('toggleAnimations');
      const compactToggle = document.getElementById('toggleCompact');

      if (darkModeToggle) darkModeToggle.checked = currentSettings.darkMode;
      if (soundToggle) soundToggle.checked = currentSettings.soundEnabled;
      if (animationsToggle) animationsToggle.checked = currentSettings.animationsEnabled;
      if (compactToggle) compactToggle.checked = currentSettings.compactMode;

      // Theme selector - set current selection
      const themeOptions = document.querySelectorAll('.theme-option');
      themeOptions.forEach(option => {
        if (option.dataset.theme === currentSettings.theme) {
          option.classList.add('selected');
        }
      });

      // Toggle event listeners
      if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (e) => {
          currentSettings.darkMode = e.target.checked;
        });
      }

      if (soundToggle) {
        soundToggle.addEventListener('change', (e) => {
          currentSettings.soundEnabled = e.target.checked;
        });
      }

      if (animationsToggle) {
        animationsToggle.addEventListener('change', (e) => {
          currentSettings.animationsEnabled = e.target.checked;
        });
      }

      if (compactToggle) {
        compactToggle.addEventListener('change', (e) => {
          currentSettings.compactMode = e.target.checked;
        });
      }

      // Save button
      const saveBtn = document.getElementById('saveSettingsBtn');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          const success = saveSettings(currentSettings);

          if (success) {
            saveBtn.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Settings Saved!
            `;
            saveBtn.style.background = '#22c55e';
            setTimeout(() => {
              saveBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Save Settings
              `;
              saveBtn.style.background = '';
            }, 2000);
          }
        });
      }

      // Theme selector event listeners
      themeOptions.forEach(option => {
        option.addEventListener('click', () => {
          themeOptions.forEach(o => o.classList.remove('selected'));
          option.classList.add('selected');
          currentSettings.theme = option.dataset.theme;
        });
      });
    }

    // Manage panel
    if (panelType === 'manage') {
      renderManagePanel();
    }

    // Chat panel
    if (panelType === 'chat') {
      const chatInput = document.getElementById('chatInput');
      const chatSendBtn = document.getElementById('chatSendBtn');

      // Always load last 20 messages when the panel opens.
      // This avoids race conditions where socket 'chat_history' arrives before the UI exists.
      loadChatHistoryIntoUI(20);

      function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        const user = getCurrentUser();
        const chatMessage = {
          id: 'msg_' + Date.now(),
          userId: user.id,
          name: user.name,
          avatar: user.avatar,
          text: message,
          timestamp: new Date().toISOString()
        };

        // Broadcast to all tabs (including this one)
        broadcastChatMessage(chatMessage);

        chatInput.value = '';
      }

      if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendMessage);
      }
      if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') sendMessage();
        });
      }
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function setupEventListeners() {
    // Close game button
    if (closeGameBtn) {
      closeGameBtn.addEventListener('click', closeGame);
    }

    // Back to games button
    if (backToGames) {
      backToGames.addEventListener('click', closeGame);
    }

    // Exit Game Launcher button
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        window.location.replace('/');
      });
    }

    // Iframe load event
    gameFrame.addEventListener('load', handleIframeLoad);

    // ESC key to close game or panel
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (currentPanel) {
          closePanel();
        } else if (currentGame) {
          closeGame();
        }
      }
    });

    // Horizontal scroll with mouse wheel
    if (gamesGrid) {
      gamesGrid.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0 && Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
          e.preventDefault();
          gamesGrid.scrollLeft += e.deltaY;
        }
      }, { passive: false });
    }

    // Action buttons for panels
    actionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const panelType = btn.getAttribute('data-panel');
        openPanel(panelType);
      });
    });

    // Close panel button
    if (closePanelBtn) {
      closePanelBtn.addEventListener('click', closePanel);
    }

    // Close panel when clicking overlay
    if (panelOverlay) {
      panelOverlay.addEventListener('click', closePanel);
    }

    if (manageGamesBtn) {
      manageGamesBtn.addEventListener('click', () => openPanel('manage'));
    }

    // Open the Game Launcher inside an about:blank tab
    if (openBlankBtn) {
      openBlankBtn.addEventListener('click', () => {
        const newWin = window.open('about:blank', '_blank');
        if (!newWin) return;

        const proUrl = `${window.location.origin}/learn`;
        newWin.document.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Game Launcher</title>
    <style>
      html, body { margin: 0; height: 100%; overflow: hidden; }
      iframe { border: 0; width: 100%; height: 100vh; }
    </style>
  </head>
  <body>
    <iframe src="${proUrl}" title="Game Launcher"></iframe>
  </body>
</html>`);
        newWin.document.close();
      });
    }
  }

  // ========================================
  // Initialization
  // ========================================

  // Server already verified authentication before serving this page.
  document.addEventListener('DOMContentLoaded', revealPro);
})();