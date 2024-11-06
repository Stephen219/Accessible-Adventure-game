# group5

## Overview
This project is built using [Next.js](https://nextjs.org/) and leverages [Firebase](https://firebase.google.com/) for database management and user authentication. 



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

Visit `http://localhost:3000` in your browser to view the application. The server will reload automatically when code changes are made.

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

- **Main Source Folder**: The source code resides in the `src` directory. use this directory for all your code edits.
- **App Directory**: For any page edits, modify files in `src/app`. use this directory for all your page edits.
- **Components**: Add new components in the `src/components` folder to keep the codebase organized.

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
