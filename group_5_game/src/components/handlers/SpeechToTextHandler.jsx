'use client';

class SpeechToTextHandler {
  constructor() {
    this.isListening = false;

    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.recognition.lang = 'en-US';
      }
    }
  }

  startListening(onResult, setIsListening) {
    if (!this.recognition) {
      console.error('SpeechRecognition is not supported in this browser.');
      return;
    }

    if (this.isListening) {
      console.warn('Speech recognition is already running.');
      return;
    }

    setIsListening(true);
    this.isListening = true;

    this.recognition.onresult = (event) => {
      const current = event.results[event.results.length - 1];
      if (current.isFinal) {
        const text = current[0]?.transcript || '';
        console.log('Final transcript:', text);
        onResult(text);
      }
    };

    this.recognition.onerror = (error) => {
      console.error('Speech Recognition Error:', error);
      setIsListening(false);
      this.isListening = false;
    };

    this.recognition.onend = () => {
      console.log('Speech recognition ended.');
      setIsListening(false);
      this.isListening = false;
    };

    try {
      this.recognition.start();
      console.log('Speech recognition started.');
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setIsListening(false);
      this.isListening = false;
    }
  }

  stopListening(setIsListening) {
    if (!this.recognition) {
      console.error('SpeechRecognition is not supported in this browser.');
      return;
    }

    try {
      this.recognition.stop();
      setIsListening(false);
      this.isListening = false;
      console.log('Speech recognition stopped.');
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
    }
  }
}

export const speechToTextHandler = new SpeechToTextHandler();
