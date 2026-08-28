const RPS = {
  choices: [{ id: 'rock', emoji: '✊' }, { id: 'paper', emoji: '✋' }, { id: 'scissors', emoji: '✌️' }],
  target: 3, pending: null,
  start() {
    Engine.reset(); this.pending = null;
    const stage = Engine.clearStage();
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center'; wrap.style.width = '100%';
    const result = document.createElement('div');
    result.className = 'rps-result'; result.id = 'rps-result'; result.textContent = 'Choose your move';
    const row = document.createElement('div'); row.className = 'choice-row';
    this.choices.forEach(ch => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn'; btn.textContent = ch.emoji;
      btn.addEventListener('click', () => this.choose(ch.id, ch.emoji));
      row.appendChild(btn);
    });
    wrap.appendChild(result); wrap.appendChild(row); stage.appendChild(wrap);
    Engine.setFooter('First to ' + this.target + ' wins');
  },
  choose(id, emoji) {
    if (Engine.gameOver) return;
    if (Engine.mode === 'friend') {
      if (!this.pending) {
        this.pending = { id, emoji, player: Engine.turn };
        document.getElementById('rps-result').textContent = (Engine.turn === 'red' ? 'Red' : 'Blue') + ' chose · Other player pick!';
        Engine.switchTurn(); return;
      }
      const a = this.pending; const b = { id, emoji, player: Engine.turn };
      this.resolve(a, b); this.pending = null;
    } else {
      if (Engine.turn !== 'red') return;
      const bot = Engine.pick(this.choices);
      this.resolve({ id, emoji, player: 'red' }, { id: bot.id, emoji: bot.emoji, player: 'blue' });
    }
  },
  resolve(a, b) {
    const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
    let winner = null;
    if (a.id === b.id) winner = 'draw';
    else if (beats[a.id] === b.id) winner = a.player;
    else winner = b.player;
    const res = document.getElementById('rps-result');
    res.innerHTML = a.emoji + ' vs ' + b.emoji + '<br>' + (winner === 'draw' ? 'Tie!' : (winner === 'red' ? 'Red scores!' : 'Blue scores!'));
    if (winner !== 'draw') {
      Engine.addScore(winner);
      if (Engine.scores.red >= this.target || Engine.scores.blue >= this.target) {
        const w = Engine.scores.red >= this.target ? 'red' : 'blue';
        Engine.showResult(w, 'Final ' + Engine.scores.red + ' – ' + Engine.scores.blue);
        return;
      }
    }
    Engine.setTurn('red');
    setTimeout(() => { if (!Engine.gameOver) res.textContent = 'Choose your move'; }, 1200);
  }
};
