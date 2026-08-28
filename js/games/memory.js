const MemoryGame = {
  symbols: ['🍎','🍌','🍇','🍊','🍓','🍑','🥝','🍉','🍒','🍋','🍍','🥥'],
  cards: [], flipped: [], matched: 0, lock: false, size: 16,
  start() {
    Engine.reset();
    this.matched = 0; this.flipped = []; this.lock = false;
    const pairs = this.symbols.slice(0, this.size / 2);
    this.cards = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
    const stage = Engine.clearStage();
    const grid = document.createElement('div');
    grid.className = 'memory-grid';
    grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    this.cards.forEach((sym, i) => {
      const card = document.createElement('div');
      card.className = 'mem-card';
      card.dataset.idx = i;
      card.innerHTML = '<div class="back">✦</div><div class="front">' + sym + '</div>';
      card.addEventListener('click', () => this.flip(i, card));
      grid.appendChild(card);
    });
    stage.appendChild(grid);
    Engine.setFooter('Match pairs · Highest matches wins');
  },
  flip(i, el) {
    if (this.lock || Engine.gameOver) return;
    if (el.classList.contains('flipped') || el.classList.contains('matched')) return;
    if (Engine.mode === 'bot' && Engine.turn === 'blue') return;
    el.classList.add('flipped');
    this.flipped.push({ i, el, sym: this.cards[i] });
    if (this.flipped.length === 2) {
      this.lock = true;
      const [a, b] = this.flipped;
      if (a.sym === b.sym) {
        a.el.classList.add('matched'); b.el.classList.add('matched');
        Engine.addScore(Engine.turn); this.matched += 2;
        this.flipped = []; this.lock = false;
        if (this.matched >= this.size) {
          const w = Engine.scores.red > Engine.scores.blue ? 'red' : Engine.scores.blue > Engine.scores.red ? 'blue' : 'draw';
          Engine.showResult(w, 'Red ' + Engine.scores.red + ' – ' + Engine.scores.blue + ' Blue');
        } else { Engine.switchTurn(); this.maybeBot(); }
      } else {
        setTimeout(() => {
          a.el.classList.remove('flipped'); b.el.classList.remove('flipped');
          this.flipped = []; this.lock = false;
          Engine.switchTurn(); this.maybeBot();
        }, 700);
      }
    }
  },
  maybeBot() {
    Engine.botThink(() => {
      const cards = [...document.querySelectorAll('.mem-card:not(.matched):not(.flipped)')];
      if (cards.length < 2) return;
      const first = Engine.pick(cards); first.click();
      setTimeout(() => {
        const remaining = [...document.querySelectorAll('.mem-card:not(.matched):not(.flipped)')];
        if (remaining.length) Engine.pick(remaining).click();
      }, 400);
    }, 600);
  }
};
