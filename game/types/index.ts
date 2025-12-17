export type Position = {
  x: number;
  y: number;
};

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'NONE';

export type TileType = 0 | 1 | 2 | 3 | 4 | 5; // 0: Empty, 1: Wall, 2: Dot, 3: Power Pellet, 4: Gate, 5: Apple

export type GhostType = 'RED' | 'PINK' | 'CYAN' | 'ORANGE';

export interface Entity {
  position: Position;
  direction: Direction;
  nextDirection: Direction;
  speed: number;
}

export interface Ghost extends Entity {
  type: GhostType;
  mode: 'CHASE' | 'SCATTER' | 'FRIGHTENED' | 'EATEN';
  color: string;
}

export interface Player extends Entity {
  lives: number;
  score: number;
  poweredUp: boolean;
}

export type GameStatus = 'MENU' | 'PLAYING' | 'PAUSED' | 'GAME_OVER' | 'LEVEL_COMPLETE' | 'VICTORY';

export interface LevelData {
  grid: TileType[][];
  ghosts: { type: GhostType; startPos: Position }[];
  playerStart: Position;
}
