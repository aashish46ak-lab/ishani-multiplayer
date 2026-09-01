const GAME_MAP = {
  memory: typeof MemoryGame !== 'undefined' ? MemoryGame : null,
  tictactoe: typeof TicTacToe !== 'undefined' ? TicTacToe : null,
  connect4: typeof Connect4 !== 'undefined' ? Connect4 : null,
  rps: typeof RPS !== 'undefined' ? RPS : null,
  dots: typeof DotsGame !== 'undefined' ? DotsGame : null,
  checkers: typeof Checkers !== 'undefined' ? Checkers : null,
  snake: typeof SnakeDuel !== 'undefined' ? SnakeDuel : null,
  pong: typeof PongGame !== 'undefined' ? PongGame : null,
  airhockey: typeof AirHockey !== 'undefined' ? AirHockey : null,
  battleship: typeof Battleship !== 'undefined' ? Battleship : null,
  carrom: typeof CarromGame !== 'undefined' ? CarromGame : null,
  ludo: typeof LudoGame !== 'undefined' ? LudoGame : null,
  snakesladders: typeof SnakesLadders !== 'undefined' ? SnakesLadders : null,
  simon: typeof SimonGame !== 'undefined' ? SimonGame : null,
  hangman: typeof HangmanGame !== 'undefined' ? HangmanGame : null,
  react: typeof ReactDuel !== 'undefined' ? ReactDuel : null
};
const Profile = {
  key: 'ishani_profile_v1',
  data: { name: 'Player', avatar: '🎮', gamesPlayed: 0, wins: 0, lastPlay: null, streak: 1 },
  load() {
    try { const s = localStorage.getItem(this.key); if (s) this.data = { ...this.data, ...JSON.parse(s) }; } catch(e){}
    const today = new Date().toDateString();
    if (!this.data.lastPlay) { this.data.streak = 1; this.data.lastPlay = today; }
    else if (this.data.lastPlay !== today) {
      const d = Math.round((new Date(today) - new Date(this.data.lastPlay)) / 86400000);
      this.data.streak = d === 1 ? (this.data.streak||0)+1 : 1;
      this.data.lastPlay = today;
    }
    if (this.data.streak < 1) this.data.streak = 1;
    this.save(); this.render();
  },
  save() { try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch(e){} },
  recordPlay(won) {
    this.data.gamesPlayed = (this.data.gamesPlayed||0)+1;
    if (won) this.data.wins = (this.data.wins||0)+1;
    this.data.lastPlay = new Date().toDateString();
    this.save(); this.render();
  },
  render() {
    const n = document.getElementById('profile-name-display');
    const a = document.getElementById('profile-avatar-display');
    const s = document.getElementById('streak-count');
    const act = document.getElementById('activity-text');
    if (n) n.textContent = this.data.name || 'Player';
    if (a) a.textContent = this.data.avatar || '🎮';
    if (s) s.textContent = String(this.data.streak || 1);
    if (act) act.textContent = (this.data.gamesPlayed || 0) ? this.data.gamesPlayed + ' games played' : 'Start playing!';
    const pn = document.getElementById('pf-name'), pa = document.getElementById('pf-avatar');
    if (pn) pn.value = this.data.name || '';
    if (pa) pa.value = this.data.avatar || '🎮';
    const stats = document.getElementById('pf-stats');
    if (stats) stats.innerHTML = '<span>'+(this.data.gamesPlayed||0)+' played</span><span>'+(this.data.wins||0)+' wins</span><span>🔥 '+(this.data.streak||1)+' day</span>';
  },
  open() { document.getElementById('profile-sheet').classList.remove('hidden'); this.render(); },
  close() { document.getElementById('profile-sheet').classList.add('hidden'); },
  saveFromForm() {
    this.data.name = (document.getElementById('pf-name').value || 'Player').trim().slice(0,20) || 'Player';
    this.data.avatar = (document.getElementById('pf-avatar').value || '🎮').trim().slice(0,4) || '🎮';
    this.save(); this.render(); this.close();
  }
};
let currentId = null, currentInstance = null;
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}
function renderHome(filter = '') {
  const grid = document.getElementById('games-grid');
  grid.innerHTML = '';
  const q = filter.toLowerCase().trim();
  GAMES.filter(g =>
    !q || g.name.toLowerCase().includes(q) || (g.tags && g.tags.some(t => t.toLowerCase().includes(q)))
  ).forEach(g => {
    const card = document.createElement('article');
    card.className = 'game-card';
    card.innerHTML =
      '<div class="card-art">' +
      (g.image ? '<img class="card-preview" src="' + g.image + '" alt="' + g.name + '" loading="lazy"/>' : '') +
      '<div class="card-shine"></div></div>' +
      '<div class="card-body"><h3>' + g.name + '</h3><p>' + g.desc + '</p>' +
      '<div class="card-tags">' + (g.tags||[]).map(t => '<span class="tag">' + t + '</span>').join('') + '</div></div>';
    card.addEventListener('click', () => openDetail(g));
    grid.appendChild(card);
  });
}
function openDetail(g) {
  currentId = g.id;
  const art = document.getElementById('detail-art');
  art.style.background = g.color || '#1a1730';
  art.innerHTML = g.image
    ? '<img class="detail-preview" src="' + g.image + '" alt="' + g.name + '"/>'
    : '';
  document.getElementById('detail-title').textContent = g.name;
  document.getElementById('detail-desc').textContent = g.desc;
  document.getElementById('detail-meta').innerHTML =
    '<span class="tag">' + g.players + '</span><span class="tag">' + g.difficulty + '</span>' +
    (g.tags||[]).map(t => '<span class="tag">' + t + '</span>').join('');
  showScreen('detail');
}
function startGame(mode) {
  Engine.mode = mode;
  document.getElementById('red-name').textContent = Profile.data.name || 'Red';
  document.getElementById('blue-name').textContent = mode === 'bot' ? 'Bot' : 'Friend';
  document.getElementById('play-title').textContent = (GAMES.find(g => g.id === currentId) || {}).name || '';
  if (currentInstance && currentInstance.stop) currentInstance.stop();
  const game = GAME_MAP[currentId];
  if (!game) { alert('Game module not loaded'); return; }
  currentInstance = game;
  Engine.hideResult();
  showScreen('play');
  game.start();
}
const _showResult = Engine.showResult.bind(Engine);
Engine.showResult = function(winner, msg) {
  Profile.recordPlay(winner === 'red');
  _showResult(winner, msg);
};
document.getElementById('detail-back').addEventListener('click', () => showScreen('home'));
document.getElementById('play-back').addEventListener('click', () => {
  if (currentInstance && currentInstance.stop) currentInstance.stop();
  showScreen('home');
});
document.getElementById('btn-friend').addEventListener('click', () => startGame('friend'));
document.getElementById('btn-bot').addEventListener('click', () => startGame('bot'));
document.getElementById('btn-restart').addEventListener('click', () => {
  if (currentInstance) { if (currentInstance.stop) currentInstance.stop(); currentInstance.start(); }
});
document.getElementById('result-rematch').addEventListener('click', () => {
  Engine.hideResult();
  if (currentInstance) { if (currentInstance.stop) currentInstance.stop(); currentInstance.start(); }
});
document.getElementById('result-home').addEventListener('click', () => {
  Engine.hideResult();
  if (currentInstance && currentInstance.stop) currentInstance.stop();
  showScreen('home');
});
document.getElementById('search-games').addEventListener('input', e => renderHome(e.target.value));
document.getElementById('btn-profile').addEventListener('click', () => Profile.open());
document.getElementById('pf-close').addEventListener('click', () => Profile.close());
document.getElementById('pf-save').addEventListener('click', () => Profile.saveFromForm());
document.querySelectorAll('.avatar-pick').forEach(btn => btn.addEventListener('click', () => {
  document.getElementById('pf-avatar').value = btn.dataset.av;
}));
Profile.load();
renderHome();
(function() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  const start = performance.now();
  function done() {
    const wait = Math.max(0, 1800 - (performance.now() - start));
    setTimeout(() => { splash.classList.add('hide'); setTimeout(() => splash.remove(), 600); }, wait);
  }
  if (document.readyState === 'complete') done(); else window.addEventListener('load', done);
})();
