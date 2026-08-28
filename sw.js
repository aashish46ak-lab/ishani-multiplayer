const CACHE = 'ishani-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/games-data.js',
  './js/engine.js',
  './js/app.js',
  './js/games/memory.js',
  './js/games/tictactoe.js',
  './js/games/connect4.js',
  './js/games/rps.js',
  './js/games/dots.js',
  './js/games/checkers.js',
  './js/games/snake.js',
  './js/games/pong.js',
  './js/games/airhockey.js',
  './js/games/battleship.js',
  './js/games/carrom.js',
  './js/games/ludo.js',
  './js/games/snakesladders.js',
  './js/games/simon.js',
  './js/games/hangman.js',
  './js/games/react.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
