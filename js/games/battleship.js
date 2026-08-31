const Battleship = {
  size: 6, ships: 3,
  p1: [], p2: [], hits1: [], hits2: [], phase: 'place', placed: 0,
  start() {
    Engine.reset();
    this.p1 = Array.from({ length: this.size }, () => Array(this.size).fill(0));
    this.p2 = Array.from({ length: this.size }, () => Array(this.size).fill(0));
    this.hits1 = Array.from({ length: this.size }, () => Array(this.size).fill(0));
    this.hits2 = Array.from({ length: this.size }, () => Array(this.size).fill(0));
    this.phase = 'place'; this.placed = 0;
    this.autoPlace(this.p2);
    this.render();
    Engine.setFooter('Tap to place your ' + this.ships + ' ships');
  },
  autoPlace(grid) {
    let n = 0;
    while (n < this.ships) {
      const r = Math.floor(Math.random() * this.size), c = Math.floor(Math.random() * this.size);
      if (!grid[r][c]) { grid[r][c] = 1; n++; }
    }
  },
  render() {
    const stage = Engine.clearStage();
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(' + this.size + ', 1fr)';
    grid.style.gap = '3px'; grid.style.width = 'min(280px, 85vw)';
    const show = this.phase === 'place' ? this.p1 : this.hits2;
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        const cell = document.createElement('button');
        cell.style.aspectRatio = '1'; cell.style.border = 'none'; cell.style.borderRadius = '4px';
        cell.style.cursor = 'pointer';
        if (this.phase === 'place') {
          cell.style.background = this.p1[r][c] ? '#64748b' : '#1e40af';
        } else {
          if (this.hits2[r][c] === 2) cell.style.background = '#ef4444';
          else if (this.hits2[r][c] === 1) cell.style.background = '#94a3b8';
          else cell.style.background = '#1e40af';
        }
        cell.addEventListener('click', () => this.click(r, c));
        grid.appendChild(cell);
      }
    }
    stage.appendChild(grid);
  },
  click(r, c) {
    if (Engine.gameOver) return;
    if (this.phase === 'place') {
      if (this.p1[r][c]) return;
      this.p1[r][c] = 1; this.placed++;
      this.render();
      if (this.placed >= this.ships) {
        this.phase = 'fire';
        Engine.setFooter('Fire at enemy grid!');
        this.render();
      }
      return;
    }
    if (this.hits2[r][c]) return;
    if (this.p2[r][c]) {
      this.hits2[r][c] = 2;
      Engine.addScore('red');
      Engine.setFooter('Hit!');
    } else {
      this.hits2[r][c] = 1;
      Engine.setFooter('Miss');
    }
    if (Engine.scores.red >= this.ships) { Engine.showResult('red', 'Fleet destroyed!'); return; }
    this.render();
    this.botFire();
  },
  botFire() {
    Engine.botThink(() => {
      let r, c;
      do { r = Math.floor(Math.random() * this.size); c = Math.floor(Math.random() * this.size); } while (this.hits1[r][c]);
      if (this.p1[r][c]) { this.hits1[r][c] = 2; Engine.addScore('blue'); Engine.setFooter('Enemy hit your ship!'); }
      else { this.hits1[r][c] = 1; }
      if (Engine.scores.blue >= this.ships) Engine.showResult('blue', 'Your fleet is gone');
    }, 400);
  }
};
