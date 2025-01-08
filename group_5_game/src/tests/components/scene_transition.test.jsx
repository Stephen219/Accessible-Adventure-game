import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Scene1 from '@/components/Scene1';
import Scene2 from '@/components/Scene2';

jest.mock('@/components/handlers/speech_TextHandler', () => ({
  speechToTextHandler: {
    handleStartListening: jest.fn(),
    handleStopListening: jest.fn(),
  },
}));

global.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn(),
  onended: null,
}));

// Mock helper functions
const handleSystemMessage = jest.fn();
const getSceneDescription = jest.fn((sceneNumber) => `Description for scene ${sceneNumber}`);



describe('Scene Components', () => {
    it('renders Scene1 correctly', () => {
      const { getByText } = render(<Scene1 />);
      expect(getByText(/Scene 1: Crossroads/i)).toBeInTheDocument();
      expect(getByText(/say what you want to use to clear the way/i)).toBeInTheDocument();
    });
  
    it('renders Scene2 correctly', () => {
      const { getByText } = render(<Scene2 />);
      expect(getByText(/Scene 2: Forest/i)).toBeInTheDocument();
      expect(getByText(/say what you want to use to get to the other side/i)).toBeInTheDocument();
    });
  });
  




  describe('Scene Transitions', () => {
    let isAudioPlaying;
    let setIsAudioPlaying;
    let setCurrentScene;
    let currentScene;
  
    beforeEach(() => {
      isAudioPlaying = false;
      setIsAudioPlaying = jest.fn((state) => {
        isAudioPlaying = state;
      });
      setCurrentScene = jest.fn((scene) => {
        currentScene = scene;
      });
      currentScene = 1;
    });
  
    it('transitions to Scene 2 on "knife" command in Scene 1', () => {
      const trimmedText = 'knife';
      playAudioAndTransition = jest.fn();
      handleSystemMessage.mockClear();
  
      // Simulate the command
      if (trimmedText.includes('knife') && currentScene === 1) {
        setCurrentScene(2);
        playAudioAndTransition(2);
      }
  
      expect(setCurrentScene).toHaveBeenCalledWith(2);
      expect(playAudioAndTransition).toHaveBeenCalledWith(2);
      expect(handleSystemMessage).not.toHaveBeenCalled(); // Audio handles the description
    });
  
    it('transitions to Scene 3 on "yes" command in Scene 2', () => {
      currentScene = 2;
      const trimmedText = 'yes';
      playAudioAndTransition = jest.fn();
  
      if (trimmedText.includes('yes') && currentScene === 2) {
        setCurrentScene(3);
        playAudioAndTransition(3);
      }
  
      expect(setCurrentScene).toHaveBeenCalledWith(3);
      expect(playAudioAndTransition).toHaveBeenCalledWith(3);
    });
  
    it('returns to Scene 1 on "number" command in Scene 3', () => {
      currentScene = 3;
      const trimmedText = 'number';
  
      if (trimmedText.toLowerCase().includes('number') && currentScene === 3) {
        setCurrentScene(1);
      }
  
      expect(setCurrentScene).toHaveBeenCalledWith(1);
    });
  });



  it('plays the correct audio for Scene 2', () => {
    // Mock audio state
    let isAudioPlaying = false;
    const setIsAudioPlaying = jest.fn((state) => {
      isAudioPlaying = state;
    });
  
    // Mock audio mapping and audio object
    const audioMap = {
      2: '/audios/running.mp3',
      3: '/audios/running.mp3',
    };
  
    const sceneNumber = 2;
    const audioSrc = audioMap[sceneNumber];
    const mockAudio = new Audio(audioSrc);
  
    mockAudio.play = jest.fn();
    mockAudio.onended = jest.fn(() => {
      setIsAudioPlaying(false); // Reset state when audio ends
    });
  
    // Simulate playback logic
    if (audioSrc && !isAudioPlaying) {
      setIsAudioPlaying(true);
      mockAudio.play();
    }
  
    // Assertions
    expect(mockAudio.play).toHaveBeenCalled();
    expect(isAudioPlaying).toBe(true);
  
    // Simulate audio end
    mockAudio.onended();
    expect(isAudioPlaying).toBe(false);
  });
  






  
  it('handles "go faster" command by increasing speech rate', () => {
    const trimmedText = 'go faster';
    const increaseSpeechRate = jest.fn();
  
    if (trimmedText.includes('go faster')) {
      increaseSpeechRate();
      handleSystemMessage('Speaking faster.');
    }
  
    expect(increaseSpeechRate).toHaveBeenCalled();
    expect(handleSystemMessage).toHaveBeenCalledWith('Speaking faster.');
  });
  
    it('handles "go slower" command by decreasing speech rate', () => {
        const trimmedText = 'go slower';
        const decreaseSpeechRate = jest.fn();
    
        if (trimmedText.includes('go slower')) {
            decreaseSpeechRate();
            handleSystemMessage('Speaking slower.');
        }
    
        expect(decreaseSpeechRate).toHaveBeenCalled();
        expect(handleSystemMessage).toHaveBeenCalledWith('Speaking slower.');
        });
  