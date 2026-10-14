// ============================================================================
// AGENTES DE LUZ 2026 - MOTOR ARCADE 3D/CANVAS: DAVID VS. GOLIAT
// 60FPS Interactive Physics Slingshot, Parabolic 3D Trajectory, Multi-Hitbox
// Boss AI, Bullet-Time Slow-Mo, Particle Engine & WebAudio Synthesizer
// ============================================================================

class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playStretch(power = 0.5) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const baseFreq = 130 + power * 180;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.linearRampToValueAtTime(baseFreq + 90, now + 0.09);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  playLaunch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Elastic whip snap
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.26);
      gain.gain.setValueAtTime(0.38, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);

      // High shimmer tail
      const shimmer = this.ctx.createOscillator();
      const sGain = this.ctx.createGain();
      shimmer.type = 'triangle';
      shimmer.frequency.setValueAtTime(1200, now);
      shimmer.frequency.exponentialRampToValueAtTime(420, now + 0.22);
      sGain.gain.setValueAtTime(0.15, now);
      sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      shimmer.connect(sGain);
      sGain.connect(this.ctx.destination);
      shimmer.start(now);
      shimmer.stop(now + 0.22);
    } catch (e) {}
  }

  playShieldClang() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Metallic bronze clang (inharmonic partials)
      [380, 540, 815, 1190].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = i % 2 === 0 ? 'square' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.85, now + 0.35);
        gain.gain.setValueAtTime(0.14 / (i + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch (e) {}
  }

  playCriticalHit() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Sub-bass impact punch
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(190, now);
      sub.frequency.exponentialRampToValueAtTime(32, now + 0.45);
      subGain.gain.setValueAtTime(0.75, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(now);
      sub.stop(now + 0.45);

      // Celestial power chord chime
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const bell = this.ctx.createOscillator();
        const bellGain = this.ctx.createGain();
        bell.type = 'triangle';
        bell.frequency.setValueAtTime(freq, now + idx * 0.03);
        bellGain.gain.setValueAtTime(0.22, now + idx * 0.03);
        bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
        bell.connect(bellGain);
        bellGain.connect(this.ctx.destination);
        bell.start(now + idx * 0.03);
        bell.stop(now + 0.65);
      });
    } catch (e) {}
  }

  playOrbCollect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [587.33, 880, 1174.66].forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.045);
        gain.gain.setValueAtTime(0.18, now + i * 0.045);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.045 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.045);
        osc.stop(now + i * 0.045 + 0.25);
      });
    } catch (e) {}
  }

  playVictoryTriumph() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const chord = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5, 1318.51];
      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = i < 3 ? 'triangle' : 'sine';
        const start = now + i * 0.07;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.22, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 2.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 2.2);
      });
    } catch (e) {}
  }
}

const sfx = new SoundFX();

