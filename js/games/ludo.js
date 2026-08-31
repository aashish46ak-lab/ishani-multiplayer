const LudoGame = {
  pos: { red: 0, blue: 0 }, goal: 20,
  start() {
    Engine.reset();
    this.pos = { red: 0, blue: 0 };
    this.render();
    Engine.setFooter('Roll to race home');
  },
  render() {
    const stage = Engine.clearStage();
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';
    const info = document.createElement('div');
    info.style.marginBottom = '16px'; info.style.fontSize = '1.1rem';
    info.innerHTML = '🔴 Red: ' + this.pos.red + '/' + this.goal + '<br>🔵 Blue: ' + this.pos.blue + '/' + this.goal;
    const btn = document.createElement('button');
    btn.className = 'btn btn-friend'; btn.textContent = '🎲 Roll Dice';
    btn.style.margin = '12px auto'; btn.style.display = 'inline-flex';
    btn.addEventListener('click', () => this.roll());
    wrap.appendChild(info); wrap.appendChild(btn);
    stage.appendChild(wrap);
    this.info = info;
  },
  roll() {
    if (Engine.gameOver) return;
    if (Engine.mode === 'bot' && Engine.turn === 'blue') return;
    const d = 1 + Math.floor(Math.random() * 6);
    this.pos[Engine.turn] = Math.min(this.goal, this.pos[Engine.turn] + d);
    Engine.setFooter(Engine.turn + ' rolled ' + d);
    if (this.pos[Engine.turn] >= this.goal) {
      Engine.addScore(Engine.turn);
      Engine.showResult(Engine.turn, 'Reached home!');
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
