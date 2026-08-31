const SimonGame = {
  sequence: [],
  playerSeq: [],
  colors: ['#ff4d6d', '#4cc9f0', '#ffe066', '#52b788'],
  playing: false,
  start() {
    Engine.reset();
    this.sequence = [];
    this.playerSeq = [];
    this.playing = false;
    this.nextRound();
  },
  nextRound() {
    this.sequence.push(Math.floor(Math.random() * 4));
    this.playerSeq = [];
    this.render();
    Engine.setFooter('Watch the sequence...');
    this.playing = true;
    setTimeout(() => this.playSequence(), 500);
  },
  render() {
    const stage = Engine.clearStage();
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = '1fr 1fr';
    grid.style.gap = '12px';
    grid.style.width = 'min(260px, 80vw)';
    this.colors.forEach((col, i) => {
      const btn = document.createElement('button');
      btn.style.aspectRatio = '1';
      btn.style.borderRadius = '20px';
      btn.style.border = 'none';
      btn.style.background = col;
      btn.style.opacity = '0.55';
      btn.style.cursor = 'pointer';
      btn.dataset.i = i;
      btn.addEventListener('click', () => this.press(i, btn));
      grid.appendChild(btn);
    });
    stage.appendChild(grid);
    this.btns = grid.querySelectorAll('button');
  },
  async playSequence() {
    Engine.setFooter('Watch...');
    for (const i of this.sequence) {
      await this.flash(this.btns[i]);
      await new Promise(r => setTimeout(r, 200));
    }
    this.playing = false;
    Engine.setFooter(Engine.turn === 'red' ? 'Your turn!' : "Opponent's turn");
    if (Engine.mode === 'bot' && Engine.turn === 'blue') this.botPlay();
  },
  flash(btn) {
    return new Promise(r => {
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1.05)';
      setTimeout(() => { btn.style.opacity = '0.55'; btn.style.transform = ''; r(); }, 350);
    });
  },
  press(i, btn) {
    if (this.playing || Engine.gameOver) return;
    if (Engine.mode === 'bot' && Engine.turn === 'blue') return;
    this.flash(btn);
    this.playerSeq.push(i);
    const idx = this.playerSeq.length - 1;
    if (this.playerSeq[idx] !== this.sequence[idx]) {
      Engine.switchTurn();
      if (Engine.scores.red >= 3 || Engine.scores.blue >= 3) {
        const w = Engine.scores.red >= 3 ? 'red' : 'blue';
        Engine.showResult(w, 'Best sequence wins');
      } else {
        Engine.setFooter('Wrong! Next player');
        setTimeout(() => this.nextRound(), 800);
      }
      return;
    }
    if (this.playerSeq.length === this.sequence.length) {
      Engine.addScore(Engine.turn);
      if (Engine.scores.red >= 5 || Engine.scores.blue >= 5) {
        Engine.showResult(Engine.turn, 'Sequence master!');
        return;
      }
      Engine.switchTurn();
      setTimeout(() => this.nextRound(), 700);
    }
  },
  botPlay() {
    Engine.botThink(async () => {
      for (const i of this.sequence) {
        await this.flash(this.btns[i]);
        this.playerSeq.push(i);
        await new Promise(r => setTimeout(r, 250));
      }
      Engine.addScore('blue');
      if (Engine.scores.blue >= 5) {
        Engine.showResult('blue', 'Bot mastered the sequence');
        return;
      }
      Engine.switchTurn();
      setTimeout(() => this.nextRound(), 600);
    }, 400);
  }
};
