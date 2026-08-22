// Sound engine for therapeutic acoustic resonance and nervous system down-regulation
// Synthesizes soothing Solfeggio frequencies (174Hz Pain/Grounding, 432Hz Miraculous Calm, 528Hz Transformation),
// gentle theta brainwave entrainment (5.5Hz binaural pulsation), organic pink noise warm ocean wash,
// and singing bowl / harmonic chime overtones.

export interface ResonantTonePreset {
  id: string;
  name: string;
  frequency: number; // Base carrier frequency in Hz
  binauralBeat: number; // Theta/Alpha binaural delta in Hz
  description: string;
  tag: string;
}

export const RESONANT_PRESETS: ResonantTonePreset[] = [
  {
    id: '174hz',
    name: '174 Hz Grounding Tone',
    frequency: 174,
    binauralBeat: 4.5, // Deep Theta (calm, somatic grounding)
    description: 'Solfeggio frequency for releasing somatic physical tension and deep nervous system safety.',
    tag: 'Somatic Release'
  },
  {
    id: '432hz',
    name: '432 Hz Harmonic Stillness',
    frequency: 432,
    binauralBeat: 6.0, // Theta meditative flow
    description: 'Verdi resonance tuned to natural harmonics for reducing autonomic heart rate variability and anxiety.',
    tag: 'Emotional Peace'
  },
  {
    id: '528hz',
    name: '528 Hz Clarity & Renewal',
    frequency: 528,
    binauralBeat: 7.83, // Schumann Resonance (Earth frequency)
    description: 'Transformation frequency promoting cellular clarity, mental de-cluttering, and neuro-plastic repair.',
    tag: 'Mental Clarity'
  }
];

class TherapeuticAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;
  private activePreset: ResonantTonePreset = RESONANT_PRESETS[0];

  // Oscillator and generator nodes
  private leftOsc: OscillatorNode | null = null;
  private rightOsc: OscillatorNode | null = null;
  private harmonicOsc1: OscillatorNode | null = null;
  private harmonicOsc2: OscillatorNode | null = null;
  private lfoNode: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public getActivePreset(): ResonantTonePreset {
    return this.activePreset;
  }

  public async start(preset: ResonantTonePreset = RESONANT_PRESETS[0]): Promise<void> {
    this.activePreset = preset;

    if (this.isRunning) {
      this.updateFrequencies(preset);
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // Master output gain with smooth exponential fade-in
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, now + 2.0); // Gentle, soothing volume ramp
      this.masterGain.connect(this.ctx.destination);

      // 1. Low-Pass Filter for organic warmth (removes digital harshness, creating a warm singing bowl vibe)
      const lowPassFilter = this.ctx.createBiquadFilter();
      lowPassFilter.type = 'lowpass';
      lowPassFilter.frequency.setValueAtTime(preset.frequency * 3.5, now);
      lowPassFilter.Q.setValueAtTime(1.8, now);
      lowPassFilter.connect(this.masterGain);

      // 2. Stereo Panner Nodes for Binaural 3D Spatial Entrainment
      const leftPanner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      const rightPanner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      
      if (leftPanner) leftPanner.pan.setValueAtTime(-0.85, now);
      if (rightPanner) rightPanner.pan.setValueAtTime(0.85, now);

      // Left Channel Oscillator (Base carrier)
      this.leftOsc = this.ctx.createOscillator();
      this.leftOsc.type = 'sine';
      this.leftOsc.frequency.setValueAtTime(preset.frequency, now);

      // Right Channel Oscillator (Base carrier + theta binaural difference)
      this.rightOsc = this.ctx.createOscillator();
      this.rightOsc.type = 'sine';
      this.rightOsc.frequency.setValueAtTime(preset.frequency + preset.binauralBeat, now);

      const baseGain = this.ctx.createGain();
      baseGain.gain.setValueAtTime(0.4, now);

      if (leftPanner && rightPanner) {
        this.leftOsc.connect(leftPanner);
        leftPanner.connect(baseGain);
        this.rightOsc.connect(rightPanner);
        rightPanner.connect(baseGain);
      } else {
        this.leftOsc.connect(baseGain);
        this.rightOsc.connect(baseGain);
      }
      baseGain.connect(lowPassFilter);

      // 3. Sub-harmonic Warmth & Tibetan Singing Bowl Overtones (Pure sine octave below + fifth above)
      this.harmonicOsc1 = this.ctx.createOscillator();
      this.harmonicOsc1.type = 'sine';
      this.harmonicOsc1.frequency.setValueAtTime(preset.frequency * 0.5, now); // Warm foundational bass sub-octave

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.18, now);
      this.harmonicOsc1.connect(subGain);
      subGain.connect(lowPassFilter);

      this.harmonicOsc2 = this.ctx.createOscillator();
      this.harmonicOsc2.type = 'sine';
      this.harmonicOsc2.frequency.setValueAtTime(preset.frequency * 1.5, now); // Harmonic perfect fifth overtone

      const harmonicGain = this.ctx.createGain();
      harmonicGain.gain.setValueAtTime(0.12, now);
      this.harmonicOsc2.connect(harmonicGain);
      harmonicGain.connect(lowPassFilter);

      // 4. Diaphragmatic Breath LFO Modulation (0.1 Hz = ~6 breaths per minute coherence pace)
      this.lfoNode = this.ctx.createOscillator();
      this.lfoNode.type = 'sine';
      this.lfoNode.frequency.setValueAtTime(0.08, now); // ~5.5-second respiratory sinus arrhythmia rhythm

      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(0.04, now);
      this.lfoNode.connect(this.lfoGain.gain);

      // 5. Ocean / Pink Noise Soft Wind Ambience for masking environmental distractions
      this.noiseNode = this.createPinkNoiseNode(this.ctx);
      if (this.noiseNode) {
        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(480, now);
        noiseFilter.Q.setValueAtTime(0.8, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.025, now);

        this.noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
      }

      // Start all sound generators
      this.leftOsc.start(now);
      this.rightOsc.start(now);
      this.harmonicOsc1.start(now);
      this.harmonicOsc2.start(now);
      this.lfoNode.start(now);

      this.isRunning = true;
    } catch (err) {
      console.error('Failed to initialize therapeutic audio engine:', err);
    }
  }

  public updateFrequencies(preset: ResonantTonePreset): void {
    this.activePreset = preset;
    if (!this.ctx || !this.isRunning) return;

    const now = this.ctx.currentTime;
    const rampTime = 1.2;

    if (this.leftOsc) {
      this.leftOsc.frequency.exponentialRampToValueAtTime(preset.frequency, now + rampTime);
    }
    if (this.rightOsc) {
      this.rightOsc.frequency.exponentialRampToValueAtTime(preset.frequency + preset.binauralBeat, now + rampTime);
    }
    if (this.harmonicOsc1) {
      this.harmonicOsc1.frequency.exponentialRampToValueAtTime(preset.frequency * 0.5, now + rampTime);
    }
    if (this.harmonicOsc2) {
      this.harmonicOsc2.frequency.exponentialRampToValueAtTime(preset.frequency * 1.5, now + rampTime);
    }
  }

  public stop(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.ctx || !this.masterGain || !this.isRunning) {
        this.isRunning = false;
        resolve();
        return;
      }

      try {
        const now = this.ctx.currentTime;
        // Smooth 1.5s exponential fade out to avoid clicks/pops
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

        setTimeout(() => {
          try {
            this.leftOsc?.stop();
            this.rightOsc?.stop();
            this.harmonicOsc1?.stop();
            this.harmonicOsc2?.stop();
            this.lfoNode?.stop();
            this.ctx?.close();
          } catch (e) {
            console.error('Error stopping nodes:', e);
          } finally {
            this.ctx = null;
            this.masterGain = null;
            this.isRunning = false;
            resolve();
          }
        }, 1550);
      } catch (err) {
        console.error('Error during audio engine stop:', err);
        this.isRunning = false;
        resolve();
      }
    });
  }

  // Pink noise generator (Paul Kellet's filtered white noise algorithm)
  private createPinkNoiseNode(ctx: AudioContext): AudioNode | null {
    try {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;
      noiseSource.start(0);
      return noiseSource;
    } catch {
      return null;
    }
  }
}

export const therapeuticSoundEngine = new TherapeuticAudioEngine();
