const DotsGame = {
  n: 4,
  hLines: [],
  vLines: [],
  boxes: [],
  start() {
    Engine.reset();
    const n = this.n;
    this.hLines = Array.from({ length: n }, () => Array(n - 1).fill(null));
    this.vLines = Array.from({ length: n - 1 }, () => Array(n).fill(null));
    this.boxes = Array.from({ length: n - 1 }, () => Array(n - 1).fill(null));
    const stage = Engine.clearStage();
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    const size = n * 2 - 1;
    grid.style.gridTemplateColumns = 'repeat(' + size + ', 1fr)';
    grid.style.gap = '0';
    grid.style.width = 'min(320px, 90vw)';
    grid.style.aspectRatio = '1';
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const el = document.createElement('div');
        if (r % 2 === 0 && c % 2 === 0) {
          el.className = 'dot-cell';
          el.style.margin = 'auto';
        } else if (r % 2 === 0 && c % 2 === 1) {
          el.className = 'line-h';
          const hr = r / 2, hc = (c - 1) / 2;
          el.addEventListener('click', () => this.claimH(hr, hc, el));
        } else if (r % 2 === 1 && c % 2 === 0) {
          el.className = 'line-v';
          const vr = (r - 1) / 2, vc = c / 2;
          el.addEventListener('click', () => this.claimV(vr, vc, el));
        } else {
          el.className = 'box-cell';
          el.dataset.br = (r - 1) / 2;
          el.dataset.bc = (c - 1) / 2;
        }
        grid.appendChild(el);
      }
    }
    stage.appendChild(grid);
    Engine.setFooter('Claim lines to complete boxes');
  },
  claimH(r, c, el) {
    if (this.hLines[r][c] || Engine.gameOver) return;
    if (Engine.mode === 'bot' && Engine.turn === 'blue') return;
    this.hLines[r][c] = Engine.turn;
    el.classList.add('claimed-' + Engine.turn);
    const scored = this.checkBoxes();
    if (!scored) Engine.switchTurn();
    this.afterMove();
  },
  claimV(r, c, el) {
    if (this.vLines[r][c] || Engine.gameOver) return;
    if (Engine.mode === 'bot' && Engine.turn === 'blue') return;
    this.vLines[r][c] = Engine.turn;
    el.classList.add('claimed-' + Engine.turn);
    const scored = this.checkBoxes();
    if (!scored) Engine.switchTurn();
    this.afterMove();
  },
  checkBoxes() {
    let scored = false;
    const n = this.n;
    for (let r = 0; r < n - 1; r++) {
      for (let c = 0; c < n - 1; c++) {
        if (this.boxes[r][c]) continue;
        if (this.hLines[r][c] && this.hLines[r + 1][c] && this.vLines[r][c] && this.vLines[r][c + 1]) {
          this.boxes[r][c] = Engine.turn;
          Engine.addScore(Engine.turn);
          scored = true;
          document.querySelectorAll('.box-cell').forEach(el => {
            if (+el.dataset.br === r && +el.dataset.bc === c) el.classList.add(Engine.turn);
          });
        }
      }
    }
    return scored;
  },
  afterMove() {
    const total = (this.n - 1) * (this.n - 1);
    const filled = this.boxes.flat().filter(Boolean).length;
    if (filled >= total) {
      const w = Engine.scores.red > Engine.scores.blue ? 'red' : Engine.scores.blue > Engine.scores.red ? 'blue' : 'draw';
      Engine.showResult(w, 'Boxes: Red ' + Engine.scores.red + ' – ' + Engine.scores.blue + ' Blue');
      return;
    }
    this.maybeBot();
  },
  maybeBot() {
    Engine.botThink(() => {
      const moves = [];
      for (let r = 0; r < this.n; r++)
        for (let c = 0; c < this.n - 1; c++)
          if (!this.hLines[r][c]) moves.push({ t: 'h', r, c });
      for (let r = 0; r < this.n - 1; r++)
        for (let c = 0; c < this.n; c++)
          if (!this.vLines[r][c]) moves.push({ t: 'v', r, c });
      if (!moves.length) return;
      const m = Engine.pick(moves);
      const el = document.querySelectorAll(m.t === 'h' ? '.line-h' : '.line-v');
      // find matching - simplified: use index
      if (m.t === 'h') {
        this.hLines[m.r][m.c] = 'blue';
        const idx = m.r * (this.n - 1) + m.c;
        const lines = document.querySelectorAll('.line-h');
        if (lines[idx]) lines[idx].classList.add('claimed-blue');
      } else {
        this.vLines[m.r][m.c] = 'blue';
        const idx = m.r * this.n + m.c;
        const lines = document.querySelectorAll('.line-v');
        if (lines[idx]) lines[idx].classList.add('claimed-blue');
      }
      const scored = this.checkBoxes();
      if (!scored) Engine.switchTurn();
      this.afterMove();
    }, 400);
  }
};
