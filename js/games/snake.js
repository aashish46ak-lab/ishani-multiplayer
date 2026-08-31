const SnakeDuel = {
  canvas: null, ctx: null, anim: null, tick: 0,
  s1: [], s2: [], dir1: [1,0], dir2: [-1,0], food: null, grid: 15,
  start() {
    Engine.reset();
    const stage = Engine.clearStage();
    const c = document.createElement('canvas');
    c.width = 300; c.height = 300;
    c.style.width = '100%'; c.style.maxWidth = '340px'; c.style.borderRadius = '12px'; c.style.background = '#14532d';
    stage.appendChild(c);
    this.canvas = c; this.ctx = c.getContext('2d');
    this.s1 = [[2, 7], [1, 7]]; this.s2 = [[12, 7], [13, 7]];
    this.dir1 = [1, 0]; this.dir2 = [-1, 0];
    this.placeFood();
    this.tick = 0;
    window.addEventListener('keydown', this._kd = e => {
      if (e.key === 'w' || e.key === 'W') this.dir1 = [0, -1];
      if (e.key === 's' || e.key === 'S') this.dir1 = [0, 1];
      if (e.key === 'a' || e.key === 'A') this.dir1 = [-1, 0];
      if (e.key === 'd' || e.key === 'D') this.dir1 = [1, 0];
      if (e.key === 'ArrowUp') this.dir2 = [0, -1];
      if (e.key === 'ArrowDown') this.dir2 = [0, 1];
      if (e.key === 'ArrowLeft') this.dir2 = [-1, 0];
      if (e.key === 'ArrowRight') this.dir2 = [1, 0];
    });
    Engine.setFooter('WASD vs Arrows');
    this.loop();
  },
  placeFood() {
    this.food = [Math.floor(Math.random() * this.grid), Math.floor(Math.random() * this.grid)];
  },
  loop() {
    this.tick++;
    if (this.tick % 8 === 0) this.step();
    const ctx = this.ctx, cs = 300 / this.grid;
    ctx.fillStyle = '#166534'; ctx.fillRect(0, 0, 300, 300);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(this.food[0] * cs, this.food[1] * cs, cs - 1, cs - 1);
    this.s1.forEach((p, i) => { ctx.fillStyle = i === 0 ? '#86efac' : '#4ade80'; ctx.fillRect(p[0]*cs, p[1]*cs, cs-1, cs-1); });
    this.s2.forEach((p, i) => { ctx.fillStyle = i === 0 ? '#7dd3fc' : '#38bdf8'; ctx.fillRect(p[0]*cs, p[1]*cs, cs-1, cs-1); });
    if (!Engine.gameOver) this.anim = requestAnimationFrame(() => this.loop());
  },
  step() {
    if (Engine.mode === 'bot') {
      const head = this.s2[0];
      if (this.food[0] > head[0]) this.dir2 = [1, 0];
      else if (this.food[0] < head[0]) this.dir2 = [-1, 0];
      else if (this.food[1] > head[1]) this.dir2 = [0, 1];
      else this.dir2 = [0, -1];
    }
    const n1 = [this.s1[0][0] + this.dir1[0], this.s1[0][1] + this.dir1[1]];
    const n2 = [this.s2[0][0] + this.dir2[0], this.s2[0][1] + this.dir2[1]];
    if (this.hit(n1, this.s1, this.s2)) { Engine.showResult('blue', 'Red crashed'); this.stop(); return; }
    if (this.hit(n2, this.s2, this.s1)) { Engine.showResult('red', 'Blue crashed'); this.stop(); return; }
    this.s1.unshift(n1); this.s2.unshift(n2);
    if (n1[0] === this.food[0] && n1[1] === this.food[1]) { Engine.addScore('red'); this.placeFood(); }
    else this.s1.pop();
    if (n2[0] === this.food[0] && n2[1] === this.food[1]) { Engine.addScore('blue'); this.placeFood(); }
    else this.s2.pop();
  },
  hit(n, self, other) {
    if (n[0] < 0 || n[0] >= this.grid || n[1] < 0 || n[1] >= this.grid) return true;
    return self.some(p => p[0] === n[0] && p[1] === n[1]) || other.some(p => p[0] === n[0] && p[1] === n[1]);
  },
  stop() { if (this.anim) cancelAnimationFrame(this.anim); window.removeEventListener('keydown', this._kd); }
};
