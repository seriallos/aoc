/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

const LOG_TEST = true;
const LOG_REAL = false;

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




  const caves = {};
  const entries = [];

  const ensureCave = name => {
    if (!caves[name]) {
      caves[name] = {
        name,
        small: name === _.toLower(name),
        paths: [],
      };
    }
    return caves[name];
  };

  _.each(input, line => {
    if (line) {
      const [entry, exit] = _.split(line, '-');
      if (entry === 'start') {
        entries.push(entry);
      }
      ensureCave(entry).paths.push(exit);
      ensureCave(exit).paths.push(entry);
    }
  });

  answer = 0;
  const findPaths = (nodeName, visited = new Set(), route = []) => {
    const node = caves[nodeName];
    route.push(nodeName);
    if (nodeName === 'end') {
      answer += 1;
    } else {
      const candidates = _.reject(node.paths, path => {
        if (caves[path].small && visited.has(path)) {
          return true;
        }
      });
      const nextVisited = new Set(visited);
      nextVisited.add(nodeName);
      _.each(candidates, next => {
        const nextRoute = [...route];
        findPaths(next, nextVisited, nextRoute);
      });
    }
  };

  findPaths('start');


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

  const caves = {};
  const entries = [];

  const ensureCave = name => {
    if (!caves[name]) {
      caves[name] = {
        name,
        small: name === _.toLower(name),
        paths: [],
      };
    }
    return caves[name];
  };

  _.each(input, line => {
    if (line) {
      const [entry, exit] = _.split(line, '-');
      if (entry === 'start') {
        entries.push(entry);
      }
      ensureCave(entry).paths.push(exit);
      ensureCave(exit).paths.push(entry);
    }
  });

  const validRoutes = new Set();

  const findPaths = (nodeName, visited = new Set(), route = [], double = null) => {
    const node = caves[nodeName];
    route.push(nodeName);
    const nextVisited = new Set(visited);
    nextVisited.add(nodeName);
    if (nodeName === 'end') {
      validRoutes.add(route.join(','));
    } else {
      _.each(node.paths, next => {
        if (next === 'start') {
          return;
        }
        if (next === 'end' || !caves[next].small) {
          findPaths(next, new Set(nextVisited), [...route], double);
        } else if (caves[next].small) {
          if (!visited.has(next)) {
            findPaths(next, new Set(nextVisited), [...route], double);
          } else if (!double) {
            findPaths(next, new Set(nextVisited), [...route], true);
          }
        }
      });
    }
  };

  findPaths('start');

  answer = validRoutes.size;

  return answer;
}
