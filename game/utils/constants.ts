import { Direction, Position } from '../types';

export const TILE_SIZE = 24; // Base tile size in pixels
export const GAME_SPEED = 130; // Milliseconds per tick (lower is faster)

export const DIRECTIONS: Record<Direction, Position> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  NONE: { x: 0, y: 0 },
};

export const OPPOSITE_DIRECTION: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
  NONE: 'NONE',
};

export const GHOST_COLORS = {
  RED: '#FF0000',
  PINK: '#FFB8FF',
  CYAN: '#00FFFF',
  ORANGE: '#FFB852',
};

// 0: Empty, 1: Wall, 2: Dot, 3: Power Pellet, 4: Gate, 5: Apple
export const WALL = 1;
export const DOT = 2;
export const PELLET = 3;
export const GATE = 4;
export const APPLE = 5;
export const EMPTY = 0;
