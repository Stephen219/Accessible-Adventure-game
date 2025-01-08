import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsProvider, useSettings } from './context/SettingsContext';

const TestComponent = () => {
    const { settings, setSpeechVolume, setSettings } = useSettings();

    return (
        <div>
            <span data-testid="volume">{settings.volume}</span>
            <span data-testid="voice">{settings.voice}</span>
            <span data-testid="language">{settings.language}</span>
            <button onClick={() => setSpeechVolume(50)}>Set Volume to 50</button>
            <button onClick={() => setSettings({ voice: 'newVoice' })}>Change Voice</button>
            <button onClick={() => setSettings({ language: 'fr' })}>Change Language</button>
        </div>
    );
};

describe('SettingsContext', () => {
    test('should initialize with default values', () => {
        render(
            <SettingsProvider>
                <TestComponent />
            </SettingsProvider>
        );

        expect(screen.getByTestId('volume').textContent).toBe('1'); //
        expect(screen.getByTestId('voice').textContent).toBe('default');
        expect(screen.getByTestId('language').textContent).toBe('en');
    });

    test('should update volume when setSpeechVolume is called', () => {
        render(
            <SettingsProvider>
                <TestComponent />
            </SettingsProvider>
        );

        fireEvent.click(screen.getByText('Set Volume to 50'));

        expect(screen.getByTestId('volume').textContent).toBe('0.5'); // 50% volume
    });

    test('should update voice when setSettings is called', () => {
        render(
            <SettingsProvider>
                <TestComponent />
            </SettingsProvider>
        );

        fireEvent.click(screen.getByText('Change Voice'));

        expect(screen.getByTestId('voice').textContent).toBe('newVoice');
    });

    test('should update language when setSettings is called', () => {
        render(
            <SettingsProvider>
                <TestComponent />
            </SettingsProvider>
        );

        fireEvent.click(screen.getByText('Change Language'));

        expect(screen.getByTestId('language').textContent).toBe('fr');
    });
});
