const TicTacToe = {
  board: [],
  cells: [],
  start() {
    Engine.reset();
    this.board = Array(9).fill(null);
    const stage = Engine.clearStage();
    const board = document.createElement('div');
    board.className = 'board';
    board.style.gridTemplateColumns = 'repeat(3, 1fr)';
    board.style.width = 'min(320px, 90vw)';
    this.cells = [];
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('button');
      cell.className = 'cell';
      cell.style.fontSize = '2.4rem';
      cell.addEventListener('click', () => this.play(i));
      board.appendChild(cell);
      this.cells.push(cell);
    }
    stage.appendChild(board);
    Engine.setFooter('Get 3 in a row');
  },
  play(i) {
    if (this.board[i] || Engine.gameOver) return;
    if (Engine.mode === 'bot' && Engine.turn === 'blue') return;
    this.board[i] = Engine.turn;
    this.cells[i].textContent = Engine.turn === 'red' ? '✕' : '○';
    this.cells[i].classList.add('filled', Engine.turn);
    if (this.checkWin(Engine.turn)) {
      Engine.addScore(Engine.turn);
      Engine.showResult(Engine.turn, 'Three in a row!');
      return;
    }
    if (this.board.every(Boolean)) {
      Engine.showResult('draw', 'No more moves');
      return;
    }
    Engine.switchTurn();
    this.maybeBot();
  },
  checkWin(p) {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return lines.some(([a,b,c]) => this.board[a] === p && this.board[b] === p && this.board[c] === p);
  },
  maybeBot() {
    Engine.botThink(() => {
      const empty = this.board.map((v,i) => v ? null : i).filter(v => v !== null);
      if (!empty.length) return;
      const tryMove = (p) => {
        for (const i of empty) {
          this.board[i] = p;
          const win = this.checkWin(p);
          this.board[i] = null;
          if (win) return i;
        }
        return null;
      };
      let move = tryMove('blue') ?? tryMove('red');
      if (move === null) {
        if (empty.includes(4)) move = 4;
        else {
          const corners = empty.filter(i => [0,2,6,8].includes(i));
          move = corners.length ? Engine.pick(corners) : Engine.pick(empty);
        }
      }
      this.play(move);
    });
  }
};
