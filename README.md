# group5

## Overview
This project is built using [Next.js](https://nextjs.org/) and leverages [Firebase](https://firebase.google.com/) for database management and user authentication. 


The **Adventure Game** is an immersive journey where players step into the shoes of a character named **John**, who is stuck in a mysterious forest. As he navigates through the dense woods, John encounters various challenges that require him to solve puzzles using different items he finds along the way. The items John discovers are of two types: **reusable items**, such as a knife, which can be used multiple times, and **non-reusable items**, such as a stick, which are consumed upon use. Players can carry a maximum of six items in their inventory at any given time. If they pick up more items, they must choose which ones to drop.

Throughout the game, the player is tasked with solving challenges by selecting and using the appropriate items from their inventory. If the player finds themselves lacking the right tools to solve a particular challenge, they can spend coins earned from previous challenges to buy new items that might help. For each challenge solved correctly, the player earns coins, which contribute to their overall score. 

As the player progresses through the forest, they face a series of increasingly difficult challenges, with the ultimate goal of completing all the obstacles and making it to the end of the journey. The backend of the game keeps track of the player's progress, including their current inventory, challenge status, and accumulated coins. Meanwhile, the frontend provides an engaging experience through interactive images, voice prompts, and sound effects, making the adventure feel more dynamic.

Later in the game, players can view detailed statistics, including their best scores, inventory status, and performance in solving challenges. This adds a layer of replayability, as players can aim to improve their scores, refine their inventory management, and tackle the challenges in different ways.





   ## **to be removed**


to use text to speech we are using the following library
```js
import { textToSpeechHandler } from './handlers/text_SpeechHandler';
// and then use the following code to speak:
textToSpeechHandler.say('Hello, world!') // to speak the text with default settings
textToSpeechHandler.speak('Hello', { rate: 1.5, pitch: 1.2 }) // to speak the text with custom settings
```




to use the speech to text we are using the following library
```js
mport { speechToTextHandler } from './handlers/speech_TextHandler';
// and to use the speech to text function
import { speechToTextHandler } from './sTextHandler';
// and then use the following code to start listening:
speechToTextHandler.handleStartListening(setTranscript, setIsListening);

```




## Features
1. User can start the game by saying “start”.
2. User can pause the game by saying “pause”.
3. User can resume the game after pausing by saying “resume”.
4. User can stop the game by saying “stop”.
5. User can restart the game by saying “restart”.
6. User can choose to play as a guest or logged-in user.
7. User’s progress is saved if logged in, but not if playing as a guest.
8. User can collect items during the game, which will be stored in their inventory.
9. User can use items from their inventory to solve challenges.
10. User’s inventory is limited to 6 items at any time.
11. User can drop items to make space for new ones when the inventory is full.
12. User earns coins for solving challenges correctly.
13. User can purchase items using coins if they do not have the necessary items in their inventory.
14. User can view their current coin balance on the UI.
15. User can use voice commands such as “repeat” to replay the last audio or “go faster” to speed up the audio.
16. User can view the current challenge description and instructions on the UI.
17. User can view their inventory on the UI at any time during gameplay.
18. Game saves progress for logged-in players, including their inventory, coin balance, and challenge progression.
19. Guest players’ progress is not saved after the session ends.
20. User can receive feedback after each challenge, informing them if they answered correctly or incorrectly.
21. User can advance to the next challenge upon successfully solving the current one.
22. Game provides walking sound effects to simulate movement between challenges.
23. User can adjust audio speed using the “go slower” and “go faster” commands.
24. User can replay the last audio using the “repeat” command.
25. Game tracks statistics such as total time spent playing and commands used, available for the client to view.
26. Game handles errors such as invalid input or network failures with appropriate feedback.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- Package manager: npm, yarn, pnpm, or bun

### Installation
Clone the repository and install dependencies:

```bash
git clone https://git.cardiff.ac.uk/c22067364/group5.git
cd <group_5_game>
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server
To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit `http://localhost:3000` in your browser to view the application. The server will reload automatically when code changes are made. ensure port 3000 is not in use by another application
  
### Building 


```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```




## Project Structure and Editing

To edit or add features:

edit while in the development branch

```bash
git checkout development
```

- **Main Source Folder**: The source code resides in the `src` directory. use this directory for all your code edits.
- **App Directory**: For any page edits, modify files in `src/app`. use this directory for all your page edits.
- **Components**: Add new components in the `src/components` folder to keep the codebase organized.
- **Styling**: Use Tailwind CSS for styling. The `styles` folder contains global styles and utility classes.
- **Firebase Configuration**: The Firebase configuration is in `utils/firebaseConfig.js`. No need to modify this file unless you are changing the Firebase setup.

### Adding New Pages
To add a new page, create a new file in the `app` directory with the format `[pagename].jsx`. You can also create a folder with the same name as the page and add the page file inside it.
note : we are using next js 15 where no need to import react in the page file but somehow its forcing us to import react in the page file so please import react in the page file like this 

```jsx
import React from 'react'
```

### Testing with Jest
This project uses Jest for testing. it is already configured in the project.
You can create test files following these guidelines:

1. **Localized Tests**: Alternatively, add test files directly within your page or component’s folder in the `app` directory, using the same `[pagename].test.jsx` format. 
2. **Centralized Tests**: Create a `test` folder in the `src` directory and add test files with the format `[pagename].test.jsx`.

To run tests, use the following command:

```bash
npm run test
# or
yarn test
# or
pnpm test
```



For more information, see the [Jest Documentation](https://jestjs.io/docs/getting-started).

### Linting with ESLint
This project uses ESLint for linting. it is already configured in the project.
You can run ESLint with the following command:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```




## Firebase Configuration

This project uses a shared Firebase database, with credentials provided in the codebase to ensure all team members have access to the same setup. no need to tamper with the firebase configuration which is in /utils/firebaseConfig.js



## Development Workflow

- **Branching Strategy**: All development should occur on the `development` branch, not `main`.
- **Creating a New Branch**: Branch off from `development` for new features or bug fixes.
- **Merging**: Once the code is reviewed and approved, it can be merged back into `development`. `main` remains stable for production releases only.



## Important Assumptions

- The project assumes all team members will use the same Firebase database configuration, so no additional setup is required for database connections.


## Requirements

## Libraries and Frameworks

- **Next.js** - [Documentation](https://nextjs.org/docs): Server-side rendering and modern frontend framework.
- **Firebase** - [Documentation](https://firebase.google.com/docs): Database and authentication management.
- **Jest** - [Documentation](https://jestjs.io/docs/getting-started): Testing framework for unit and integration tests.
- **ESLint** - [Documentation](https://eslint.org/docs/user-guide/getting-started): Linting tool for code quality and consistency.

- **Tailwind CSS** - [Documentation](https://tailwindcss.com/docs): Utility-first CSS framework for styling.

---

## Learning Resources and Onboarding

To help new developers onboard quickly, here are some recommended learning resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