document.addEventListener('DOMContentLoaded', () => {
  const gameWrap = document.getElementById('pov-game-wrap');
  const canvas = document.getElementById('pov-battle-canvas');
  const screenFx = document.getElementById('pov-screen-fx');
  const bossCard = document.getElementById('boss-hud-card');
  const bossHpFill = document.getElementById('boss-hp-fill');
  const bossHpDelay = document.getElementById('boss-hp-delay');
  const bossHpText = document.getElementById('boss-hp-text');
  const bossStatusSub = document.getElementById('boss-status-sub');
  const faithScoreVal = document.getElementById('faith-score-val');
  const faithScorePill = document.getElementById('faith-score-pill');
  const goliatDialogue = document.getElementById('goliat-dialogue');
  const arcadeCallout = document.getElementById('arcade-callout');
  const stonesSlots = document.getElementById('stones-slots');
  const lightFlash = document.getElementById('divine-light-flash');
  const skipBtn = document.getElementById('skip-game-btn');
  const quickShootBtn = document.getElementById('quick-shoot-btn');
  const soundToggle = document.getElementById('sound-toggle');
  const replayTrigger = document.getElementById('replay-game-trigger');

  if (!gameWrap || !canvas) return;
  const ctx = canvas.getContext('2d');

  // Load Goliat Boss Sprite
  const goliatImg = new Image();
  goliatImg.src = 'assets/goliat_front.png';
  let goliatLoaded = false;
  goliatImg.onload = () => {
    goliatLoaded = true;
  };

  // High-DPI Responsive Viewport State
  let W = window.innerWidth;
  let H = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // ==========================================================================
  // GAME STATE & ENTITIES
  // ==========================================================================
  const STONE_NAMES = ['FE', 'VALOR', 'LUZ', 'VERDAD', 'GRACIA'];
  const STONE_COLORS = ['#38bdf8', '#facc15', '#fb923c', '#4ade80', '#e879f9'];

  let gameActive = true;
  let timeScale = 1.0; // For Bullet-Time Slow-Mo!
  let clock = 0;
  let score = 0;
  let combo = 0;
  let currentStoneIdx = 0;
  let stonesRemaining = [true, true, true, true, true];

  // Camera zoom / pan effects (for slow-mo critical impact)
  const camera = {
    zoom: 1,
    targetZoom: 1,
    focusX: 0,
    focusY: 0,
    shakePower: 0
  };

  // Boss State: Goliat of Gath
  const boss = {
    hp: 100,
    maxHp: 100,
    x: 0,
    y: 0,
    baseScale: 1,
    patrolPhase: 0,
    breathPhase: 0,
    shieldIntact: true,
    staggerTimer: 0,
    hitFlash: 0,
    isKO: false,
    koFallAngle: 0,
    koFallY: 0,
    koStarsPhase: 0,
    heavenBeamAlpha: 0,
    // Computed hitboxes in screen space every frame
    headBox: { x: 0, y: 0, r: 42 },
    shieldBox: { x: 0, y: 0, r: 58 },
    bodyBox: { x: 0, y: 0, r: 75 }
  };

  // First-Person Slingshot State (Bottom Center)
  const slingshot = {
    anchorX: 0,
    anchorY: 0,
    leftTipX: 0,
    leftTipY: 0,
    rightTipX: 0,
    rightTipY: 0,
    pouchX: 0,
    pouchY: 0,
    velX: 0,
    velY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    aimTargetX: 0,
    aimTargetY: 0,
    pullPower: 0,
    lockedZone: null // 'HEAD' | 'SHIELD' | 'ORB' | null
  };

  // Active 3D Flying Stones
  let projectiles = [];
  // Particles, Sparks, Shockwaves & Floating Combat Text
  let particles = [];
  let shockwaves = [];
  let floatingTexts = [];
  // Collectible Faith Orbs floating in the valley
  let faithOrbs = [];
  // Background Clouds & Golden Dust Motes
  let clouds = [];
  let dustMotes = [];

  function initEnvironment() {
    clouds = [];
    for (let i = 0; i < 6; i++) {
      clouds.push({
        x: Math.random() * W,
        y: H * (0.08 + Math.random() * 0.22),
        w: 110 + Math.random() * 140,
        h: 32 + Math.random() * 28,
        speed: 8 + Math.random() * 14,
        alpha: 0.18 + Math.random() * 0.25
      });
    }

    dustMotes = [];
    for (let i = 0; i < 36; i++) {
      dustMotes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 1.2 + Math.random() * 2.8,
        vy: -8 - Math.random() * 18,
        vx: -5 + Math.random() * 10,
        phase: Math.random() * Math.PI * 2
      });
    }

    spawnFaithOrbs();
  }

  function spawnFaithOrbs() {
    faithOrbs = [
      {
        id: 1,
        angle: 0.4,
        radiusX: Math.min(W * 0.34, 240),
        radiusY: 36,
        yOffset: -40,
        r: 22,
        label: '✨ FE',
        color: '#facc15',
        active: true,
        respawnTimer: 0
      },
      {
        id: 2,
        angle: Math.PI + 0.4,
        radiusX: Math.min(W * 0.34, 240),
        radiusY: 36,
        yOffset: 15,
        r: 22,
        label: '⚡ LUZ',
        color: '#38bdf8',
        active: true,
        respawnTimer: 0
      }
    ];
  }

  initEnvironment();

  // ==========================================================================
  // UI & HUD HELPERS
  // ==========================================================================
  if (soundToggle) {
    soundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sfx.muted = !sfx.muted;
      soundToggle.textContent = sfx.muted ? '🔇' : '🔊';
    });
  }

  function addScore(pts) {
    score += pts;
    if (faithScoreVal) faithScoreVal.textContent = `${score} PTS`;
    if (faithScorePill) {
      faithScorePill.classList.remove('score-pop');
      void faithScorePill.offsetWidth;
      faithScorePill.classList.add('score-pop');
      setTimeout(() => faithScorePill.classList.remove('score-pop'), 240);
    }
  }

  function showCallout(text, color = '#fde047') {
    if (!arcadeCallout) return;
    arcadeCallout.innerHTML = text;
    arcadeCallout.style.color = color;
    arcadeCallout.classList.add('show');
    clearTimeout(arcadeCallout._timer);
    arcadeCallout._timer = setTimeout(() => {
      arcadeCallout.classList.remove('show');
    }, 1150);
  }

  function updateStonesHUD() {
    if (!stonesSlots) return;
    const orbs = stonesSlots.querySelectorAll('.stone-orb');
    orbs.forEach((orb, idx) => {
      if (stonesRemaining[idx]) {
        orb.classList.add('active');
      } else {
        orb.classList.remove('active');
      }
    });
  }

  function consumeStone() {
    stonesRemaining[currentStoneIdx] = false;
    const firedIdx = currentStoneIdx;
    currentStoneIdx = (currentStoneIdx + 1) % 5;
    updateStonesHUD();

    // Auto-refill all 5 stones from the brook if all were used so kids never get stuck!
    if (stonesRemaining.every((s) => !s)) {
      setTimeout(() => {
        stonesRemaining = [true, true, true, true, true];
        updateStonesHUD();
        spawnFloatingText(W * 0.5, H * 0.78, '🌊 ¡5 PIEDRAS NUEVAS DEL ARROYO!', '#38bdf8', 1.1);
      }, 650);
    }
    return firedIdx;
  }

  function updateBossHUD() {
    const pct = Math.max(0, Math.round((boss.hp / boss.maxHp) * 100));
    if (bossHpFill) bossHpFill.style.width = `${pct}%`;
    if (bossHpDelay) bossHpDelay.style.width = `${pct}%`;
    if (bossHpText) bossHpText.textContent = `${pct}%`;

    if (bossCard) {
      bossCard.classList.remove('boss-hit-pulse');
      void bossCard.offsetWidth;
      bossCard.classList.add('boss-hit-pulse');
      setTimeout(() => bossCard.classList.remove('boss-hit-pulse'), 280);
    }

    if (bossStatusSub) {
      if (boss.hp <= 0) {
        bossStatusSub.innerHTML = '👑 ¡GIGANTE DERROTADO CON FE!';
      } else if (boss.staggerTimer > 0 || !boss.shieldIntact) {
        bossStatusSub.innerHTML = '💫 ¡GUARDIA ROTA! ¡DISPARA A SU FRENTE AHORA! 🎯';
      } else {
        bossStatusSub.innerHTML = '🛡️ Escudo activo &bull; ¡Apunta al blanco en la FRENTE! 🎯';
      }
    }
  }

  // ==========================================================================
  // PARTICLE & FX GENERATORS
  // ==========================================================================
  function spawnExplosion(x, y, color, count = 28, speedScale = 1, isStar = false) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = (60 + Math.random() * 220) * speedScale;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 40,
        gravity: 340,
        r: 3 + Math.random() * 5.5,
        color: Array.isArray(color) ? color[i % color.length] : color,
        alpha: 1,
        decay: 0.8 + Math.random() * 0.7,
        isStar: isStar || Math.random() > 0.55,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 8
      });
    }
  }

  function spawnShockwave(x, y, maxR = 140, color = '#facc15', lineWidth = 6) {
    shockwaves.push({
      x,
      y,
      r: 8,
      maxR,
      color,
      lineWidth,
      alpha: 1
    });
  }

  function spawnFloatingText(x, y, text, color = '#fde047', scale = 1) {
    floatingTexts.push({
      x,
      y,
      text,
      color,
      scale,
      vy: -75,
      alpha: 1,
      life: 1.15
    });
  }

  // ==========================================================================
  // TARGETING & MAGNETIC AIM-ASSIST CALCULATION
  // ==========================================================================
  function evaluateAimLock(targetX, targetY) {
    // Check if aiming near Forehead Weak Spot
    const distHead = Math.hypot(targetX - boss.headBox.x, targetY - boss.headBox.y);
    const headSnapRadius = boss.staggerTimer > 0 ? boss.headBox.r * 1.65 : boss.headBox.r * 1.35;
    if (distHead <= headSnapRadius) {
      return {
        zone: 'HEAD',
        snapX: boss.headBox.x + (targetX - boss.headBox.x) * 0.25,
        snapY: boss.headBox.y + (targetY - boss.headBox.y) * 0.25
      };
    }

    // Check if aiming near an active Faith Orb
    for (const orb of faithOrbs) {
      if (!orb.active) continue;
      const distOrb = Math.hypot(targetX - orb.x, targetY - orb.y);
      if (distOrb <= orb.r * 1.6) {
        return {
          zone: 'ORB',
          snapX: orb.x,
          snapY: orb.y,
          orbRef: orb
        };
      }
    }

    // Check if aiming at Shield
    const distShield = Math.hypot(targetX - boss.shieldBox.x, targetY - boss.shieldBox.y);
    if (distShield <= boss.shieldBox.r * 1.15) {
      return {
        zone: 'SHIELD',
        snapX: targetX,
        snapY: targetY
      };
    }

    return {
      zone: null,
      snapX: targetX,
      snapY: targetY
    };
  }

  // ==========================================================================
  // UNIFIED INPUT CONTROLLER:
  // Supports BOTH:
  // 1) Direct Tap/Click anywhere on screen -> Auto-pulls & shoots where tapped!
  // 2) Drag & Release (Slingshot pull-back OR aiming reticle drag) -> 3D Arc!
  // ==========================================================================
  let pointerDown = false;
  let pointerDownTime = 0;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let startedNearSlingshot = false;

  function computeAimFromPointer(px, py) {
    // Clamp inside playable arena
    const clampedX = Math.max(30, Math.min(W - 30, px));
    const clampedY = Math.max(70, Math.min(H - 130, py));

    if (startedNearSlingshot) {
      // Angry-Birds pull-back style: pulling down/left aims up/right toward Goliat!
      const dx = slingshot.anchorX - clampedX;
      const dy = Math.max(10, clampedY - slingshot.anchorY);
      const pullDist = Math.min(130, Math.hypot(dx, dy));
      slingshot.pullPower = Math.min(1, pullDist / 95);

      slingshot.pouchX = slingshot.anchorX - dx * 0.65;
      slingshot.pouchY = slingshot.anchorY + Math.min(95, dy * 0.75);

      // Project target forward into the valley
      const projX = boss.x + dx * 2.4;
      const projY = boss.headBox.y + (65 - dy) * 1.8;
      const lock = evaluateAimLock(projX, projY);
      slingshot.aimTargetX = lock.snapX;
      slingshot.aimTargetY = lock.snapY;
      slingshot.lockedZone = lock.zone;
    } else {
      // Direct Point/Drag Aiming: crosshair follows finger/mouse directly!
      const lock = evaluateAimLock(clampedX, clampedY);
      slingshot.aimTargetX = lock.snapX;
      slingshot.aimTargetY = lock.snapY;
      slingshot.lockedZone = lock.zone;

      // Slingshot pouch naturally pulls back opposite to the aimed target
      const aimDX = (slingshot.aimTargetX - slingshot.anchorX) / (W * 0.5);
      slingshot.pullPower = 0.85;
      slingshot.pouchX = slingshot.anchorX - aimDX * 48;
      slingshot.pouchY = slingshot.anchorY + 58;
    }
  }

  function onPointerDown(clientX, clientY) {
    if (!gameActive || boss.isKO) return;
    sfx.init();
    pointerDown = true;
    pointerDownTime = performance.now();
    pointerStartX = clientX;
    pointerStartY = clientY;

    // Check if user grabbed the slingshot pouch area at the bottom
    const distToSling = Math.hypot(clientX - slingshot.anchorX, clientY - slingshot.anchorY);
    startedNearSlingshot = distToSling < 120 && clientY > H * 0.62;

    slingshot.isDragging = true;
    computeAimFromPointer(clientX, clientY);
    sfx.playStretch(0.4);
  }

  function onPointerMove(clientX, clientY) {
    if (!gameActive || boss.isKO) return;
    if (!pointerDown) {
      // Hovering with mouse: softly orient slingshot & target reticle
      const lock = evaluateAimLock(clientX, clientY);
      slingshot.aimTargetX = lock.snapX;
      slingshot.aimTargetY = lock.snapY;
      slingshot.lockedZone = lock.zone;
      const aimDX = (slingshot.aimTargetX - slingshot.anchorX) / (W * 0.5);
      slingshot.pouchX = slingshot.anchorX - aimDX * 20;
      slingshot.pouchY = slingshot.anchorY + 14;
      return;
    }
    computeAimFromPointer(clientX, clientY);
  }

  function onPointerUp(clientX, clientY) {
    if (!pointerDown || !gameActive || boss.isKO) return;
    pointerDown = false;
    slingshot.isDragging = false;

    const elapsed = performance.now() - pointerDownTime;
    const moveDist = Math.hypot(clientX - pointerStartX, clientY - pointerStartY);

    // If user tapped near the slingshot without pulling, aim straight at Goliat's forehead!
    if (startedNearSlingshot && moveDist < 18 && elapsed < 350) {
      slingshot.aimTargetX = boss.headBox.x;
      slingshot.aimTargetY = boss.headBox.y;
      slingshot.lockedZone = 'HEAD';
    } else {
      computeAimFromPointer(clientX, clientY);
    }

    launchProjectile(slingshot.aimTargetX, slingshot.aimTargetY, slingshot.lockedZone);
  }

  // Bind Mouse & Touch Events to Canvas
  canvas.addEventListener('mousedown', (e) => {
    onPointerDown(e.clientX, e.clientY);
  });
  window.addEventListener('mousemove', (e) => {
    onPointerMove(e.clientX, e.clientY);
  });
  window.addEventListener('mouseup', (e) => {
    if (pointerDown) onPointerUp(e.clientX, e.clientY);
  });

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      onPointerDown(t.clientX, t.clientY);
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      onPointerMove(t.clientX, t.clientY);
    }
  }, { passive: true });

  canvas.addEventListener('touchend', (e) => {
    const t = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : { clientX: pointerStartX, clientY: pointerStartY };
    onPointerUp(t.clientX, t.clientY);
  });

  // Quick-Fire Faith Button (Assisted Lock-On Shot)
  if (quickShootBtn) {
    quickShootBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!gameActive || boss.isKO) return;
      sfx.init();
      slingshot.pouchX = slingshot.anchorX;
      slingshot.pouchY = slingshot.anchorY + 75;
      sfx.playStretch(0.9);
      setTimeout(() => {
        launchProjectile(boss.headBox.x, boss.headBox.y, 'HEAD');
      }, 90);
    });
  }

  // ==========================================================================
  // LAUNCH 3D PARABOLIC STONE PROJECTILE
  // ==========================================================================
  function launchProjectile(targetX, targetY, lockedZone) {
    sfx.playLaunch();
    const stoneIdx = consumeStone();
    const stoneColor = STONE_COLORS[stoneIdx];
    const stoneName = STONE_NAMES[stoneIdx];

    // Spring-back velocity on the slingshot pouch
    slingshot.velX = (slingshot.anchorX - slingshot.pouchX) * 18;
    slingshot.velY = (slingshot.anchorY - slingshot.pouchY) * 18;

    const startX = slingshot.pouchX;
    const startY = slingshot.pouchY;

    // Parabolic arc height in 3D perspective
    const dist = Math.hypot(targetX - startX, targetY - startY);
    const arcHeight = Math.max(65, Math.min(180, dist * 0.34));

    projectiles.push({
      startX,
      startY,
      x: startX,
      y: startY,
      targetX,
      targetY,
      arcHeight,
      t: 0,
      duration: 0.42, // 420ms snappy 3D flight
      scale: 1.9,
      rot: 0,
      color: stoneColor,
      name: stoneName,
      lockedZone,
      trail: []
    });
  }

  // ==========================================================================
  // RESOLVE PROJECTILE IMPACT IN 3D SPACE
  // ==========================================================================
  function handleProjectileImpact(proj) {
    const ix = proj.targetX;
    const iy = proj.targetY;

    // 1. Check if hit a floating Faith Orb along or at the end of flight
    for (const orb of faithOrbs) {
      if (!orb.active) continue;
      if (Math.hypot(ix - orb.x, iy - orb.y) <= orb.r * 1.7) {
        orb.active = false;
        orb.respawnTimer = 4.0;
        sfx.playOrbCollect();
        addScore(350);
        spawnShockwave(orb.x, orb.y, 95, orb.color, 5);
        spawnExplosion(orb.x, orb.y, [orb.color, '#ffffff', '#facc15'], 24, 1.1, true);
        spawnFloatingText(orb.x, orb.y - 15, `${orb.label} +350 PTS!`, orb.color, 1.25);

        // Supercharge: Orb fires a secondary homing bolt of light straight into Goliat's forehead!
        setTimeout(() => {
          if (!boss.isKO && gameActive) {
            projectiles.push({
              startX: orb.x,
              startY: orb.y,
              x: orb.x,
              y: orb.y,
              targetX: boss.headBox.x,
              targetY: boss.headBox.y,
              arcHeight: 45,
              t: 0,
              duration: 0.3,
              scale: 1.5,
              rot: 0,
              color: '#facc15',
              name: 'RAYO DE LUZ',
              lockedZone: 'HEAD',
              trail: []
            });
          }
        }, 120);
        return;
      }
    }

    // 2. Check distance to Goliat's Forehead Weak Spot
    const distHead = Math.hypot(ix - boss.headBox.x, iy - boss.headBox.y);
    const effectiveHeadR = boss.staggerTimer > 0 ? boss.headBox.r * 1.65 : boss.headBox.r * 1.35;

    if (proj.lockedZone === 'HEAD' || distHead <= effectiveHeadR) {
      // CRITICAL HEADSHOT ON FOREHEAD!
      combo++;
      const dmg = boss.hp <= 65 || !boss.shieldIntact || combo >= 2 ? 100 : 65;
      boss.hp = Math.max(0, boss.hp - dmg);
      boss.hitFlash = 1.0;
      boss.staggerTimer = 3.2;
      boss.shieldIntact = false;

      sfx.playCriticalHit();
      addScore(500 * combo);
      updateBossHUD();

      // Screen Flash & Shake
      if (screenFx) {
        screenFx.classList.add('crit-flash');
        setTimeout(() => screenFx.classList.remove('crit-flash'), 260);
      }
      gameWrap.classList.remove('camera-shake', 'camera-shake-heavy');
      void gameWrap.offsetWidth;
      gameWrap.classList.add('camera-shake-heavy');

      spawnShockwave(ix, iy, 190, '#facc15', 8);
      spawnShockwave(ix, iy, 110, '#ffffff', 4);
      spawnExplosion(ix, iy, ['#facc15', '#ffffff', '#fb923c', '#38bdf8'], 42, 1.35, true);

      if (boss.hp <= 0) {
        // KNOCKOUT FINISHER!
        spawnFloatingText(ix, iy - 25, '¡¡GOLPE DE FE DEFINITIVO!! 💥', '#fde047', 1.45);
        showCallout('¡¡K.O. CELESTIAL!! 💥👑', '#fde047');
        triggerBossKnockout(ix, iy);
      } else {
        spawnFloatingText(ix, iy - 20, `¡¡TIRO CRÍTICO!! -${dmg}% 🎯`, '#fde047', 1.3);
        showCallout(`¡PUNTO DÉBIL! ¡UN TIRO MÁS! 🔥`, '#fde047');
        if (goliatDialogue) {
          goliatDialogue.innerHTML = '¡¡AYYY MI FRENTE!! 😵💫 ¡¿QUÉ PODER ES ESE?!';
          goliatDialogue.className = 'goliat-dialogue stagger-bubble';
        }
      }
      return;
    }

    // 3. Check if hit Shield or Body
    const distShield = Math.hypot(ix - boss.shieldBox.x, iy - boss.shieldBox.y);
    const distBody = Math.hypot(ix - boss.bodyBox.x, iy - boss.bodyBox.y);

    if (distShield <= boss.shieldBox.r * 1.2 || distBody <= boss.bodyBox.r * 1.15) {
      combo++;
      const dmg = 35;
      boss.hp = Math.max(0, boss.hp - dmg);
      boss.hitFlash = 0.85;
      boss.staggerTimer = 2.8;
      boss.shieldIntact = false;

      sfx.playShieldClang();
      addScore(200);
      updateBossHUD();

      gameWrap.classList.remove('camera-shake');
      void gameWrap.offsetWidth;
      gameWrap.classList.add('camera-shake');

      spawnShockwave(ix, iy, 120, '#fb923c', 5);
      spawnExplosion(ix, iy, ['#fb923c', '#facc15', '#e2e8f0'], 26, 1.0, false);

      if (boss.hp <= 0) {
        spawnFloatingText(ix, iy - 20, '¡¡DERRIBADO CON FE!! 💥', '#fde047', 1.4);
        showCallout('¡¡GIGANTE VENCIDO!! 👑', '#fde047');
        triggerBossKnockout(ix, iy);
      } else {
        spawnFloatingText(ix, iy - 15, `🛡️ ¡GUARDIA ROTA! -${dmg}%`, '#fb923c', 1.15);
        showCallout('🛡️ ¡ESCUDO ROTO! ¡APUNTA A LA FRENTE! 🎯', '#fb923c');
        if (goliatDialogue) {
          goliatDialogue.innerHTML = '¡¿ROMPISTE MI GUARDIA?! 😱 ¡NO APUNTES A MI FRENTE!';
          goliatDialogue.className = 'goliat-dialogue stagger-bubble';
        }
      }
      return;
    }

    // 4. Missed shot (hit the valley ground/rocks)
    combo = 0;
    spawnShockwave(ix, iy, 55, '#94a3b8', 3);
    spawnExplosion(ix, iy, ['#cbd5e1', '#94a3b8', '#facc15'], 12, 0.6, false);
    spawnFloatingText(ix, iy - 10, '¡Casi! ¡Toca el blanco 🎯 en su frente!', '#e2e8f0', 0.95);
  }

  // ==========================================================================
  // BOSS KNOCKOUT SEQUENCE (BULLET-TIME SLOW-MO + HEAVENLY BEAM)
  // ==========================================================================
  function triggerBossKnockout(hitX, hitY) {
    boss.isKO = true;
    timeScale = 0.22; // Bullet-Time Slow-Mo!
    camera.targetZoom = 1.18;
    camera.focusX = (hitX - W * 0.5) * 0.25;
    camera.focusY = (hitY - H * 0.5) * 0.25;

    if (goliatDialogue) {
      goliatDialogue.innerHTML = '¡¡NOOOO!! 😵💫 ¡¡CON DIOS NINGÚN GIGANTE PUEDE!!';
      goliatDialogue.className = 'goliat-dialogue defeated-bubble';
    }

    // Restore normal speed as he timber-falls and summon the Celestial Beam
    setTimeout(() => {
      timeScale = 1.0;
      camera.targetZoom = 1.0;
      camera.focusX = 0;
      camera.focusY = 0;
    }, 550);

    // Trigger blinding Celestial Light Transition
    setTimeout(() => {
      triggerDivineFlash();
    }, 1550);
  }

  function triggerDivineFlash() {
    sfx.playVictoryTriumph();
    if (lightFlash) lightFlash.classList.add('active');

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 160,
        spread: 160,
        origin: { y: 0.45 }
      });
    }

    setTimeout(() => {
      gameWrap.classList.add('fade-away');
      setTimeout(() => {
        if (lightFlash) lightFlash.classList.remove('active');
        gameWrap.style.display = 'none';
        gameActive = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 820);
    }, 1850);
  }

  // Skip Intro Handler
  function skipIntro() {
    sfx.init();
    gameWrap.classList.add('fade-away');
    setTimeout(() => {
      gameWrap.style.display = 'none';
      gameActive = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 350);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      skipIntro();
    });
  }

  // Replay Game from Invitation Page
  if (replayTrigger) {
    replayTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      // Reset Boss & Game State
      boss.hp = 100;
      boss.shieldIntact = true;
      boss.staggerTimer = 0;
      boss.hitFlash = 0;
      boss.isKO = false;
      boss.koFallAngle = 0;
      boss.koFallY = 0;
      boss.heavenBeamAlpha = 0;
      score = 0;
      combo = 0;
      timeScale = 1.0;
      camera.zoom = 1;
      camera.targetZoom = 1;
      stonesRemaining = [true, true, true, true, true];
      projectiles = [];
      particles = [];
      shockwaves = [];
      floatingTexts = [];
      spawnFaithOrbs();
      updateStonesHUD();
      updateBossHUD();
      if (faithScoreVal) faithScoreVal.textContent = '0 PTS';
      if (goliatDialogue) {
        goliatDialogue.innerHTML = '¡JAJAJA! ¿TÚ CONTRA MÍ CON UNA HONDA? 🪓';
        goliatDialogue.className = 'goliat-dialogue';
      }

      gameActive = true;
      gameWrap.style.display = 'flex';
      gameWrap.classList.remove('fade-away');
      resizeCanvas();
      window.scrollTo({ top: 0 });
    });
  }

  // ==========================================================================
  // 60FPS RENDER & PHYSICS LOOP
  // ==========================================================================
  let lastTime = performance.now();

  function renderStar(cx, cy, spikes, outerR, innerR, color, rot = 0) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i * Math.PI) / spikes;
      if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function drawEnvironment(dt) {
    // 1. Epic Valley of Elah Sky Gradient
    const horizonY = H * 0.62;
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGrad.addColorStop(0, '#06152d');
    skyGrad.addColorStop(0.45, '#0f3661');
    skyGrad.addColorStop(0.82, '#25638f');
    skyGrad.addColorStop(1, '#f59e0b');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, horizonY + 10);

    // 2. Volumetric Rotating Celestial God-Rays from Horizon Center
    ctx.save();
    ctx.translate(W * 0.5, horizonY * 0.65);
    ctx.rotate(clock * 0.08);
    const rayCount = 16;
    for (let i = 0; i < rayCount; i++) {
      const a1 = (i * Math.PI * 2) / rayCount;
      const a2 = a1 + Math.PI / rayCount;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a1) * Math.max(W, H), Math.sin(a1) * Math.max(W, H));
      ctx.lineTo(Math.cos(a2) * Math.max(W, H), Math.sin(a2) * Math.max(W, H));
      ctx.closePath();
      ctx.fillStyle = 'rgba(253, 224, 71, 0.055)';
      ctx.fill();
    }
    ctx.restore();

    // 3. Drifting Clouds
    clouds.forEach((c) => {
      c.x += c.speed * dt;
      if (c.x - c.w > W) c.x = -c.w;
      ctx.save();
      ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.w * 0.5, c.h * 0.5, 0, 0, Math.PI * 2);
      ctx.ellipse(c.x - c.w * 0.25, c.y + 5, c.w * 0.35, c.h * 0.4, 0, 0, Math.PI * 2);
      ctx.ellipse(c.x + c.w * 0.25, c.y + 4, c.w * 0.35, c.h * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 4. Distant Biblical Mountains & Hills of Elah
    ctx.fillStyle = '#122b4a';
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(W * 0.18, horizonY - 95);
    ctx.lineTo(W * 0.38, horizonY - 35);
    ctx.lineTo(W * 0.65, horizonY - 110);
    ctx.lineTo(W * 0.85, horizonY - 45);
    ctx.lineTo(W, horizonY - 85);
    ctx.lineTo(W, horizonY);
    ctx.closePath();
    ctx.fill();

    // Closer warm sandstone ridge
    ctx.fillStyle = '#1e3a5f';
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.quadraticCurveTo(W * 0.25, horizonY - 55, W * 0.5, horizonY - 18);
    ctx.quadraticCurveTo(W * 0.75, horizonY - 62, W, horizonY - 10);
    ctx.lineTo(W, horizonY);
    ctx.closePath();
    ctx.fill();

    // 5. 3D Perspective Valley Battlefield Floor
    const groundGrad = ctx.createLinearGradient(0, horizonY, 0, H);
    groundGrad.addColorStop(0, '#78350f');
    groundGrad.addColorStop(0.28, '#451a03');
    groundGrad.addColorStop(1, '#091526');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, horizonY, W, H - horizonY);

    // Perspective Grid Lines converging to Valley Horizon
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.12)';
    ctx.lineWidth = 1.5;
    const vanishX = W * 0.5;
    const vanishY = horizonY - 10;
    for (let i = -6; i <= 6; i++) {
      ctx.beginPath();
      ctx.moveTo(vanishX + i * 28, horizonY);
      ctx.lineTo(vanishX + i * 240, H);
      ctx.stroke();
    }
    // Horizontal depth rings on the valley floor
    [0.08, 0.2, 0.38, 0.62, 0.88].forEach((ratio) => {
      const y = horizonY + (H - horizonY) * ratio;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    });

    // Brook of Elah (Glowing stream strip at bottom foreground)
    const brookY = H * 0.84;
    const brookGrad = ctx.createLinearGradient(0, brookY, 0, H);
    brookGrad.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
    brookGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.35)');
    brookGrad.addColorStop(1, 'rgba(3, 105, 161, 0.5)');
    ctx.fillStyle = brookGrad;
    ctx.fillRect(0, brookY, W, H - brookY);
  }

  function updateAndDrawBoss(dt) {
    const horizonY = H * 0.62;
    boss.patrolPhase += dt * (boss.staggerTimer > 0 ? 0.6 : 1.55);
    boss.breathPhase += dt * 3.2;

    if (boss.staggerTimer > 0) {
      boss.staggerTimer = Math.max(0, boss.staggerTimer - dt);
    }
    if (boss.hitFlash > 0) {
      boss.hitFlash = Math.max(0, boss.hitFlash - dt * 3.5);
    }

    // Patrol sway & breathing
    const patrolRange = Math.min(W * 0.16, 85);
    const swayX = boss.isKO ? 0 : Math.sin(boss.patrolPhase) * patrolRange;
    const bobY = boss.isKO ? 0 : Math.abs(Math.cos(boss.patrolPhase * 2)) * 8;
    const breathScale = 1 + Math.sin(boss.breathPhase) * 0.018;

    // Responsive Goliat dimensions
    const bossHeight = Math.min(H * 0.51, Math.max(260, W * 0.72));
    const bossWidth = bossHeight;
    boss.x = W * 0.5 + swayX;
    boss.y = horizonY + 38 - bobY;

    if (boss.isKO) {
      boss.koFallAngle = Math.min(Math.PI * 0.46, boss.koFallAngle + dt * 2.4);
      boss.koFallY = Math.min(90, boss.koFallY + dt * 150);
      boss.koStarsPhase += dt * 6;
      boss.heavenBeamAlpha = Math.min(1, boss.heavenBeamAlpha + dt * 1.4);
    }

    // Compute exact screen-space hitboxes for Forehead, Shield, and Body
    const headOffsetX = boss.isKO ? 60 : 0;
    const headOffsetY = -bossHeight * 0.77;
    boss.headBox = {
      x: boss.x + headOffsetX,
      y: boss.y + headOffsetY + boss.koFallY,
      r: Math.max(30, bossHeight * 0.11)
    };
    boss.shieldBox = {
      x: boss.x + bossWidth * 0.23,
      y: boss.y - bossHeight * 0.44,
      r: Math.max(42, bossHeight * 0.16)
    };
    boss.bodyBox = {
      x: boss.x,
      y: boss.y - bossHeight * 0.46,
      r: Math.max(55, bossHeight * 0.22)
    };

    // Draw Heavenly Victory Pillar of Light on KO
    if (boss.isKO && boss.heavenBeamAlpha > 0) {
      ctx.save();
      const beamGrad = ctx.createLinearGradient(boss.x - 130, 0, boss.x + 130, 0);
      beamGrad.addColorStop(0, 'rgba(253, 224, 71, 0)');
      beamGrad.addColorStop(0.5, `rgba(255, 255, 220, ${boss.heavenBeamAlpha * 0.75})`);
      beamGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(boss.x - 130, 0, 260, H);
      ctx.restore();
    }

    // Ground Shadow beneath Goliat
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.48)';
    ctx.beginPath();
    ctx.ellipse(boss.x, boss.y - 8, bossWidth * 0.28, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Draw Goliat Sprite
    ctx.save();
    ctx.translate(boss.x, boss.y + boss.koFallY);
    if (boss.isKO) {
      ctx.rotate(boss.koFallAngle);
    } else if (boss.staggerTimer > 0) {
      ctx.rotate(Math.sin(clock * 28) * 0.05);
    }
    ctx.scale(breathScale, breathScale);

    if (goliatLoaded) {
      ctx.drawImage(goliatImg, -bossWidth * 0.5, -bossHeight, bossWidth, bossHeight);
    } else {
      // Fallback silhouette while loading
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(0, -bossHeight * 0.5, bossWidth * 0.25, 0, Math.PI * 2);
      ctx.fill();
    }

    // White/Gold Impact Flash Overlay when hit
    if (boss.hitFlash > 0) {
      ctx.fillStyle = `rgba(255, 240, 150, ${boss.hitFlash * 0.55})`;
      ctx.beginPath();
      ctx.arc(0, -bossHeight * 0.52, bossWidth * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Draw Pulsing Weak-Point Target Reticle on Goliat's Forehead!
    if (!boss.isKO) {
      const hx = boss.headBox.x;
      const hy = boss.headBox.y;
      const isHeadLocked = slingshot.lockedZone === 'HEAD';
      const pulseR = boss.headBox.r * (boss.staggerTimer > 0 ? 1.25 : 0.95) + Math.sin(clock * 7) * 4;

      ctx.save();
      ctx.translate(hx, hy);

      // Outer glowing ring
      ctx.strokeStyle = isHeadLocked ? '#22c55e' : '#facc15';
      ctx.lineWidth = isHeadLocked ? 3.5 : 2.5;
      ctx.setLineDash([7, 5]);
      ctx.save();
      ctx.rotate(clock * 2.2);
      ctx.beginPath();
      ctx.arc(0, 0, pulseR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Inner bullseye dot
      ctx.fillStyle = isHeadLocked ? 'rgba(34, 197, 94, 0.38)' : 'rgba(239, 68, 68, 0.32)';
      ctx.beginPath();
      ctx.arc(0, 0, pulseR * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // Callout tag next to forehead
      ctx.font = '900 11px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = isHeadLocked ? '#4ade80' : '#fef08a';
      ctx.shadowColor = 'rgba(0,0,0,0.9)';
      ctx.shadowBlur = 6;
      ctx.fillText(
        isHeadLocked ? '🎯 ¡BLANCO FIJADO!' : boss.staggerTimer > 0 ? '🎯 ¡TIRO LIBRE!' : '🎯 PUNTO DÉBIL',
        0,
        -pulseR - 8
      );
      ctx.restore();
    } else {
      // Draw Spinning Cartoon KO Stars around Goliat's head!
      const starCenterX = boss.x + 55;
      const starCenterY = boss.y - bossHeight * 0.45 + boss.koFallY;
      for (let i = 0; i < 5; i++) {
        const a = boss.koStarsPhase + (i * Math.PI * 2) / 5;
        const sx = starCenterX + Math.cos(a) * 48;
        const sy = starCenterY + Math.sin(a) * 18;
        renderStar(sx, sy, 5, 11, 5, '#facc15', a);
      }
    }
  }

  function updateAndDrawFaithOrbs(dt) {
    faithOrbs.forEach((orb) => {
      if (!orb.active) {
        orb.respawnTimer -= dt;
        if (orb.respawnTimer <= 0) orb.active = true;
        return;
      }
      orb.angle += dt * 1.35;
      orb.x = W * 0.5 + Math.cos(orb.angle) * orb.radiusX;
      orb.y = H * 0.36 + orb.yOffset + Math.sin(orb.angle * 2) * orb.radiusY;

      ctx.save();
      const grad = ctx.createRadialGradient(orb.x, orb.y, 2, orb.x, orb.y, orb.r * 1.4);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.45, orb.color);
      grad.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r * 1.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r * 0.75, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = '800 10px Poppins, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.85)';
      ctx.shadowBlur = 4;
      ctx.fillText(orb.label, orb.x, orb.y + orb.r + 12);
      ctx.restore();
    });
  }

  // ==========================================================================
  // 3D PARABOLIC TRAJECTORY PREDICTOR & FIRST-PERSON SLINGSHOT
  // ==========================================================================
  function drawTrajectoryAndReticle() {
    if (boss.isKO) return;

    const tx = slingshot.aimTargetX || boss.headBox.x;
    const ty = slingshot.aimTargetY || boss.headBox.y;
    const startX = slingshot.pouchX;
    const startY = slingshot.pouchY;
    const dist = Math.hypot(tx - startX, ty - startY);
    const arcHeight = Math.max(65, Math.min(180, dist * 0.34));

    const isHead = slingshot.lockedZone === 'HEAD';
    const isOrb = slingshot.lockedZone === 'ORB';
    const mainColor = isHead ? '#4ade80' : isOrb ? '#38bdf8' : '#facc15';

    // Draw 14 3D Perspective Trajectory Dots from Slingshot Pouch to Target
    const steps = 14;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const px = startX + (tx - startX) * t;
      const py = startY + (ty - startY) * t - Math.sin(t * Math.PI) * arcHeight;
      const dotR = (1 - t * 0.55) * (slingshot.isDragging ? 6.5 : 4.2);

      ctx.save();
      ctx.fillStyle = mainColor;
      ctx.globalAlpha = slingshot.isDragging ? 0.9 - t * 0.35 : 0.45 - t * 0.25;
      ctx.shadowColor = mainColor;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py, dotR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Draw 3D Crosshair at Target Point
    ctx.save();
    ctx.translate(tx, ty);
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = mainColor;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.stroke();

    // Crosshair ticks
    [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].forEach((a) => {
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * 12, Math.sin(a) * 12);
      ctx.lineTo(Math.cos(a) * 26, Math.sin(a) * 26);
      ctx.stroke();
    });
    ctx.restore();
  }

  function updateAndDrawSlingshot(dt) {
    const forkSpread = Math.min(74, W * 0.16);
    const forkHeight = 76;
    slingshot.anchorX = W * 0.5;
    slingshot.anchorY = H - 155;
    slingshot.leftTipX = slingshot.anchorX - forkSpread;
    slingshot.leftTipY = slingshot.anchorY - 22;
    slingshot.rightTipX = slingshot.anchorX + forkSpread;
    slingshot.rightTipY = slingshot.anchorY - 22;

    if (!slingshot.aimTargetX) {
      slingshot.aimTargetX = boss.headBox.x;
      slingshot.aimTargetY = boss.headBox.y;
    }

    // Spring physics when not dragging
    if (!slingshot.isDragging) {
      const restX = slingshot.anchorX;
      const restY = slingshot.anchorY + 16;
      const k = 180; // Spring stiffness
      const damping = 0.82;
      const ax = (restX - slingshot.pouchX) * k;
      const ay = (restY - slingshot.pouchY) * k;
      slingshot.velX = (slingshot.velX + ax * dt) * damping;
      slingshot.velY = (slingshot.velY + ay * dt) * damping;
      slingshot.pouchX += slingshot.velX * dt;
      slingshot.pouchY += slingshot.velY * dt;
    }

    // Draw trajectory arc behind the slingshot pouch
    drawTrajectoryAndReticle();

    const px = slingshot.pouchX;
    const py = slingshot.pouchY;

    // 1. Draw Carved Olive-Wood Y-Frame in Foreground
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 6;

    // Outer bark stroke
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 24;
    ctx.beginPath();
    // Stem
    ctx.moveTo(slingshot.anchorX, H - 40);
    ctx.lineTo(slingshot.anchorX, slingshot.anchorY + 32);
    // Left branch
    ctx.moveTo(slingshot.anchorX, slingshot.anchorY + 32);
    ctx.quadraticCurveTo(slingshot.anchorX - forkSpread * 0.75, slingshot.anchorY + 12, slingshot.leftTipX, slingshot.leftTipY);
    // Right branch
    ctx.moveTo(slingshot.anchorX, slingshot.anchorY + 32);
    ctx.quadraticCurveTo(slingshot.anchorX + forkSpread * 0.75, slingshot.anchorY + 12, slingshot.rightTipX, slingshot.rightTipY);
    ctx.stroke();

    // Inner warm olive wood highlight
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 15;
    ctx.stroke();

    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Leather wraps around the fork tips
    [
      { x: slingshot.leftTipX, y: slingshot.leftTipY },
      { x: slingshot.rightTipX, y: slingshot.rightTipY }
    ].forEach((tip) => {
      ctx.fillStyle = '#7c2d12';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(tip.x - 13, tip.y - 6, 26, 14, 6);
      ctx.fill();
      ctx.stroke();
    });

    // 2. Back Elastic Band (Left Tip -> Pouch)
    ctx.strokeStyle = '#c2410c';
    ctx.lineWidth = Math.max(4.5, 8 - slingshot.pullPower * 3);
    ctx.beginPath();
    ctx.moveTo(slingshot.leftTipX, slingshot.leftTipY);
    ctx.lineTo(px - 14, py);
    ctx.stroke();

    // 3. Glowing River Stone of Faith inside the Pouch
    const activeStoneColor = STONE_COLORS[currentStoneIdx];
    ctx.save();
    ctx.translate(px, py - 4);
    const stoneGrad = ctx.createRadialGradient(-5, -6, 2, 0, 0, 22);
    stoneGrad.addColorStop(0, '#ffffff');
    stoneGrad.addColorStop(0.45, activeStoneColor);
    stoneGrad.addColorStop(1, '#334155');
    ctx.fillStyle = stoneGrad;
    ctx.shadowColor = activeStoneColor;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 19, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Faith Rune on the stone
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 11px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✝', 0, 4);
    ctx.restore();

    // 4. Stitched Leather Pouch cradling the stone
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(px, py + 5, 24, 11, 0, 0, Math.PI);
    ctx.fill();
    ctx.stroke();

    // 5. Front Elastic Band (Right Tip -> Pouch)
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = Math.max(4.5, 8 - slingshot.pullPower * 3);
    ctx.beginPath();
    ctx.moveTo(slingshot.rightTipX, slingshot.rightTipY);
    ctx.lineTo(px + 14, py);
    ctx.stroke();

    ctx.restore();
  }

  // ==========================================================================
  // UPDATE & DRAW FLYING 3D STONES, PARTICLES, SHOCKWAVES & FLOATING TEXT
  // ==========================================================================
  function updateAndDrawProjectiles(dt) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      p.t += dt / p.duration;
      const clampedT = Math.min(1, p.t);

      // Parabolic interpolation in 3D space
      p.x = p.startX + (p.targetX - p.startX) * clampedT;
      p.y = p.startY + (p.targetY - p.startY) * clampedT - Math.sin(clampedT * Math.PI) * p.arcHeight;
      // Perspective scale shrinks from 1.9 down to 0.55 as it flies deep toward Goliat
      p.scale = 1.9 - (1.9 - 0.52) * clampedT;
      p.rot += dt * 18;

      // Save comet trail
      p.trail.push({ x: p.x, y: p.y, r: 14 * p.scale, alpha: 0.85 });
      if (p.trail.length > 10) p.trail.shift();

      // Draw Comet Trail
      p.trail.forEach((pt, idx) => {
        const ratio = (idx + 1) / p.trail.length;
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = ratio * 0.45;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * ratio * 0.75, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Spinning 3D Stone
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(p.scale, p.scale);
      ctx.rotate(p.rot);

      const g = ctx.createRadialGradient(-3, -3, 2, 0, 0, 16);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.5, p.color);
      g.addColorStop(1, '#1e293b');
      ctx.fillStyle = g;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (p.t >= 1) {
        projectiles.splice(i, 1);
        handleProjectileImpact(p);
      }
    }
  }

  function updateAndDrawFX(dt) {
    // Golden Dust Motes
    dustMotes.forEach((m) => {
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      m.phase += dt * 2;
      if (m.y < 0) m.y = H;
      if (m.x < 0) m.x = W;
      if (m.x > W) m.x = 0;

      ctx.save();
      ctx.fillStyle = '#fde047';
      ctx.globalAlpha = 0.25 + Math.sin(m.phase) * 0.2;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Expanding Shockwave Rings
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.r += (sw.maxR - sw.r) * Math.min(1, dt * 11);
      sw.alpha -= dt * 2.2;
      if (sw.alpha <= 0) {
        shockwaves.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.strokeStyle = sw.color;
      ctx.globalAlpha = Math.max(0, sw.alpha);
      ctx.lineWidth = sw.lineWidth * sw.alpha;
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Explosion Sparks & Stars
    for (let i = particles.length - 1; i >= 0; i--) {
      const pt = particles[i];
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.vy += pt.gravity * dt;
      pt.rot += pt.vRot * dt;
      pt.alpha -= pt.decay * dt;
      if (pt.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, pt.alpha);
      if (pt.isStar) {
        renderStar(pt.x, pt.y, 5, pt.r * 1.6, pt.r * 0.7, pt.color, pt.rot);
      } else {
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Floating Damage / Faith Numbers
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      ft.y += ft.vy * dt;
      ft.vy *= 0.94;
      ft.life -= dt;
      if (ft.life <= 0) {
        floatingTexts.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.min(1, ft.life * 2);
      ctx.font = `900 ${Math.round(18 * ft.scale)}px "Luckiest Guy", Poppins, cursive`;
      ctx.fillStyle = ft.color;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 8;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }

  function gameLoop(now) {
    const rawDt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    if (gameActive) {
      const dt = rawDt * timeScale;
      clock += dt;

      // Smooth Bullet-Time Camera Zoom Interpolation
      camera.zoom += (camera.targetZoom - camera.zoom) * Math.min(1, rawDt * 8);

      ctx.clearRect(0, 0, W, H);
      ctx.save();
      if (Math.abs(camera.zoom - 1) > 0.002) {
        ctx.translate(W * 0.5 - camera.focusX, H * 0.5 - camera.focusY);
        ctx.scale(camera.zoom, camera.zoom);
        ctx.translate(-W * 0.5, -H * 0.5);
      }

      drawEnvironment(dt);
      updateAndDrawFaithOrbs(dt);
      updateAndDrawBoss(dt);
      updateAndDrawProjectiles(dt);
      updateAndDrawSlingshot(dt);
      updateAndDrawFX(dt);

      ctx.restore();
    }

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
});
