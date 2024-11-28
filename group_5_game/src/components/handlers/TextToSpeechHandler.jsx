'use client';

class TextToSpeechHandler {
  constructor() {
    this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.defaultOptions = {
      rate: 1,
      pitch: 1,
      volume: 1,
    };
  }

  speak(text, options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis is not supported in this browser.'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate || this.defaultOptions.rate;
      utterance.pitch = options.pitch || this.defaultOptions.pitch;
      utterance.volume = options.volume || this.defaultOptions.volume;
      if (options.voice) {
        utterance.voice = options.voice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      this.synthesis.speak(utterance);
    });
  }
}

export const textToSpeechHandler = new TextToSpeechHandler();
