import '@testing-library/jest-dom';

import { speechToTextHandler } from '@/components/handlers/speech_TextHandler';

/**
 * Mock the Web Speech API
 * @class
 * @param {string} text - The text to be spoken 
 * @example
 */

describe('SpeechToTextHandler', () => {
  // Mock recognition instance and event handlers
  let mockRecognition;
  let eventHandlers;

  // Set up mock recognition instance and event handlers before each test

  beforeEach(() => {
    // Store event handlers
    eventHandlers = {
      result: null,
      error: null,
      end: null
    };

    // Create a fresh mock recognition instance for each test
    mockRecognition = {
      start: jest.fn(),
      stop: jest.fn(),
      continuous: false,
      interimResults: false,
      maxAlternatives: 1,
      lang: '',
      // Define event handler setters
      set onresult(handler) {
        eventHandlers.result = handler;
      },
      set onerror(handler) {
        eventHandlers.error = handler;
      },
      set onend(handler) {
        eventHandlers.end = handler;
      }
    };

    // Mock the window object and SpeechRecognition constructor
    const mockWindow = {
      SpeechRecognition: jest.fn().mockImplementation(() => mockRecognition),
      webkitSpeechRecognition: jest.fn().mockImplementation(() => mockRecognition)
    };

    // Set up the global window object
    global.window = mockWindow;
    
    // Manually set up the recognition instance
    speechToTextHandler.recognition = mockRecognition;
    speechToTextHandler.isListening = false;
  });

  afterEach(() => {
    jest.clearAllMocks();
    speechToTextHandler.isListening = false;
  });

  describe('handleStartListening', () => {
    it('should start listening and update state', async () => {
      const onResult = jest.fn();
      const setIsListening = jest.fn();

      await speechToTextHandler.handleStartListening({
        onResult,
        setIsListening
      });

      expect(mockRecognition.start).toHaveBeenCalled();
      expect(setIsListening).toHaveBeenCalledWith(true);
    });


  });

  // Test the onresult event handler

  describe('handleStopListening', () => {
    it('should stop listening and update state', async () => {
      const setIsListening = jest.fn();
      speechToTextHandler.isListening = true;

      await speechToTextHandler.handleStopListening({
        setIsListening
      });

      expect(mockRecognition.stop).toHaveBeenCalled();
      expect(setIsListening).toHaveBeenCalledWith(false);
    });
  });

  /**
   * Test the onerror event handler
   * 
   */

  describe('initialization', () => {
    it('should initialize with correct default values', () => {
      expect(speechToTextHandler.isListening).toBeFalsy();
      expect(speechToTextHandler.recognition).toBeDefined();
      expect(mockRecognition.continuous).toBeFalsy();
      expect(mockRecognition.interimResults).toBeFalsy();
      expect(mockRecognition.maxAlternatives).toBe(1);
    });
  });
});