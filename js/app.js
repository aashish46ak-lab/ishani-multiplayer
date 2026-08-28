const GAME_MAP = {
  memory: MemoryGame, tictactoe: TicTacToe, connect4: Connect4, rps: RPS,
  dots: DotsGame, checkers: Checkers, snake: SnakeDuel, pong: PongGame,
  airhockey: AirHockey, battleship: Battleship, carrom: CarromGame,
  ludo: LudoGame, snakesladders: SnakesLadders, simon: SimonGame,
  hangman: HangmanGame, react: ReactDuel
};
let currentId = null, currentInstance = null;
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function renderHome(filter = '') {
  const grid = document.getElementById('games-grid');
  grid.innerHTML = '';
  const q = filter.toLowerCase().trim();
  GAMES.filter(g => !q || g.name.toLowerCase().includes(q) || g.tags.some(t => t.toLowerCase().includes(q))).forEach(g => {
    const card = document.createElement('article');
    card.className = 'game-card';
    card.innerHTML = '<div class="card-art" style="background:' + g.color + '"><span class="card-emoji">' + g.emoji + '</span></div><div class="card-body"><h3>' + g.name + '</h3><p>' + g.desc.slice(0, 42) + '...</p><div class="card-tags">' + g.tags.map(t => '<span class="tag">' + t + '</span>').join('') + '</div></div>';
    card.addEventListener('click', () => openDetail(g));
    grid.appendChild(card);
  });
}
function openDetail(g) {
  currentId = g.id;
  document.getElementById('detail-art').style.background = g.color;
  document.getElementById('detail-art').textContent = g.emoji;
  document.getElementById('detail-title').textContent = g.name;
  document.getElementById('detail-desc').textContent = g.desc;
  document.getElementById('detail-meta').innerHTML = '<span class="tag">' + g.players + '</span><span class="tag">' + g.difficulty + '</span>';
  showScreen('detail');
}
function startGame(mode) {
  Engine.mode = mode;
  document.getElementById('red-name').textContent = 'Red';
  document.getElementById('blue-name').textContent = mode === 'bot' ? 'Bot' : 'Blue';
  document.getElementById('play-title').textContent = (GAMES.find(g => g.id === currentId) || {}).name || '';
  if (currentInstance && currentInstance.stop) currentInstance.stop();
  const game = GAME_MAP[currentId];
  if (!game) return;
  currentInstance = game;
  Engine.hideResult();
  showScreen('play');
  game.start();
}
document.getElementById('detail-back').addEventListener('click', () => showScreen('home'));
document.getElementById('play-back').addEventListener('click', () => { if (currentInstance && currentInstance.stop) currentInstance.stop(); showScreen('detail'); });
document.getElementById('btn-friend').addEventListener('click', () => startGame('friend'));
document.getElementById('btn-bot').addEventListener('click', () => startGame('bot'));
document.getElementById('btn-restart').addEventListener('click', () => { if (currentInstance) { if (currentInstance.stop) currentInstance.stop(); currentInstance.start(); } });
document.getElementById('result-rematch').addEventListener('click', () => { Engine.hideResult(); if (currentInstance) { if (currentInstance.stop) currentInstance.stop(); currentInstance.start(); } });
document.getElementById('result-home').addEventListener('click', () => { Engine.hideResult(); if (currentInstance && currentInstance.stop) currentInstance.stop(); showScreen('home'); });
document.getElementById('search-games').addEventListener('input', e => renderHome(e.target.value));
renderHome();
document.getElementById('games-count').textContent = GAMES.length + ' Games';
(function hideSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  const minTime = 2000, start = performance.now();
  function done() {
    const wait = Math.max(0, minTime - (performance.now() - start));
    setTimeout(() => { splash.classList.add('hide'); setTimeout(() => splash.remove(), 700); }, wait);
  }
  if (document.readyState === 'complete') done(); else window.addEventListener('load', done);
})();
