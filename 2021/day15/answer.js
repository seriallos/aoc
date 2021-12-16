/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import { performance } from 'perf_hooks';

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



  const map = [];
  _.each(input, (line, y) => {
    _.each(line, (ch, x) => {
      if (!map[y]) {
        map[y] = [];
      }
      map[y][x] = parseInt(ch, 10);
    });
  });
  const yMax = map.length - 1;
  const xMax = map[0].length - 1;

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const key = (x, y) => `${x}-${y}`;
  const unkey = (k) => _.map(_.split(k, '-'), i => parseInt(i, 10));

  /*
  let leastRisk = Infinity;
  const shortestPaths = new Map();
  const findPath = (x, y, risk = 0, visited = new Set(), path = []) => {
    if (risk > leastRisk) {
      return;
    }

    const k = key(x, y);

    const newVisited = new Set(visited);
    newVisited.add(k);

    const newPath = [...path];
    newPath.push(k);

    if (shortestPaths[k]) {
      if (risk > shortestPaths[k]) {
        return;
      }
    }
    shortestPaths[k] = risk;

    if (x === xMax && y === yMax) {
      log(`found end. risk = ${risk}, path length = ${path.length}`);
      if (risk < leastRisk) {
        leastRisk = risk;
      }
    } else {
      _.each(dirs, ([dx, dy]) => {
        const tx = x + dx;
        const ty = y + dy;
        if (tx >= 0 && tx <= xMax && ty >= 0 && ty <= yMax) {
          const newK = key(tx, ty);
          if (!newVisited.has(newK)) {
            const newRisk = risk + map[ty][tx];
            if (!shortestPaths[newK] || newRisk < shortestPaths[newK]) {
              findPath(tx, ty, newRisk, new Set(newVisited), [...newPath]);
            }
          }
        }
      });
    }
  }

  findPath(0, 0);

  answer = leastRisk;
  */

  const queue = [];
  const dist = {};
  const prev = {};

  for (let y = 0; y <= yMax; y += 1) {
    for (let x = 0; x <= xMax; x += 1) {
      const v = key(x, y);
      dist[v] = Infinity;
      prev[v] = null;
      queue.push(v);
    }
  }
  dist[key(0, 0)] = 0;
  const target = key(xMax, yMax);

  while (queue.length > 0) {
    queue.sort((a, b) => dist[a] - dist[b]);
    const u = queue.shift();
    const [x, y] = unkey(u);

    if (u === target) {
      break;
    }

    const neighbors = _.filter(
      _.map(dirs, ([dx, dy]) => [x + dx, y + dy, key(x + dx, y + dy)]),
      ([vx, vy]) => vx >= 0 && vy >= 0 && vx <= xMax && vy <= yMax && _.includes(queue, key(vx, vy)),
    );
    _.each(neighbors, ([vx, vy, v]) => {
      const alt = dist[u] + map[vy][vx];
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;
      }
    });
  }

  answer = dist[target];

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


  const map = [];
  _.each(input, (line, y) => {
    _.each(line, (ch, x) => {
      if (!map[y]) {
        map[y] = [];
      }
      map[y][x] = parseInt(ch, 10);
    });
  });

  let yMax = map.length;
  let xMax = map[0].length;

  // now extend the map
  for (let y = 0; y < yMax; y += 1) {
    for (let x = 0; x < xMax; x += 1) {
      for (let yy = 0; yy < 5; yy += 1) {
        for (let xx = 0; xx < 5; xx += 1) {
          const nx = x + (xMax * xx);
          const ny = y + (yMax * yy);
          if (!map[ny]) {
            map[ny] = [];
          }
          let newVal = map[y][x] + yy + xx;
          if (newVal > 9) {
            newVal -= 9;
          }
          map[ny][nx] = newVal;
        }
      }
    }
  }

  yMax = map.length - 1;
  xMax = map[0].length - 1;

  // 11637517422274862853338597396444961841755517295286
  // 11637517422274862853338597396444961841755517295286
  //
  // 67554889357866599146897761125791887223681299833479
  // 67554889357866599146897761125791887223681299833479


  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const key = (x, y) => `${x}-${y}`;
  const unkey = _.memoize((k) => _.map(_.split(k, '-'), i => parseInt(i, 10)));


  let queue = [];
  const dist = {};
  const prev = {};
  const visited = new Set();

  for (let y = 0; y <= yMax; y += 1) {
    for (let x = 0; x <= xMax; x += 1) {
      const v = key(x, y);
      dist[v] = Infinity;
      prev[v] = null;
      queue.push(v);
    }
  }
  dist[key(0, 0)] = 0;
  const target = key(xMax, yMax);

  let s = performance.now();
  while (queue.length > 0) {
    let min = Infinity;
    let uIdx = null;
    for (let i = 0; i < queue.length; i += 1) {
      if (dist[queue[i]] < min) {
        min = dist[queue[i]];
        uIdx = i;
      }
    }
    const u = queue[uIdx];
    queue.splice(uIdx, 1);
    visited.add(u);

    /*
    const u = _.minBy(queue, v => dist[v]);
    queue = _.pull(queue, u);
    queue.sort((a, b) => dist[a] - dist[b]);
    const u = queue.shift();
    */

    const [x, y] = unkey(u);
    if (queue.length % 1000 === 0) {
      const now = performance.now();
      const d = now - s;
      s = now;
      log(`Queue size: ${queue.length}, took ${_.round(d, 2).toLocaleString()}ms`);
    }

    if (u === target) {
      break;
    }

    for (let i = 0; i < dirs.length; i += 1) {
      const [dx, dy] = dirs[i];
      const vx = x + dx;
      const vy = y + dy;
      if (vx >= 0 && vy >= 0 && vx <= xMax && vy <= yMax) {
        const v = key(vx, vy);
        if (!visited.has(v)) {
          const alt = dist[u] + map[vy][vx];
          if (alt < dist[v]) {
            dist[v] = alt;
            prev[v] = u;
          }
        }
      }
    }

    /*
    const neighbors = _.filter(
      _.map(dirs, ([dx, dy]) => [x + dx, y + dy, key(x + dx, y + dy)]),
      ([vx, vy, v]) => vx >= 0 && vy >= 0 && vx <= xMax && vy <= yMax && _.includes(queue, v),
    );
    _.each(neighbors, ([vx, vy, v]) => {
      const alt = dist[u] + map[vy][vx];
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;
      }
    });
    */
  }

  answer = dist[target];


  // 2341 is too low


  return answer;
}
