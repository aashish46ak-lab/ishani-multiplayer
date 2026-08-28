/**
 * Shared game engine helpers for Ishani Multiplayer
 */
const Engine = {
  currentGame: null,
  mode: 'friend',
  turn: 'red',
  scores: { red: 0, blue: 0 },
  gameOver: false,

  reset() {
    this.scores = { red: 0, blue: 0 };
    this.turn = 'red';
    this.gameOver = false;
    this.updateUI();
  },

  setTurn(t) {
    this.turn = t;
    this.updateUI();
  },

  switchTurn() {
    this.turn = this.turn === 'red' ? 'blue' : 'red';
    this.updateUI();
  },

  addScore(player, n = 1) {
    this.scores[player] += n;
    this.updateUI();
  },

  updateUI() {
    const redEl = document.getElementById('team-red');
    const blueEl = document.getElementById('team-blue');
    const banner = document.getElementById('turn-banner');
    const turnText = document.getElementById('turn-text');
    const redScore = document.getElementById('red-score');
    const blueScore = document.getElementById('blue-score');

    redEl.classList.toggle('active', this.turn === 'red' && !this.gameOver);
    blueEl.classList.toggle('active', this.turn === 'blue' && !this.gameOver);

    banner.className = 'turn-banner ' + this.turn;
    if (this.gameOver) {
      turnText.textContent = 'Game Over';
    } else {
      const name = this.turn === 'red' ? (document.getElementById('red-name').textContent) : (document.getElementById('blue-name').textContent);
      turnText.textContent = name + "'s Turn";
    }

    redScore.textContent = this.scores.red;
    blueScore.textContent = this.scores.blue;
  },

  showResult(winner, msg) {
    this.gameOver = true;
    this.updateUI();
    const modal = document.getElementById('result-modal');
    const emoji = document.getElementById('result-emoji');
    const title = document.getElementById('result-title');
    const msgEl = document.getElementById('result-msg');

    if (winner === 'draw') {
      emoji.textContent = '🤝';
      title.textContent = "It's a Draw!";
    } else if (winner === 'red') {
      emoji.textContent = '🔴';
      title.textContent = 'Red Wins!';
    } else {
      emoji.textContent = '🔵';
      title.textContent = 'Blue Wins!';
    }
    msgEl.textContent = msg || '';
    modal.classList.remove('hidden');
  },

  hideResult() {
    document.getElementById('result-modal').classList.add('hidden');
  },

  botThink(fn, ms = 450) {
    if (this.mode !== 'bot' || this.turn !== 'blue' || this.gameOver) return;
    setTimeout(fn, ms + Math.random() * 300);
  },

  pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  clearStage() {
    const stage = document.getElementById('game-stage');
    stage.innerHTML = '';
    return stage;
  },

  setFooter(html) {
    document.getElementById('play-footer').innerHTML = html || '';
  }
};
