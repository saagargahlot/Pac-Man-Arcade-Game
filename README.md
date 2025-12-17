# 🎮 PAC-MAN | React Edition

A modern reimagining of the classic PAC-MAN arcade game built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Classic Gameplay**: Navigate through mazes, collect dots, and avoid ghosts
- **Progressive Difficulty**: Multiple levels with increasing challenge
- **Smooth Animations**: Buttery-smooth 60fps gameplay
- **Responsive Design**: Works on desktop and mobile devices
- **Touch Controls**: Mobile-friendly on-screen controls
- **High Score Tracking**: Compete against your best scores
- **Modern UI**: Beautiful interface with animated backgrounds
- **TypeScript**: Fully typed for better code quality and IDE support

## 🎯 How to Play

- **Move**: Arrow keys or WASD
- **Pause**: Press `P` or `ESC`
- **Mobile**: Use on-screen directional buttons

### Objective
- Collect all dots to complete the level
- Avoid the ghosts - they'll chase you down!
- Score points to beat your high score

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
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
