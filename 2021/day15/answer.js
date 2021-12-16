/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import { performance } from 'perf_hooks';

// eslint-disable-next-line no-unused-vars
import { drawGrid } from '../../util.js';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

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
  const unkey = _.memoize((k) => _.map(_.split(k, '-'), i => parseInt(i, 10)));

  const dist = {};
  const visited = new Set();
  const pQueue = new MinPriorityQueue({
    compare: (a, b) => dist[a] - dist[b],
  });

  for (let y = 0; y <= yMax; y += 1) {
    for (let x = 0; x <= xMax; x += 1) {
      const v = key(x, y);
      dist[v] = Infinity;
    }
  }

  const source = key(0, 0);
  const target = key(xMax, yMax);

  dist[source] = 0;

  pQueue.enqueue(source);

  while (pQueue.size() > 0) {
    const u = pQueue.dequeue();

    visited.add(u);

    const [x, y] = unkey(u);

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
            pQueue.enqueue(v);
          }
        }
      }
    }
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


  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const key = (x, y) => `${x}-${y}`;
  const unkey = _.memoize((k) => _.map(_.split(k, '-'), i => parseInt(i, 10)));

  const dist = {};
  const visited = new Set();
  const pQueue = new MinPriorityQueue({
    compare: (a, b) => dist[a] - dist[b],
  });

  for (let y = 0; y <= yMax; y += 1) {
    for (let x = 0; x <= xMax; x += 1) {
      const v = key(x, y);
      dist[v] = Infinity;
    }
  }

  const source = key(0, 0);
  const target = key(xMax, yMax);

  dist[source] = 0;

  pQueue.enqueue(source);

  while (pQueue.size() > 0) {
    const u = pQueue.dequeue();

    visited.add(u);

    const [x, y] = unkey(u);

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
            pQueue.enqueue(v);
          }
        }
      }
    }
  }

  answer = dist[target];


  // 2341 is too low


  return answer;
}
