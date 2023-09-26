class Metronome {
  pitch;
  bpm;
  metronome = null;
  buffer = null;
  source = null;
  audioContext = null;

  constructor(bpm, pitch) {
    this.bpm = bpm || 60;
    this.pitch = pitch || 350;
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
    const audioContext = this.audioContext;
    const source = audioContext.createBufferSource();
    source.buffer = this.buffer;
    source.loop = true;
    source.loopEnd = 1 / (this.bpm / 60);
    this.source = source;

    source.connect(audioContext.destination);
    source.start(0);
  }

  pause() {
    this.source.stop();
  }

  setBPM(bpm) {
    this.bpm = bpm;
    this.source.loopEnd = 1 / (this.bpm / 60);
  }
}

module.exports = new Metronome();
