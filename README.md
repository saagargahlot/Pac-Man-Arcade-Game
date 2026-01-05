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

The game will be available at `http://localhost:5173/`

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **React Router** - Navigation

## 📁 Project Structure

```
pac-man/
├── game/
│   ├── components/     # Game UI components
│   ├── hooks/          # Game logic hooks
│   ├── types/          # TypeScript types
│   └── utils/          # Game constants and levels
├── pages/              # Menu, high scores, options
├── index.html          # Entry HTML
├── main.tsx            # React entry point
└── App.tsx             # Main app component
```

## 🎨 Features Breakdown

### Game Engine
- Custom game loop with `useGameLoop` hook
- Collision detection system
- Ghost AI with pathfinding
- Progressive difficulty scaling

### UI/UX
- Animated background decorations
- Pause/resume functionality
- Game over and level complete screens
- Responsive heads-up display (HUD)

## 🎮 Game Mechanics

- **Ghost Speed**: Consistent across all levels for smooth gameplay
- **Lives System**: Start with 2 lives
- **Scoring**:
  - Dot: 10 points
  - Power Pellet: 50 points
  - Ghost (powered-up): 200 points

## 📝 License

This is a personal project created for educational purposes.

## 🙏 Acknowledgments

Inspired by the classic PAC-MAN arcade game by Namco.

---

**Made with ❤️ by Saagar Gahlot**
