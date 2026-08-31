const ReactDuel = {
  waiting: false, startTime: 0, timeout: null,
  start() {
    Engine.reset();
    this.round();
  },
  round() {
    const stage = Engine.clearStage();
    const box = document.createElement('div');
    box.style.width = 'min(280px,80vw)'; box.style.aspectRatio = '1';
    box.style.borderRadius = '24px'; box.style.background = '#713f12';
    box.style.display = 'flex'; box.style.alignItems = 'center'; box.style.justifyContent = 'center';
    box.style.fontSize = '1.4rem'; box.style.fontWeight = '700'; box.style.cursor = 'pointer';
    box.textContent = 'Wait for green...';
    this.waiting = true;
    stage.appendChild(box);
    Engine.setFooter(Engine.turn === 'red' ? 'Red: get ready' : 'Blue: get ready');
    const delay = 1500 + Math.random() * 2500;
    this.timeout = setTimeout(() => {
      this.waiting = false;
      this.startTime = performance.now();
      box.style.background = '#22c55e';
      box.textContent = 'TAP!';
      box.onclick = () => this.tap();
    }, delay);
    box.onclick = () => {
      if (this.waiting) {
        clearTimeout(this.timeout);
        box.textContent = 'Too early!';
        box.style.background = '#ef4444';
        Engine.switchTurn();
        setTimeout(() => this.round(), 1000);
      }
    };
  },
  tap() {
    if (this.waiting || Engine.gameOver) return;
    const ms = Math.round(performance.now() - this.startTime);
    Engine.addScore(Engine.turn);
    Engine.setFooter(Engine.turn + ' reacted in ' + ms + 'ms');
    if (Engine.scores.red >= 3 || Engine.scores.blue >= 3) {
      const w = Engine.scores.red >= 3 ? 'red' : 'blue';
      Engine.showResult(w, 'Fastest reactions win');
      return;
    }
    Engine.switchTurn();
    setTimeout(() => this.round(), 900);
  },
  stop() { clearTimeout(this.timeout); }
};
