# Pac-Man Arcade Game

A classic Pac-Man arcade game built with React, TypeScript, and Vite. Navigate through mazes, collect dots, avoid ghosts, and rack up high scores in this faithful recreation of the timeless arcade classic.

## Features

- Classic Pac-Man gameplay mechanics
- Multiple game levels with increasing difficulty
- Ghost AI with authentic behavior patterns
- Score tracking and high score system
- Responsive game controls
- Modern UI with Tailwind CSS styling
- Game state management with React hooks
- Main menu, options, and high scores screens

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pac-man
```

2. Install dependencies:
```bash
npm install
```

### Running the Game

Start the development server:
```bash
npm run dev
```

The game will be available at `http://localhost:5173`

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```


## Game Controls

- **Arrow Keys** / **WASD** - Move Pac-Man
- **ESC** - Pause game / Return to menu

## Development

The game is structured using a component-based architecture:

- **Game Engine** (`useGameEngine.ts:*`) - Handles game state, collision detection, and score calculation
- **Game Loop** (`useGameLoop.ts:*`) - Manages frame timing and updates
- **Board Component** (`Board.tsx:*`) - Renders the game maze and entities
- **Entity System** (`Entity.tsx:*`) - Manages Pac-Man and ghost rendering
- **Level System** (`levels.ts:*`) - Defines maze layouts and difficulty progression

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT License - feel free to use this project for learning and entertainment.
