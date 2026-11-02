/**
 * LITHOS - Prehistoric Stone Atlas
 * Procedural Web Audio API Sound Generator (Zero External Assets Required)
 * Simulates flint knapping percussion strikes and subtle ambient resonance
 * Concept & Design by K.S.Chandra 2026
 */

class LithosAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Default muted for respectful user experience
    this.ambientGain = null;
    this.ambientOsc = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    const btn = document.getElementById("audio-toggle-btn");
    if (btn) {
      btn.innerText = this.isMuted ? "🔇 Audio Off" : "🔊 Audio On";
      btn.classList.toggle("audio-on", !this.isMuted);
    }
    if (!this.isMuted) {
      this.playKnapSound(880, 0.2); // Welcome click
    }
    return !this.isMuted;
  }

  playKnapSound(freq = 1200, duration = 0.08) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Sharp bandpass to simulate high-frequency mineral crack
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq, t);
      filter.Q.setValueAtTime(8, t);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, t + duration);

      // Fast percussive envelope: instantaneous attack, exponential decay
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + duration);
    } catch (e) {
      // Audio context error handling
    }
  }

  playSubtleChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + idx * 0.06);

        gain.gain.setValueAtTime(0.001, t + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, t + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.06 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.6);
      });
    } catch (e) {}
  }
}

window.LithosAudioEngine = LithosAudioEngine;
window.lithosAudio = new LithosAudioEngine();
