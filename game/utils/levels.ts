import { LevelData, TileType, GhostType, Position } from '../types';
import { WALL, DOT, PELLET, GATE, APPLE, EMPTY } from './constants';

const LEVEL_1_MAP = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "WA........W........AW",
  "W.WW.WWWW.W.WWWW.WW.W",
  "W.WW.WWWW.W.WWWW.WW.W",
  "W...................W",
  "W.WW.W.WWWWWWW.W.WW.W",
  "W....W....W....W....W",
  "WWWW.WWWW.W.WWWW.WWWW",
  "   W.W.........W.W   ",
  "WWWW.W.WW-WW.W.WWWW",
  ".......W   W.......",
  "WWWW.W.WWWWW.W.WWWW",
  "   W.W.......W.W   ",
  "WWWW.W.WWWWW.W.WWWW",
  "W.........W.........W",
  "W.WW.WWWW.W.WWWW.WW.W",
  "W..W.............W..W",
  "WW.W.W.WWWWWWW.W.W.WW",
  "W....W....W....W....W",
  "W.WWWWWWW.W.WWWWWWW.W",
  "WA.................AW",
  "WWWWWWWWWWWWWWWWWWWWW",
];

const LEVEL_2_MAP = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "WA.................AW",
  "W.WW.WW.WWWWW.WW.WW.W",
  "W.WW.WW.WWWWW.WW.WW.W",
  "W...................W",
  "WWWW.WW.W.W.W.WW.WWWW",
  "   W.WW.W.W.W.WW.W   ",
  "WWWW.WW.W.W.W.WW.WWWW",
  ".......W...W.......",
  "WWWW.W.WW-WW.W.WWWW",
  "   W.W.......W.W   ",
  "WWWW.W.WWWWW.W.WWWW",
  "W.........W.........W",
  "W.WWWWWWW.W.WWWWWWW.W",
  "W.W.............W.W.W",
  "W.W.WW.WW.W.WW.WW.W.W",
  "W....W....W....W....W",
  "WWWW.W.WWWWWWW.W.WWWW",
  "WA.................AW",
  "WWWWWWWWWWWWWWWWWWWWW",
];

const LEVEL_3_MAP = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "WA.................AW",
  "W.WW.WWWW.W.WWWW.WW.W",
  "W.WW.WWWW.W.WWWW.WW.W",
  "W...................W",
  "W.WW.W.WWWWWWW.W.WW.W",
  "W....W....W....W....W",
  "WWWW.WWWW.W.WWWW.WWWW",
  "   W.W.........W.W   ",
  "WWWW.W.WW-WW.W.WWWW",
  ".......W   W.......",
  "WWWW.W.WWWWW.W.WWWW",
  "   W.W.......W.W   ",
  "WWWW.W.WWWWW.W.WWWW",
  "W.........W.........W",
  "W.WW.WWWW.W.WWWW.WW.W",
  "W..W.............W..W",
  "WW.W.W.WWWWWWW.W.W.WW",
  "W....W....W....W....W",
  "W.WWWWWWW.W.WWWWWWW.W",
  "WA.................AW",
  "WWWWWWWWWWWWWWWWWWWWW",
];

const parseMap = (map: string[]): LevelData => {
  const grid: TileType[][] = [];
  const ghosts: { type: GhostType; startPos: Position }[] = [];
  let playerStart: Position = { x: 1, y: 1 };

  map.forEach((row, _y) => {
    const gridRow: TileType[] = [];
    row.split('').forEach((char, _x) => {
      switch (char) {
        case 'W':
          gridRow.push(WALL);
          break;
        case '.':
          gridRow.push(DOT);
          break;
        case 'o':
          gridRow.push(PELLET);
          break;
        case '-':
          gridRow.push(GATE);
          break;
        case 'A':
          gridRow.push(APPLE);
          break;
        case ' ':
        default:
          gridRow.push(EMPTY);
          break;
      }
    });
    grid.push(gridRow);
  });

  // Hardcoded start positions for this specific map layout size (21x22)
  // Center is roughly 10,10
  playerStart = { x: 10, y: 16 };
  ghosts.push({ type: 'RED', startPos: { x: 10, y: 8 } });
  ghosts.push({ type: 'PINK', startPos: { x: 9, y: 10 } });
  ghosts.push({ type: 'CYAN', startPos: { x: 10, y: 10 } });
  ghosts.push({ type: 'ORANGE', startPos: { x: 11, y: 10 } });

  return { grid, ghosts, playerStart };
};

export const getLevel = (level: number): LevelData => {
  // Cycle through 3 maps
  const mapIndex = (level - 1) % 3;
  const map = mapIndex === 0 ? LEVEL_1_MAP : mapIndex === 1 ? LEVEL_2_MAP : LEVEL_3_MAP;
  return parseMap(map);
};
