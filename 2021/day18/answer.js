/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
import { drawGrid } from '../../util.js';

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

  const stringify = (root) => {
    let output = '';
    const traverse = node => {
      if (!node) {
        return;
      }
      if (node.value !== null) {
        output += node.value;
      } else {
        output += '[';
        traverse(node.left);
        output += ',';
        traverse(node.right);
        output += ']';
      }
    };
    traverse(root);
    return output;
  };

  const explode = root => {
    let prevValueNode = null
    let carry = null;
    let action = null;
    let didSomething = false;
    const traverse = (node, depth = 0) => {
      if (node.value !== null) {
        prevValueNode = node;
        if (carry) {
          node.value += carry;
          carry = null;
        }
      }
      if (!action && depth === 4 && node.value === null) {
        action = 'explode';
        const leftValue = node.left.value;
        const rightValue = node.right.value;

        node.value = 0;
        node.left = null;
        node.right = null;

        if (prevValueNode) {
          prevValueNode.value += leftValue;
          prevValueNode = null;
        }
        carry = rightValue;
      } else if (node.left) {
        traverse(node.left, depth + 1)
        traverse(node.right, depth + 1);
      }
    };

    traverse(root);
    if (action) {
      didSomething = true;
    }

    return didSomething;
  }

  const split = root => {
    let action = null;
    let didSomething = false;
    const traverse = (node, depth = 0) => {
      if (node.value !== null) {
        if (!action && node.value > 9) {
          action = 'split';
          const val = node.value;
          node.value = null;
          node.left = {
            value: _.floor(val / 2),
            parent: node,
          };
          node.right = {
            value: _.ceil(val / 2),
            parent: node,
          };
        }
      }
      if (node.left) {
        traverse(node.left, depth + 1)
        traverse(node.right, depth + 1);
      }
    };

    traverse(root);
    if (action) {
      didSomething = true;
    }

    return didSomething;
  };

  const reduce = root => {
    let didExplode;
    let didSplit;
    do {
      didExplode = explode(root);
      if (!didExplode) {
        didSplit = split(root);
      }
    } while (didExplode || didSplit);

    return root;
  };

  const add = (a, b) => {
    const node = {
      parent: null,
      left: a,
      right: b,
      value: null,
    };
    node.left.parent = node;
    node.right.parent = node;
    reduce(node);
    return node;
  }

  const magnitude = node => {
    if (node.value !== null) {
      return node.value;
    }
    return (3 * magnitude(node.left)) + (2 * magnitude(node.right));
  };


  let homework = null;
  let numbers = [];
  _.each(input, line => {
    if (!line) {
      // stop processing
      return false;
    }
    if (line) {
      let root = null;
      let cur = null;
      _.each(line, ch => {
        switch (ch) {
          case '[': {
            const node = {
              parent: null,
              left: null,
              right: null,
              value: null,
            };
            node.parent = cur;
            if (!root) {
              root = node;
              cur = root;
            } else {
              if (!cur.left) {
                cur.left = node;
              } else {
                cur.right = node;
              }
              cur = node;
            }
            break;
          }
          case ']':
            cur = cur.parent;
            break;
          case ',':
            break;
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9': {
            const node = {
              value: parseInt(ch, 10),
              parent: cur,
            };
            if (!cur.left) {
              cur.left = node;
            } else {
              cur.right = node;
            }
            break;
          }
        }
      });

      // [[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]
      // [[[9,[3,8]],[[[,],9],6]],[[[3,7],[4,9]],3]]

      numbers.push(root);

      if (!homework) {
        homework = reduce(root);
        log(stringify(homework));
      } else {
        // add numbers and reduce
        homework = add(homework, root);
        log(stringify(homework));
      }
    }
  });

  answer = magnitude(homework)

  /*

  [[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
  [7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
  [[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]

  [[[[4,0],[5,4]],[[7,7],[0,13]]],[[5,10],[[0,20],[0,6]]]]
  1234   3 4   32 34   3 4    321 23    2 34    3 4

  [[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]

  */


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




  const stringify = (root) => {
    let output = '';
    const traverse = node => {
      if (!node) {
        return;
      }
      if (node.value !== null) {
        output += node.value;
      } else {
        output += '[';
        traverse(node.left);
        output += ',';
        traverse(node.right);
        output += ']';
      }
    };
    traverse(root);
    return output;
  };

  const explode = root => {
    let prevValueNode = null
    let carry = null;
    let action = null;
    let didSomething = false;
    const traverse = (node, depth = 0) => {
      if (node.value !== null) {
        prevValueNode = node;
        if (carry) {
          node.value += carry;
          carry = null;
        }
      }
      if (!action && depth === 4 && node.value === null) {
        action = 'explode';
        const leftValue = node.left.value;
        const rightValue = node.right.value;

        node.value = 0;
        node.left = null;
        node.right = null;

        if (prevValueNode) {
          prevValueNode.value += leftValue;
          prevValueNode = null;
        }
        carry = rightValue;
      } else if (node.left) {
        traverse(node.left, depth + 1)
        traverse(node.right, depth + 1);
      }
    };

    traverse(root);
    if (action) {
      didSomething = true;
    }

    return didSomething;
  }

  const split = root => {
    let action = null;
    let didSomething = false;
    const traverse = (node, depth = 0) => {
      if (node.value !== null) {
        if (!action && node.value > 9) {
          action = 'split';
          const val = node.value;
          node.value = null;
          node.left = {
            value: _.floor(val / 2),
            parent: node,
          };
          node.right = {
            value: _.ceil(val / 2),
            parent: node,
          };
        }
      }
      if (node.left) {
        traverse(node.left, depth + 1)
        traverse(node.right, depth + 1);
      }
    };

    traverse(root);
    if (action) {
      didSomething = true;
    }

    return didSomething;
  };

  const reduce = root => {
    let didExplode;
    let didSplit;
    do {
      didExplode = explode(root);
      if (!didExplode) {
        didSplit = split(root);
      }
    } while (didExplode || didSplit);

    return root;
  };

  const add = (a, b) => {
    const node = {
      parent: null,
      left: a,
      right: b,
      value: null,
    };
    node.left.parent = node;
    node.right.parent = node;
    reduce(node);
    return node;
  }

  const magnitude = node => {
    if (node.value !== null) {
      return node.value;
    }
    return (3 * magnitude(node.left)) + (2 * magnitude(node.right));
  };


  let homework = null;
  let numbers = [];
  _.each(input, line => {
    if (!line) {
      // stop processing
      return false;
    }
    if (line) {
      let root = null;
      let cur = null;
      _.each(line, ch => {
        switch (ch) {
          case '[': {
            const node = {
              parent: null,
              left: null,
              right: null,
              value: null,
            };
            node.parent = cur;
            if (!root) {
              root = node;
              cur = root;
            } else {
              if (!cur.left) {
                cur.left = node;
              } else {
                cur.right = node;
              }
              cur = node;
            }
            break;
          }
          case ']':
            cur = cur.parent;
            break;
          case ',':
            break;
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9': {
            const node = {
              value: parseInt(ch, 10),
              parent: cur,
            };
            if (!cur.left) {
              cur.left = node;
            } else {
              cur.right = node;
            }
            break;
          }
        }
      });

      // [[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]
      // [[[9,[3,8]],[[[,],9],6]],[[[3,7],[4,9]],3]]

      numbers.push(root);
    }
  });


  let max = -Infinity;
  for (let i = 0; i < numbers.length; i += 1) {
    for (let j = 0; j < numbers.length; j += 1) {
      if (i !== j) {
        const a = _.cloneDeep(numbers[i]);
        const b = _.cloneDeep(numbers[j]);
        log(stringify(a), '+', stringify(b));
        const number = add(a, b);
        const mag = magnitude(number);
        if (mag > max) {
          max = mag;
        }
      }
    }
  }

  answer = max;




  return answer;
}
