const AirHockey = {
  canvas: null, ctx: null, anim: null,
  puck: { x: 150, y: 100, vx: 0, vy: 0 },
  p1: { x: 40, y: 100 }, p2: { x: 260, y: 100 },
  start() {
    Engine.reset();
    const stage = Engine.clearStage();
    const c = document.createElement('canvas');
    c.width = 300; c.height = 200;
    c.style.width = '100%'; c.style.maxWidth = '360px'; c.style.borderRadius = '12px'; c.style.background = '#0c4a6e';
    stage.appendChild(c);
    this.canvas = c; this.ctx = c.getContext('2d');
    this.puck = { x: 150, y: 100, vx: 2, vy: 1.5 };
    this.p1 = { x: 40, y: 100 }; this.p2 = { x: 260, y: 100 };
    c.addEventListener('pointermove', e => {
      const rect = c.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 300;
      const y = ((e.clientY - rect.top) / rect.height) * 200;
      if (x < 150) { this.p1.x = Math.max(20, Math.min(140, x)); this.p1.y = Math.max(20, Math.min(180, y)); }
      else if (Engine.mode === 'friend') { this.p2.x = Math.max(160, Math.min(280, x)); this.p2.y = Math.max(20, Math.min(180, y)); }
    });
    Engine.setFooter('Drag paddle · First to 5');
    this.loop();
  },
  loop() {
    const ctx = this.ctx, W = 300, H = 200;
    if (Engine.mode === 'bot') {
      this.p2.x += (this.puck.x - this.p2.x) * 0.05;
      this.p2.y += (this.puck.y - this.p2.y) * 0.05;
      this.p2.x = Math.max(160, Math.min(280, this.p2.x));
      this.p2.y = Math.max(20, Math.min(180, this.p2.y));
    }
    this.puck.x += this.puck.vx; this.puck.y += this.puck.vy;
    if (this.puck.y < 10 || this.puck.y > H - 10) this.puck.vy *= -1;
    this.hit(this.p1); this.hit(this.p2);
    if (this.puck.x < 0) {
      Engine.addScore('blue'); this.puck = { x: 150, y: 100, vx: 2, vy: 1 };
      if (Engine.scores.blue >= 5) { Engine.showResult('blue', 'Goal!'); this.stop(); return; }
    }
    if (this.puck.x > W) {
      Engine.addScore('red'); this.puck = { x: 150, y: 100, vx: -2, vy: 1 };
      if (Engine.scores.red >= 5) { Engine.showResult('red', 'Goal!'); this.stop(); return; }
    }
    ctx.fillStyle = '#0369a1'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2;
    ctx.strokeRect(5, 5, W - 10, H - 10);
    ctx.beginPath(); ctx.arc(W/2, H/2, 30, 0, Math.PI*2); ctx.stroke();
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath(); ctx.arc(this.p1.x, this.p1.y, 16, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(this.p2.x, this.p2.y, 16, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f87171';
    ctx.beginPath(); ctx.arc(this.puck.x, this.puck.y, 8, 0, Math.PI*2); ctx.fill();
    this.anim = requestAnimationFrame(() => this.loop());
  },
  hit(p) {
    const dx = this.puck.x - p.x, dy = this.puck.y - p.y;
    const d = Math.sqrt(dx*dx + dy*dy);
    if (d < 24) {
      this.puck.vx = dx * 0.3; this.puck.vy = dy * 0.3;
      const sp = Math.sqrt(this.puck.vx**2 + this.puck.vy**2) || 1;
      this.puck.vx = (this.puck.vx / sp) * 4; this.puck.vy = (this.puck.vy / sp) * 4;
    }
  },
  stop() { if (this.anim) cancelAnimationFrame(this.anim); }
};
