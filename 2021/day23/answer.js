/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
import { drawGrid } from '../../util.js';

const LOG_TEST = true;
const LOG_REAL = true;

let noLogWarned = false;

export const part1 = (input, isTest) => {
  // eslint-disable-next-line no-unused-vars
  const log = (...args) => {
    if ((LOG_TEST && isTest) || (LOG_REAL && !isTest)) {
      console.log(...args);
    } else if (!noLogWarned) {
      console.log('Logging is disabled for this input');
      noLogWarned = true;
    }
  };

  let answer = null;


  const mapKey = m => _.join(_.map(m, line => _.join(line, '')), '');

  const originalMap = [];

  const HALL_Y = 1;
  const SHALLOW_Y = 2;
  const DEEP_Y = 3;

  const TARGET_COL = {
    A: 3,
    B: 5,
    C: 7,
    D: 9,
  };
  const COL_A = TARGET_COL.A;
  const COL_B = TARGET_COL.B;
  const COL_C = TARGET_COL.C;
  const COL_D = TARGET_COL.D;

  const COLOR_COST = {
    A: 1,
    B: 10,
    C: 100,
    D: 1000,
  };


  _.each(input, line => {
    if (line) {
      originalMap.push(line.split(''));
    }
  });

  const isPod = ch => _.includes('ABCD', ch);
  const isPuzzleComplete = map => {
    return map[SHALLOW_Y][COL_A] === 'A' &&
      map[DEEP_Y][COL_A] === 'A' &&
      map[SHALLOW_Y][COL_B] === 'B' &&
      map[DEEP_Y][COL_B] === 'B' &&
      map[SHALLOW_Y][COL_C] === 'C' &&
      map[DEEP_Y][COL_C] === 'C' &&
      map[SHALLOW_Y][COL_D] === 'D' &&
      map[DEEP_Y][COL_D] === 'D';
  };

  const BAD_HALL_COLS = _.map(TARGET_COL);

  const validHallSpots = (map, fromX) => {
    let leftOpen = true;
    let rightOpen = true;
    const spots = [];
    for (let dx = 1; dx < 10; dx += 1) {
      if (leftOpen) {
        const leftX = fromX - dx;
        if (!_.includes(BAD_HALL_COLS, leftX)) {
          if (map[HALL_Y][leftX] === '.') {
            spots.push(leftX);
          } else {
            leftOpen = false;
          }
        }
      }
      if (rightOpen) {
        const rightX = fromX + dx;
        if (!_.includes(BAD_HALL_COLS, rightX)) {
          if (map[HALL_Y][rightX] === '.') {
            spots.push(rightX);
          } else {
            rightOpen = false;
          }
        }
      }
    }
    return spots;
  };
  const manhattanDist = (ax, ay, bx, by) => {
    return Math.abs(ax - bx) + Math.abs(ay - by);
  };
  const cost = (type, ax, ay, bx, by) => {
    return manhattanDist(ax, ay, bx, by) * COLOR_COST[type];
  };
  const possibleMoves = (map, x, y) => {
    const ch = map[y][x];
    if (isPod(ch)) {
      const inTargetCol = x === TARGET_COL[ch];
      if (y === DEEP_Y && !inTargetCol && map[SHALLOW_Y][x] === '.') {
        // find hallway positions
        return _.map(validHallSpots(map, x), hallX => ({
          type: ch,
          fromX: x,
          fromY: y,
          toX: hallX,
          toY: HALL_Y,
          cost: cost(ch, x, y, hallX, HALL_Y),
          note: 'to_hall_from_deep',
        }));
      }
      if (y === SHALLOW_Y) {
        const done = x === TARGET_COL[ch] && map[DEEP_Y][x] === ch;
        // find hallway positions
        if (!done) {
          return _.map(validHallSpots(map, x), hallX => ({
            type: ch,
            fromX: x,
            fromY: y,
            toX: hallX,
            toY: HALL_Y,
            cost: cost(ch, x, y, hallX, HALL_Y),
            note: 'to_hall_from_shallow',
          }));
        }
      }
      if (y === HALL_Y) {
        const startX = x < TARGET_COL[ch] ? x + 1 : TARGET_COL[ch];
        const endX = x < TARGET_COL[ch] ? TARGET_COL[ch] : x - 1;
        let hallOpen = true;
        for (let checkX = startX; checkX <= endX; checkX += 1) {
          if (map[HALL_Y][checkX] !== '.') {
            hallOpen = false;
            break;
          }
        }
        if (hallOpen) {
          if (map[DEEP_Y][TARGET_COL[ch]] === '.' && map[SHALLOW_Y][TARGET_COL[ch]] === '.') {
            return [{
              type: ch,
              fromX: x,
              fromY: y,
              toX: TARGET_COL[ch],
              toY: DEEP_Y,
              cost: cost(ch, x, y, TARGET_COL[ch], DEEP_Y),
              note: 'to_deep_target',
            }];
          } else if (map[DEEP_Y][TARGET_COL[ch]] === ch && map[SHALLOW_Y][TARGET_COL[ch]] === '.') {
            return [{
              type: ch,
              fromX: x,
              fromY: y,
              toX: TARGET_COL[ch],
              toY: SHALLOW_Y,
              cost: cost(ch, x, y, TARGET_COL[ch], SHALLOW_Y),
              note: 'to_shallow_target',
            }];
          }
        }
      }
    }
    return null;
  };

  const getMoves = map => {
    const candidates = [];
    for (let y = 1; y <= DEEP_Y; y += 1) {
      for (let x = 1; x < map[HALL_Y].length - 1; x += 1) {
        const posMoves = possibleMoves(map, x, y);
        _.each(posMoves, m => candidates.push(m));
      }
    }
    return candidates;
  };

  const shortest = _.memoize((map) => {
    if (isPuzzleComplete(map)) {
      return 0;
    }
    // find moves
    const moves = getMoves(map);
    let best = Infinity;
    _.each(moves, move => {
      const newMap = _.cloneDeep(map);
      newMap[move.fromY][move.fromX] = '.';
      newMap[move.toY][move.toX] = move.type;
      const newDist = move.cost + shortest(newMap);
      if (newDist < best) {
        best = newDist;
      }
    });
    return best;
  }, mapKey);

  answer = shortest(originalMap);


  return answer;
}

