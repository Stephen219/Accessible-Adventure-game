const voiceCommands = [
    { command: "Start Game", description: "Starts the game." },
    { command: "Go Faster", description: "Makes the text-to-speech speech faster." },
    { command: "Go Slower", description: "Makes the text-to-speech speech slower." },
    { command: "Where", description: "Tells you where you currently are in the game." },
    { command: "Go to", description: "Takes you to a specific scene in the game." },
    { command: "Yes", description: "Confirms your action." },
    { command: "No", description: "Cancels the current action." },
];

test('should find "Start Game" command', () => {
    const command = voiceCommands.find(cmd => cmd.command === 'Start Game');
    expect(command).toBeDefined();
    expect(command.description).toBe('Starts the game.');
});

test('should find "Go Faster" command', () => {
    const command = voiceCommands.find(cmd => cmd.command === 'Go Faster');
    expect(command).toBeDefined();
    expect(command.description).toBe('Makes the text-to-speech speech faster.');
});

test('should find "Go Slower" command', () => {
    const command = voiceCommands.find(cmd => cmd.command === 'Go Slower');
    expect(command).toBeDefined();
    expect(command.description).toBe('Makes the text-to-speech speech slower.');
});

test('should find "Where" command', () => {
    const command = voiceCommands.find(cmd => cmd.command === 'Where');
    expect(command).toBeDefined();
    expect(command.description).toBe('Tells you where you currently are in the game.');
});

test('should find "Go to" command', () => {
    const command = voiceCommands.find(cmd => cmd.command === 'Go to');
    expect(command).toBeDefined();
    expect(command.description).toBe('Takes you to a specific scene in the game.');
});

test('should find "Yes" command', () => {
    const command = voiceCommands.find(cmd => cmd.command === 'Yes');
    expect(command).toBeDefined();
    expect(command.description).toBe('Confirms your action.');
});

test('should find "No" command', () => {
    const command = voiceCommands.find(cmd => cmd.command === 'No');
    expect(command).toBeDefined();
    expect(command.description).toBe('Cancels the current action.');
});
