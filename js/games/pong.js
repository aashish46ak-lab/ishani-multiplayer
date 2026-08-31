const PongGame = {
  canvas: null, ctx: null, anim: null,
  ball: { x: 150, y: 100, vx: 3, vy: 2 },
  p1: { y: 80 }, p2: { y: 80 },
  keys: {},
  start() {
    Engine.reset();
    const stage = Engine.clearStage();
    const c = document.createElement('canvas');
    c.width = 300; c.height = 200;
    c.style.width = '100%'; c.style.maxWidth = '360px'; c.style.borderRadius = '12px'; c.style.background = '#0f172a';
    stage.appendChild(c);
    this.canvas = c; this.ctx = c.getContext('2d');
    this.ball = { x: 150, y: 100, vx: 3, vy: 2 };
    this.p1 = { y: 80 }; this.p2 = { y: 80 };
    this.keys = {};
    window.addEventListener('keydown', this._kd = e => { this.keys[e.key] = true; });
    window.addEventListener('keyup', this._ku = e => { this.keys[e.key] = false; });
    c.addEventListener('touchmove', e => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = c.getBoundingClientRect();
      const y = ((t.clientY - rect.top) / rect.height) * 200 - 25;
      if (Engine.turn === 'red' || Engine.mode === 'friend') this.p1.y = Math.max(0, Math.min(150, y));
    }, { passive: false });
    Engine.setFooter('W/S or touch · First to 5');
    this.loop();
  },
  loop() {
    const ctx = this.ctx, W = 300, H = 200;
    if (this.keys['w'] || this.keys['W']) this.p1.y = Math.max(0, this.p1.y - 4);
    if (this.keys['s'] || this.keys['S']) this.p1.y = Math.min(150, this.p1.y + 4);
    if (Engine.mode === 'friend') {
      if (this.keys['ArrowUp']) this.p2.y = Math.max(0, this.p2.y - 4);
      if (this.keys['ArrowDown']) this.p2.y = Math.min(150, this.p2.y + 4);
    } else {
      this.p2.y += (this.ball.y - this.p2.y - 25) * 0.08;
      this.p2.y = Math.max(0, Math.min(150, this.p2.y));
    }
    this.ball.x += this.ball.vx; this.ball.y += this.ball.vy;
    if (this.ball.y < 5 || this.ball.y > H - 5) this.ball.vy *= -1;
    if (this.ball.x < 18 && this.ball.y > this.p1.y && this.ball.y < this.p1.y + 50) this.ball.vx = Math.abs(this.ball.vx);
    if (this.ball.x > W - 18 && this.ball.y > this.p2.y && this.ball.y < this.p2.y + 50) this.ball.vx = -Math.abs(this.ball.vx);
    if (this.ball.x < 0) {
      Engine.addScore('blue'); this.ball = { x: 150, y: 100, vx: 3, vy: 2 };
      if (Engine.scores.blue >= 5) { Engine.showResult('blue', 'Pong!'); this.stop(); return; }
    }
    if (this.ball.x > W) {
      Engine.addScore('red'); this.ball = { x: 150, y: 100, vx: -3, vy: 2 };
      if (Engine.scores.red >= 5) { Engine.showResult('red', 'Pong!'); this.stop(); return; }
    }
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#334155'; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(8, this.p1.y, 8, 50);
    ctx.fillRect(W - 16, this.p2.y, 8, 50);
    ctx.beginPath(); ctx.arc(this.ball.x, this.ball.y, 6, 0, Math.PI * 2); ctx.fill();
    this.anim = requestAnimationFrame(() => this.loop());
  },
  stop() {
    if (this.anim) cancelAnimationFrame(this.anim);
    window.removeEventListener('keydown', this._kd);
    window.removeEventListener('keyup', this._ku);
  }
};
