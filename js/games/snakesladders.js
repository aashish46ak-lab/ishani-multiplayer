const SnakesLadders = {
  pos: { red: 1, blue: 1 },
  ladders: { 3: 12, 7: 18, 11: 25 },
  snakes: { 16: 4, 22: 8, 28: 10 },
  goal: 30,
  start() {
    Engine.reset();
    this.pos = { red: 1, blue: 1 };
    this.render();
    Engine.setFooter('Climb ladders, avoid snakes');
  },
  render() {
    const stage = Engine.clearStage();
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';
    const info = document.createElement('div');
    info.style.marginBottom = '16px'; info.style.fontSize = '1.1rem';
    info.innerHTML = '🔴 Red: tile ' + this.pos.red + '<br>🔵 Blue: tile ' + this.pos.blue;
    const btn = document.createElement('button');
    btn.className = 'btn btn-bot'; btn.textContent = '🎲 Roll';
    btn.style.margin = '12px auto'; btn.style.display = 'inline-flex';
    btn.addEventListener('click', () => this.roll());
    wrap.appendChild(info); wrap.appendChild(btn);
    stage.appendChild(wrap);
  },
  roll() {
    if (Engine.gameOver) return;
    if (Engine.mode === 'bot' && Engine.turn === 'blue') return;
    const d = 1 + Math.floor(Math.random() * 6);
    let p = this.pos[Engine.turn] + d;
    if (p > this.goal) p = this.pos[Engine.turn];
    if (this.ladders[p]) p = this.ladders[p];
    if (this.snakes[p]) p = this.snakes[p];
    this.pos[Engine.turn] = p;
    Engine.setFooter(Engine.turn + ' rolled ' + d + ' → tile ' + p);
    if (p >= this.goal) {
      Engine.addScore(Engine.turn);
      Engine.showResult(Engine.turn, 'Finished the board!');
      return;
    }
    Engine.switchTurn();
    this.render();
    this.maybeBot();
  },
  maybeBot() {
    Engine.botThink(() => this.roll(), 500);
  }
};
