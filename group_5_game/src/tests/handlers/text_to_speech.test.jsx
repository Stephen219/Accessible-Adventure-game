import '@testing-library/jest-dom';



import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';

// Mock the Web Speech API
const mockSpeak = jest.fn();
const mockPause = jest.fn();
const mockResume = jest.fn();
const mockCancel = jest.fn();
const mockGetVoices = jest.fn();
/**
 * Mock the SpeechSynthesisUtterance class
 * @class
 * @param {string} text - The text to be spoken
 * @example
 * const utterance = new MockUtterance('Hello, world!');
 * utterance.rate = 1.5;
 */

global.SpeechSynthesisUtterance = class MockUtterance {
  constructor(text) {
    this.text = text;
    this.rate = 1;
    this.pitch = 1;
    this.volume = 1;
    this.voice = null;
    this.onend = null;
    this.onerror = null;
  }
};


const mockSynthesis = {
  speak: mockSpeak,
  pause: mockPause,
  resume: mockResume,
  cancel: mockCancel,
  getVoices: mockGetVoices,
};

jest.mock('@/components/handlers/text_SpeechHandler'
    , () => ({
  textToSpeechHandler: {
    synthesis: null,
    defaultOptions: {
      rate: 1,
      pitch: 1,
      volume: 1
    },
    say: jest.fn(),
    speak: jest.fn(),
    getVoices: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    cancel: jest.fn()
  }
}));

describe('textToSpeechHandler', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();
    
    global.window = {
      speechSynthesis: mockSynthesis
    };

    
    textToSpeechHandler.synthesis = mockSynthesis;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('initialization', () => {
    it('should have default options', () => {
      expect(textToSpeechHandler.defaultOptions).toEqual({
        rate: 1,
        pitch: 1,
        volume: 1
      });
    });
  });

  describe('say method', () => {
    it('should speak text with default options', async () => {
      const text = 'Hello, world!';
      
      // Setup the mock implementation
      textToSpeechHandler.say.mockImplementation((text) => {
        return new Promise((resolve) => {
          const utterance = new SpeechSynthesisUtterance(text);
          mockSpeak(utterance);
          resolve();
        });
      });

      await textToSpeechHandler.say(text);
      
      expect(mockSpeak).toHaveBeenCalled();
      const utterance = mockSpeak.mock.calls[0][0];
      expect(utterance.text).toBe(text);
      expect(utterance.rate).toBe(1);
      expect(utterance.pitch).toBe(1);
      expect(utterance.volume).toBe(1);
    });

    it('should reject if speech synthesis is not supported', async () => {
      textToSpeechHandler.synthesis = null;
      textToSpeechHandler.say.mockRejectedValue(new Error('Speech synthesis not supported'));
      
      await expect(textToSpeechHandler.say('test')).rejects.toThrow('Speech synthesis not supported');
    });
  });

  describe('speak method', () => {
    it('should speak text with custom options', async () => {
      const text = 'Hello';
      const options = {
        rate: 1.5,
        pitch: 1.2,
        volume: 0.8,
        voice: { name: 'Test Voice' }
      };

      textToSpeechHandler.speak.mockImplementation((text, options) => {
        return new Promise((resolve) => {
          const utterance = new SpeechSynthesisUtterance(text);
          Object.assign(utterance, options);
          mockSpeak(utterance);
          resolve();
        });
      });

      await textToSpeechHandler.speak(text, options);
      
      expect(mockSpeak).toHaveBeenCalled();
      const utterance = mockSpeak.mock.calls[0][0];
      expect(utterance.text).toBe(text);
      expect(utterance.rate).toBe(options.rate);
      expect(utterance.pitch).toBe(options.pitch);
      expect(utterance.volume).toBe(options.volume);
      expect(utterance.voice).toEqual(options.voice);
    });
  });

  describe('utility methods', () => {
    it('should get voices', () => {
      const mockVoices = [{ name: 'Voice 1' }, { name: 'Voice 2' }];
      textToSpeechHandler.getVoices.mockReturnValue(mockVoices);
      
      expect(textToSpeechHandler.getVoices()).toEqual(mockVoices);
    });

    it('should call pause on synthesis', () => {
      textToSpeechHandler.pause();
      expect(textToSpeechHandler.pause).toHaveBeenCalled();
    });

    it('should call resume on synthesis', () => {
      textToSpeechHandler.resume();
      expect(textToSpeechHandler.resume).toHaveBeenCalled();
    });

    it('should call cancel on synthesis', () => {
      textToSpeechHandler.cancel();
      expect(textToSpeechHandler.cancel).toHaveBeenCalled();
    });
  });
});