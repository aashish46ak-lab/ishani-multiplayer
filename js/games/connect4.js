const Connect4 = {
  rows: 6, cols: 7, grid: [], cells: [],
  start() {
    Engine.reset();
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
    const stage = Engine.clearStage();
    const board = document.createElement('div');
    board.className = 'c4-board';
    this.cells = [];
    for (let r = 0; r < this.rows; r++) {
      this.cells[r] = [];
      for (let c = 0; c < this.cols; c++) {
        const cell = document.createElement('button');
        cell.className = 'c4-cell';
        cell.addEventListener('click', () => this.drop(c));
        board.appendChild(cell);
        this.cells[r][c] = cell;
      }
    }
    stage.appendChild(board);
    Engine.setFooter('Connect 4 in a row');
  },
  drop(col) {
    if (Engine.gameOver) return;
    if (Engine.mode === 'bot' && Engine.turn === 'blue') return;
    let row = -1;
    for (let r = this.rows - 1; r >= 0; r--) {
      if (!this.grid[r][col]) { row = r; break; }
    }
    if (row < 0) return;
    this.grid[row][col] = Engine.turn;
    this.cells[row][col].classList.add(Engine.turn);
    if (this.checkWin(row, col)) {
      Engine.addScore(Engine.turn);
      Engine.showResult(Engine.turn, 'Four connected!');
      return;
    }
    if (this.grid.every(row => row.every(Boolean))) {
      Engine.showResult('draw', 'Board full');
      return;
    }
    Engine.switchTurn();
    this.maybeBot();
  },
  checkWin(r, c) {
    const p = this.grid[r][c];
    const dirs = [[0,1],[1,0],[1,1],[1,-1]];
    for (const [dr, dc] of dirs) {
      let count = 1;
      for (const sign of [1, -1]) {
        let nr = r + dr * sign, nc = c + dc * sign;
        while (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols && this.grid[nr][nc] === p) {
          count++; nr += dr * sign; nc += dc * sign;
        }
      }
      if (count >= 4) return true;
    }
    return false;
  },
  maybeBot() {
    Engine.botThink(() => {
      const valid = [];
      for (let c = 0; c < this.cols; c++) if (!this.grid[0][c]) valid.push(c);
      if (!valid.length) return;
      const center = valid.filter(c => c >= 2 && c <= 4);
      this.drop(center.length ? Engine.pick(center) : Engine.pick(valid));
    }, 500);
  }
};