export const part2 = (input, isTest) => {
  // eslint-disable-next-line no-unused-vars
  const log = (...args) => {
    if ((LOG_TEST && isTest) || (LOG_REAL && !isTest)) {
      console.log(...args);
    } else if (!noLogWarned) {
      console.log('Logging is disabled for this input');
      noLogWarned = true;
    }
  };

  let answer = null;



  const originalMap = [];

  const HALL_Y = 1;

  const TARGET_COL = {
    A: 3,
    B: 5,
    C: 7,
    D: 9,
  };
  const COL_A = TARGET_COL.A;
  const COL_B = TARGET_COL.B;
  const COL_C = TARGET_COL.C;
  const COL_D = TARGET_COL.D;

  const COLOR_COST = {
    A: 1,
    B: 10,
    C: 100,
    D: 1000,
  };


  _.each(input, line => {
    if (line) {
      originalMap.push(line.split(''));
    }
  });
  originalMap[5] = originalMap[3];
  originalMap[6] = originalMap[4];
  originalMap[3] = '  #D#C#B#A#'.split('');
  originalMap[4] = '  #D#B#A#C#'.split('');

  const mapKey = m => _.join(_.map(m, line => _.join(line, '')), '');

  const isPod = ch => _.includes('ABCD', ch);
  const isPuzzleComplete = _.memoize(map => {
    return _.every(_.range(2, 5), y => map[y][COL_A] === 'A')
      &&  _.every(_.range(2, 5), y => map[y][COL_B] === 'B')
      &&  _.every(_.range(2, 5), y => map[y][COL_C] === 'C')
      &&  _.every(_.range(2, 5), y => map[y][COL_D] === 'D')
  }, mapKey);

  const BAD_HALL_COLS = _.map(TARGET_COL);

  const validHallSpots = (map, fromX) => {
    let leftOpen = true;
    let rightOpen = true;
    const spots = [];
    for (let dx = 1; dx < 10; dx += 1) {
      if (leftOpen) {
        const leftX = fromX - dx;
        if (!_.includes(BAD_HALL_COLS, leftX)) {
          if (map[HALL_Y][leftX] === '.') {
            spots.push(leftX);
          } else {
            leftOpen = false;
          }
        }
      }
      if (rightOpen) {
        const rightX = fromX + dx;
        if (!_.includes(BAD_HALL_COLS, rightX)) {
          if (map[HALL_Y][rightX] === '.') {
            spots.push(rightX);
          } else {
            rightOpen = false;
          }
        }
      }
    }
    return spots;
  };
  const manhattanDist = (ax, ay, bx, by) => {
    return Math.abs(ax - bx) + Math.abs(ay - by);
  };
  const cost = (type, ax, ay, bx, by) => {
    return manhattanDist(ax, ay, bx, by) * COLOR_COST[type];
  };
  const possibleMoves = (map, x, y) => {
    const ch = map[y][x];
    if (isPod(ch)) {
      const inTargetCol = x === TARGET_COL[ch];
      if (y === HALL_Y) {
        const targetX = TARGET_COL[ch];
        let targetY = null;
        for (let checkY = 5; checkY > 1; checkY -= 1) {
          if (map[checkY][targetX] === ch) {
            continue;
          }
          if (map[checkY][targetX] === '.') {
            targetY = checkY;
            break;
          }
          break;
        }

        if (targetY) {
          const startX = x < TARGET_COL[ch] ? x + 1 : TARGET_COL[ch];
          const endX = x < TARGET_COL[ch] ? TARGET_COL[ch] : x - 1;
          let hallOpen = true;
          for (let checkX = startX; checkX <= endX; checkX += 1) {
            if (map[HALL_Y][checkX] !== '.') {
              hallOpen = false;
              break;
            }
          }
          if (hallOpen) {
            return [{
              type: ch,
              fromX: x,
              fromY: y,
              toX: TARGET_COL[ch],
              toY: targetY,
              cost: cost(ch, x, y, TARGET_COL[ch], targetY),
              note: 'to_target',
            }];
          }
        }
      } else {
        // skip if space above are not empty
        // skip if column is complete
        const emptyAbove = _.every(_.range(2, y), checkY => map[checkY][x] === '.');
        const inPlace = inTargetCol && _.every(_.range(5, y, -1), checkY => map[checkY][x] === ch);
        if (!inPlace && emptyAbove) {
          // find hallway positions
          return _.map(validHallSpots(map, x), hallX => ({
            type: ch,
            fromX: x,
            fromY: y,
            toX: hallX,
            toY: HALL_Y,
            cost: cost(ch, x, y, hallX, HALL_Y),
            note: 'to_hall',
          }));
        }
      }
    }
    return null;
  };

  const getMoves = map => {
    const candidates = [];
    for (let y = 1; y < 6; y += 1) {
      for (let x = 1; x < map[HALL_Y].length - 1; x += 1) {
        const posMoves = possibleMoves(map, x, y);
        _.each(posMoves, m => candidates.push(m));
      }
    }
    return candidates;
  };

  const shortest = _.memoize((map) => {
    if (isPuzzleComplete(map)) {
      return 0;
    }
    // find moves
    const moves = getMoves(map);
    let best = Infinity;
    _.each(moves, move => {
      const newMap = _.cloneDeep(map);
      newMap[move.fromY][move.fromX] = '.';
      newMap[move.toY][move.toX] = move.type;
      const newDist = move.cost + shortest(newMap);
      if (newDist < best) {
        best = newDist;
      }
    });
    return best;
  }, mapKey);

  answer = shortest(originalMap);






  return answer;
}
