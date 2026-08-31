const HangmanGame = {
  words: ['NEPAL','ISHAAN','MULTIPLAYER','CARROM','MEMORY','PYTHON','VERCEL','STREAK'],
  word: '', guessed: [], wrong: 0, maxWrong: 6,
  start() {
    Engine.reset();
    this.word = Engine.pick(this.words);
    this.guessed = [];
    this.wrong = 0;
    this.render();
    Engine.setFooter('Guess the word');
  },
  render() {
    const stage = Engine.clearStage();
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center'; wrap.style.width = '100%';
    const wordEl = document.createElement('div');
    wordEl.style.fontSize = '1.6rem'; wordEl.style.letterSpacing = '8px'; wordEl.style.marginBottom = '16px'; wordEl.style.fontFamily = 'monospace';
    wordEl.textContent = this.word.split('').map(c => this.guessed.includes(c) ? c : '_').join(' ');
    const wrongEl = document.createElement('div');
    wrongEl.style.color = '#f97316'; wrongEl.style.marginBottom = '12px';
    wrongEl.textContent = 'Wrong: ' + this.wrong + '/' + this.maxWrong;
    const keys = document.createElement('div');
    keys.style.display = 'flex'; keys.style.flexWrap = 'wrap'; keys.style.gap = '6px'; keys.style.justifyContent = 'center';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(l => {
      const b = document.createElement('button');
      b.textContent = l; b.style.width = '32px'; b.style.height = '32px';
      b.style.borderRadius = '8px'; b.style.border = 'none';
      b.style.background = this.guessed.includes(l) ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.15)';
      b.style.color = '#fff'; b.style.cursor = this.guessed.includes(l) ? 'default' : 'pointer';
      b.disabled = this.guessed.includes(l);
      b.addEventListener('click', () => this.guess(l));
      keys.appendChild(b);
    });
    wrap.appendChild(wordEl); wrap.appendChild(wrongEl); wrap.appendChild(keys);
    stage.appendChild(wrap);
  },
  guess(l) {
    if (this.guessed.includes(l) || Engine.gameOver) return;
    if (Engine.mode === 'bot' && Engine.turn === 'blue') return;
    this.guessed.push(l);
    if (!this.word.includes(l)) {
      this.wrong++;
      if (this.wrong >= this.maxWrong) {
        Engine.switchTurn();
        Engine.addScore(Engine.turn);
        Engine.showResult(Engine.turn, 'Word was ' + this.word);
        return;
      }
    }
    if (this.word.split('').every(c => this.guessed.includes(c))) {
      Engine.addScore(Engine.turn);
      Engine.showResult(Engine.turn, 'Word: ' + this.word);
      return;
    }
    this.render();
  }
};
