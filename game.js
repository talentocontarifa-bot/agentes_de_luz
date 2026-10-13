// ==========================================
// AGENTES DE LUZ - POV SLINGSHOT SHOOTER ENGINE
// Mobile-First & Tap-to-Shoot Enhanced
// ==========================================

class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playStretch() {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(320, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  playLaunch() {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch (e) {}
  }

  playHit() {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);

      setTimeout(() => {
        if (!this.ctx) return;
        const bell = this.ctx.createOscillator();
        const bellGain = this.ctx.createGain();
        bell.type = 'sine';
        bell.frequency.setValueAtTime(1046.5, this.ctx.currentTime); // C6
        bell.frequency.exponentialRampToValueAtTime(523.25, this.ctx.currentTime + 0.35);
        bellGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        bellGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
        bell.connect(bellGain);
        bellGain.connect(this.ctx.destination);
        bell.start();
        bell.stop(this.ctx.currentTime + 0.35);
      }, 40);
    } catch (e) {}
  }

  playVictoryTriumph() {
    if (this.muted) return;
    this.init();
    try {
      const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      chord.forEach((freq, i) => {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.0);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 2.0);
        }, i * 85);
      });
    } catch (e) {}
  }
}

const sfx = new SoundFX();

document.addEventListener('DOMContentLoaded', () => {
  const gameWrap = document.getElementById('pov-game-wrap');
  const povArena = document.querySelector('.pov-arena');
  const goliatBoss = document.getElementById('goliat-boss');
  const targetMark = document.getElementById('target-mark');
  const slingshotPov = document.getElementById('slingshot-pov');
  const flyingStone = document.getElementById('flying-stone');
  const lightFlash = document.getElementById('divine-light-flash');
  const skipBtn = document.getElementById('skip-game-btn');
  const quickShootBtn = document.getElementById('quick-shoot-btn');
  const soundToggle = document.getElementById('sound-toggle');
  const replayTrigger = document.getElementById('replay-game-trigger');

  if (!gameWrap || !goliatBoss) return;

  let isFlying = false;
  let isDefeated = false;
  let touchStartTime = 0;
  let touchStartY = 0;
  let isDraggingSlingshot = false;
  let pullAmount = 0;

  // Sound toggle
  if (soundToggle) {
    soundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sfx.muted = !sfx.muted;
      soundToggle.textContent = sfx.muted ? '🔇' : '🔊';
    });
  }

  // Update Crosshair & Slingshot Angle
  function updateAim(clientX, clientY) {
    if (isFlying || isDefeated) return;
    const rect = gameWrap.getBoundingClientRect();
    const x = Math.max(20, Math.min(rect.width - 20, clientX - rect.left));
    const y = Math.max(40, Math.min(rect.height - 120, clientY - rect.top));

    if (targetMark) {
      targetMark.style.left = `${x}px`;
      targetMark.style.top = `${y}px`;
    }

    if (slingshotPov) {
      const centerX = rect.width / 2;
      const tilt = ((x - centerX) / centerX) * 16;
      slingshotPov.style.transform = `translateX(-50%) rotate(${tilt}deg) translateY(${pullAmount}px)`;
    }
  }

  // Mouse hover updates aim
  window.addEventListener('mousemove', (e) => {
    updateAim(e.clientX, e.clientY);
  });

  // ========================================================
  // TAP & CLICK DIRECT FIRE LOGIC (Resolves usability contradiction!)
  // Whenever the user taps or clicks ANYWHERE in the arena or on Goliat:
  // It aims AND fires immediately!
  // ========================================================

  function handleDirectShoot(clientX, clientY) {
    if (isFlying || isDefeated) return;
    sfx.init();

    // 1. Move crosshair to touched point
    updateAim(clientX, clientY);

    // 2. Play tension audio & fast visual pull back
    sfx.playStretch();
    pullAmount = 40;
    if (slingshotPov) {
      slingshotPov.style.transform = 'translateX(-50%) translateY(40px) scale(0.96)';
    }

    // 3. Fire stone with slight realistic delay (90ms)
    setTimeout(() => {
      fireStone();
    }, 90);
  }

  // Tap on Arena / Goliat / Screen
  if (povArena) {
    povArena.addEventListener('click', (e) => {
      // Avoid firing if clicked on skip button
      if (e.target.closest('#skip-game-btn') || e.target.closest('#sound-toggle')) return;
      handleDirectShoot(e.clientX, e.clientY);
    });

    // Touch events on Mobile
    povArena.addEventListener('touchstart', (e) => {
      if (e.target.closest('#skip-game-btn') || e.target.closest('#sound-toggle') || e.target.closest('#quick-shoot-btn')) return;
      touchStartTime = performance.now();
      const touch = e.touches[0];
      touchStartY = touch.clientY;
      updateAim(touch.clientX, touch.clientY);

      // Check if touching slingshot directly
      if (e.target.closest('#slingshot-pov')) {
        isDraggingSlingshot = true;
        sfx.init();
        sfx.playStretch();
      }
    }, { passive: true });

    povArena.addEventListener('touchmove', (e) => {
      if (isFlying || isDefeated) return;
      const touch = e.touches[0];
      updateAim(touch.clientX, touch.clientY);

      if (isDraggingSlingshot) {
        const deltaY = touch.clientY - touchStartY;
        if (deltaY > 0) {
          pullAmount = Math.min(deltaY * 0.7, 75);
          if (slingshotPov) {
            slingshotPov.style.transform = `translateX(-50%) translateY(${pullAmount}px) scale(${1 - pullAmount * 0.002})`;
          }
        }
      }
    }, { passive: true });

    povArena.addEventListener('touchend', (e) => {
      if (e.target.closest('#skip-game-btn') || e.target.closest('#sound-toggle') || e.target.closest('#quick-shoot-btn')) return;
      const touchDuration = performance.now() - touchStartTime;

      if (isDraggingSlingshot) {
        isDraggingSlingshot = false;
        if (pullAmount > 15) {
          fireStone();
        } else {
          pullAmount = 0;
          if (slingshotPov) slingshotPov.style.transform = 'translateX(-50%) translateY(0)';
        }
      } else {
        // Quick Tap on Mobile Screen -> FIRE!
        const touch = e.changedTouches ? e.changedTouches[0] : null;
        if (touch && touchDuration < 450) {
          handleDirectShoot(touch.clientX, touch.clientY);
        }
      }
    });
  }

  // Quick Shoot Tap Button
  if (quickShootBtn) {
    quickShootBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = goliatBoss.getBoundingClientRect();
      handleDirectShoot(rect.left + rect.width / 2, rect.top + rect.height * 0.2);
    });
  }

  // ========================================================
  // FIRE STONE IN 3D DEPTH TOWARDS GOLIAT'S FOREHEAD
  // ========================================================
  function fireStone() {
    if (isFlying || isDefeated) return;
    isFlying = true;
    sfx.playLaunch();

    // Snap slingshot forward
    pullAmount = 0;
    if (slingshotPov) {
      slingshotPov.classList.add('slingshot-snap');
      setTimeout(() => {
        slingshotPov.classList.remove('slingshot-snap');
        slingshotPov.style.transform = 'translateX(-50%) translateY(0)';
      }, 250);
    }

    // Target Goliat's forehead (Center of the giant's face)
    const goliatRect = goliatBoss.getBoundingClientRect();
    const wrapRect = gameWrap.getBoundingClientRect();
    
    const targetX = (goliatRect.left + goliatRect.width * 0.5) - wrapRect.left;
    const targetY = (goliatRect.top + goliatRect.height * 0.18) - wrapRect.top;

    // Start position: between the elastic bands of the slingshot
    const startX = wrapRect.width * 0.5;
    const startY = wrapRect.height * 0.74;

    flyingStone.style.display = 'block';
    flyingStone.style.left = `${startX}px`;
    flyingStone.style.top = `${startY}px`;
    flyingStone.style.transform = 'translate(-50%, -50%) scale(1.8)';
    flyingStone.style.opacity = '1';

    const duration = 460; // Fast and snappy
    const startTime = performance.now();

    function animateFlight(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      // Ease out cubic
      const easeT = 1 - Math.pow(1 - t, 3);

      const currentX = startX + (targetX - startX) * easeT;
      const currentY = startY + (targetY - startY) * easeT;
      // Shrinks from 1.8 down to 0.45 as it flies deep into the screen
      const currentScale = 1.8 - (1.8 - 0.45) * easeT;

      flyingStone.style.left = `${currentX}px`;
      flyingStone.style.top = `${currentY}px`;
      flyingStone.style.transform = `translate(-50%, -50%) scale(${currentScale})`;

      if (t < 1) {
        requestAnimationFrame(animateFlight);
      } else {
        hitGoliat(targetX, targetY);
      }
    }

    requestAnimationFrame(animateFlight);
  }

  // ========================================================
  // HIT GOLIAT & CELESTIAL LIGHT BURST
  // ========================================================
  function hitGoliat(x, y) {
    isFlying = false;
    isDefeated = true;
    flyingStone.style.display = 'none';

    sfx.playHit();

    // Screen Shake
    gameWrap.classList.add('camera-shake');
    setTimeout(() => gameWrap.classList.remove('camera-shake'), 450);

    // Comic POW Burst
    const comicHit = document.getElementById('comic-pow');
    if (comicHit) {
      comicHit.style.left = `${x}px`;
      comicHit.style.top = `${y}px`;
      comicHit.classList.add('active');
    }

    // Goliat Falls
    goliatBoss.classList.add('goliat-ko');
    const bossBubble = document.getElementById('goliat-dialogue');
    if (bossBubble) {
      bossBubble.innerHTML = '¡¡AYYY NOOO!! 😵<br>¡CON DIOS NO PUEDO!';
      bossBubble.classList.add('defeated-bubble');
    }

    // Health Bar Zero
    const healthBar = document.getElementById('boss-hp-fill');
    if (healthBar) {
      healthBar.style.width = '0%';
    }

    // Trigger Divine Flashbang
    setTimeout(() => {
      triggerDivineFlash();
    }, 600);
  }

  // Divine Light Flashbang Transition
  function triggerDivineFlash() {
    sfx.playVictoryTriumph();
    lightFlash.classList.add('active');

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 140,
        spread: 150,
        origin: { y: 0.5 }
      });
    }

    setTimeout(() => {
      gameWrap.classList.add('fade-away');
      setTimeout(() => {
        lightFlash.classList.remove('active');
        gameWrap.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
    }, 1800);
  }

  // Skip Intro Handler
  function skipIntro() {
    sfx.init();
    gameWrap.classList.add('fade-away');
    setTimeout(() => {
      gameWrap.style.display = 'none';
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
      isDefeated = false;
      isFlying = false;
      goliatBoss.classList.remove('goliat-ko');
      const comicHit = document.getElementById('comic-pow');
      if (comicHit) comicHit.classList.remove('active');
      const bossBubble = document.getElementById('goliat-dialogue');
      if (bossBubble) {
        bossBubble.innerHTML = '¡NADIE PUEDE CONTRA MÍ! 🪓';
        bossBubble.classList.remove('defeated-bubble');
      }
      const healthBar = document.getElementById('boss-hp-fill');
      if (healthBar) healthBar.style.width = '100%';

      gameWrap.style.display = 'flex';
      gameWrap.classList.remove('fade-away');
      window.scrollTo({ top: 0 });
    });
  }
});
