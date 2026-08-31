const Checkers = {
  board: [], selected: null,
  start() {
    Engine.reset();
    this.board = Array.from({ length: 8 }, (_, r) =>
      Array.from({ length: 8 }, (_, c) => {
        if ((r + c) % 2 === 1) {
          if (r < 3) return 'blue';
          if (r > 4) return 'red';
        }
        return null;
      })
    );
    this.selected = null;
    this.render();
    Engine.setFooter('Tap piece then destination');
  },
  render() {
    const stage = Engine.clearStage();
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(8, 1fr)';
    grid.style.width = 'min(320px, 90vw)';
    grid.style.aspectRatio = '1';
    grid.style.gap = '0';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const cell = document.createElement('button');
        cell.style.aspectRatio = '1';
        cell.style.border = 'none';
        cell.style.background = (r + c) % 2 === 0 ? '#e7e5e4' : '#78716c';
        cell.style.cursor = 'pointer';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        const p = this.board[r][c];
        if (p) {
          const piece = document.createElement('div');
          piece.style.width = '70%'; piece.style.height = '70%'; piece.style.borderRadius = '50%';
          piece.style.background = p === 'red' ? '#ef4444' : '#1e293b';
          piece.style.boxShadow = '0 2px 4px rgba(0,0,0,.3)';
          cell.appendChild(piece);
        }
        if (this.selected && this.selected[0] === r && this.selected[1] === c) {
          cell.style.outline = '2px solid #fbbf24';
        }
        cell.addEventListener('click', () => this.click(r, c));
        grid.appendChild(cell);
      }
    }
    stage.appendChild(grid);
  },
  click(r, c) {
    if (Engine.gameOver) return;
    if (Engine.mode === 'bot' && Engine.turn === 'blue') return;
    const p = this.board[r][c];
    if (this.selected) {
      const [sr, sc] = this.selected;
      const dr = r - sr, dc = c - sc;
      if (Math.abs(dr) === 1 && Math.abs(dc) === 1 && !p) {
        this.board[r][c] = this.board[sr][sc];
        this.board[sr][sc] = null;
        this.selected = null;
        Engine.switchTurn();
        this.render();
        this.maybeBot();
        return;
      }
      if (Math.abs(dr) === 2 && Math.abs(dc) === 2 && !p) {
        const mr = sr + dr / 2, mc = sc + dc / 2;
        if (this.board[mr][mc] && this.board[mr][mc] !== Engine.turn) {
          this.board[r][c] = this.board[sr][sc];
          this.board[sr][sc] = null;
          this.board[mr][mc] = null;
          Engine.addScore(Engine.turn);
          this.selected = null;
          if (this.count('red') === 0 || this.count('blue') === 0) {
            Engine.showResult(Engine.turn, 'All pieces captured');
            return;
          }
          Engine.switchTurn();
          this.render();
          this.maybeBot();
          return;
        }
      }
      this.selected = null;
      this.render();
    } else if (p === Engine.turn) {
      this.selected = [r, c];
      this.render();
    }
  },
  count(col) { return this.board.flat().filter(x => x === col).length; },
  maybeBot() {
    Engine.botThink(() => {
      const pieces = [];
      for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (this.board[r][c] === 'blue') pieces.push([r, c]);
      if (!pieces.length) { Engine.showResult('red', 'No blue pieces'); return; }
      const [sr, sc] = Engine.pick(pieces);
      const dirs = [[1,1],[1,-1]];
      for (const [dr, dc] of dirs) {
        const r = sr + dr, c = sc + dc;
        if (r >= 0 && r < 8 && c >= 0 && c < 8 && !this.board[r][c]) {
          this.board[r][c] = 'blue'; this.board[sr][sc] = null;
          Engine.switchTurn(); this.render(); return;
        }
      }
      Engine.switchTurn(); this.render();
    }, 500);
  }
};
