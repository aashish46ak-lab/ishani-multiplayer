const CarromGame = {
  coins: [], striker: null, canvas: null, ctx: null, anim: null, aiming: false,
  start() {
    Engine.reset();
    const stage = Engine.clearStage();
    const c = document.createElement('canvas');
    c.width = 300; c.height = 300;
    c.style.width = '100%'; c.style.maxWidth = '340px'; c.style.borderRadius = '12px'; c.style.background = '#a16207';
    stage.appendChild(c);
    this.canvas = c; this.ctx = c.getContext('2d');
    this.coins = [
      { x: 150, y: 150, color: '#f8fafc', owner: null },
      { x: 130, y: 140, color: '#1c1917', owner: 'red' },
      { x: 170, y: 140, color: '#dc2626', owner: 'blue' },
      { x: 130, y: 160, color: '#dc2626', owner: 'blue' },
      { x: 170, y: 160, color: '#1c1917', owner: 'red' }
    ];
    this.striker = { x: 150, y: 260, vx: 0, vy: 0 };
    this.aiming = false;
    c.addEventListener('pointerdown', e => {
      const rect = c.getBoundingClientRect();
      this.aim = {
        x: ((e.clientX - rect.left) / rect.width) * 300,
        y: ((e.clientY - rect.top) / rect.height) * 300
      };
      this.aiming = true;
    });
    c.addEventListener('pointerup', e => {
      if (!this.aiming) return;
      this.aiming = false;
      const rect = c.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 300;
      const y = ((e.clientY - rect.top) / rect.height) * 300;
      this.striker.vx = (this.striker.x - x) * 0.15;
      this.striker.vy = (this.striker.y - y) * 0.15;
      this.moving = true;
    });
    Engine.setFooter('Drag to aim striker');
    this.loop();
  },
  loop() {
    const ctx = this.ctx;
    if (this.moving) {
      this.striker.x += this.striker.vx; this.striker.y += this.striker.vy;
      this.striker.vx *= 0.98; this.striker.vy *= 0.98;
      this.coins.forEach(coin => {
        const dx = coin.x - this.striker.x, dy = coin.y - this.striker.y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if (d < 18) {
          coin.x += dx * 0.3; coin.y += dy * 0.3;
          // pocket check
          const pockets = [[20,20],[280,20],[20,280],[280,280]];
          for (const [px, py] of pockets) {
            if (Math.hypot(coin.x - px, coin.y - py) < 16) {
              if (coin.owner === Engine.turn || coin.owner === null) {
                Engine.addScore(Engine.turn);
              }
              coin.x = -100; coin.y = -100;
            }
          }
        }
      });
      if (Math.abs(this.striker.vx) < 0.1 && Math.abs(this.striker.vy) < 0.1) {
        this.moving = false;
        this.striker = { x: 150, y: Engine.turn === 'red' ? 260 : 40, vx: 0, vy: 0 };
        Engine.switchTurn();
        if (Engine.scores.red + Engine.scores.blue >= 5) {
          const w = Engine.scores.red >= Engine.scores.blue ? 'red' : 'blue';
          Engine.showResult(w, 'Board cleared');
          this.stop(); return;
        }
      }
      if (this.striker.x < 10 || this.striker.x > 290) this.striker.vx *= -1;
      if (this.striker.y < 10 || this.striker.y > 290) this.striker.vy *= -1;
    }
    ctx.fillStyle = '#a16207'; ctx.fillRect(0, 0, 300, 300);
    [[20,20],[280,20],[20,280],[280,280]].forEach(([x,y]) => {
      ctx.fillStyle = '#1c1917'; ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI*2); ctx.fill();
    });
    this.coins.forEach(coin => {
      if (coin.x < 0) return;
      ctx.fillStyle = coin.color; ctx.beginPath(); ctx.arc(coin.x, coin.y, 9, 0, Math.PI*2); ctx.fill();
    });
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(this.striker.x, this.striker.y, 11, 0, Math.PI*2); ctx.fill();
    this.anim = requestAnimationFrame(() => this.loop());
  },
  stop() { if (this.anim) cancelAnimationFrame(this.anim); }
};
