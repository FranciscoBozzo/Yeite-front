const { useState, useEffect } = require("react");

class Metronome {
  pitch;
  bpm;
  metronome = null;
  buffer = null;
  source = null;
  audioContext = null;
  isPlaying = false;

  constructor(bpm = 80, pitch = 3000) {
    this.bpm = bpm;
    this.pitch = pitch;
    this.audioContext = new AudioContext();
    this.init();
  }

  init() {
    const audioContext = this.audioContext;
    //BUFFER//
    const buffer = audioContext.createBuffer(
      1,
      audioContext.sampleRate * 2,
      audioContext.sampleRate
    );

    const channelData = buffer.getChannelData(0);
    let phase = 0;
    let gain = 1;
    const f = this.pitch;
    const duration_frames = audioContext.sampleRate / 50;

    for (let i = 0; i < duration_frames; i++) {
      channelData[i] = Math.sin(phase) * gain;
      phase += (2 * Math.PI * f) / audioContext.sampleRate;
      if (phase > 2 * Math.PI) {
        phase -= 2 * Math.PI;
      }
      gain -= 1 / duration_frames;
    }
    this.buffer = buffer;
  }

  play() {
    if (this.source) {
      this.source.buffer = null;
    }
    this.isPlaying = true;
    const audioContext = this.audioContext;
    const source = audioContext.createBufferSource();
    source.buffer = this.buffer;
    source.loop = true;
    source.loopEnd = 1 / (this.bpm / 60);
    this.source = source;

    // const lowFilter = audioContext.createBiquadFilter()
    // lowFilter.type = "lowpass"
    // lowFilter.gain.value = 1
    // lowFilter.frequency.value = 120

    //source.connect(lowFilter)
    source.connect(audioContext.destination);
    source.start(0);
  }

  pause() {
    if (this.source) this.source.stop();
    this.isPlaying = false;
  }

  setBPM(bpm) {
    this.bpm = bpm;
    if (this.isPlaying) {
      this.play();
    }
  }
}

const useMetronome = (bpm, pitch) => {
  const [metronome, setMetronome] = useState(null);

  useEffect(() => {
    const mn = new Metronome(bpm, pitch);
    setMetronome(mn);

    return () => {
      // Clean up resources, e.g., stop the metronome sound.
      if (mn.isPlaying) {
        mn.pause();
      }
    };
  }, [bpm, pitch]);

  return metronome;
};

export { Metronome, useMetronome };
