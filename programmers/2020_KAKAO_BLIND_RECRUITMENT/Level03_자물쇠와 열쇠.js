function solution(key, lock) {
  const lockPattern = [];
  for (let i = 0; i < lock.length; i++) {
    for (let j = 0; j < lock.length; j++) {
      if (lock[i][j] === 0) lockPattern.push([i, j]);
    }
  }
  if (lockPattern.length === 0) return true;

  // TODO: 열쇠를 90도 회전시킨 것 4개를 각각 만들어본다.
  const keyBundle = [
    key,
    rotateMatrix(key, 1),
    rotateMatrix(key, 2),
    rotateMatrix(key, 3),
  ];

  // TODO: 각각의 패턴을 모음
  const keyPattern = keyBundle.map((key) => {
    const result = [];
    for (let i = 0; i < key.length; i++) {
      for (let j = 0; j < key.length; j++) {
        if (key[i][j] === 1) result.push([i, j]);
      }
    }

    const [i, j] = lockPattern[0];
    const [k, l] = result[0];
    const q = i - k;
    const w = j - l;

    return result
      .map((el) => [el[0] + q, el[1] + w])
      .filter(
        (el) =>
          el[0] >= 0 && el[0] < lock.length && el[1] >= 0 && el[1] < lock.length
      );
  });

  const keyPattern2 = keyBundle.map((key) => {
    const result = [];
    for (let i = 0; i < key.length; i++) {
      for (let j = 0; j < key.length; j++) {
        if (key[i][j] === 1) result.push([i, j]);
      }
    }

    const [i, j] = lockPattern[lockPattern.length - 1];
    const [k, l] = result[result.length - 1];
    const q = i - k;
    const w = j - l;

    return result
      .map((el) => [el[0] + q, el[1] + w])
      .filter(
        (el) =>
          el[0] >= 0 && el[0] < lock.length && el[1] >= 0 && el[1] < lock.length
      );
  });

  return (
    Math.max(
      keyPattern.filter((pattern) => {
        for (let i = 0; i < Math.max(lockPattern.length, pattern.length); i++) {
          if (pattern[i] && lockPattern[i]) {
            const [j, k] = lockPattern[i];
            const [l, m] = pattern[i];
            if (j !== l || k !== m) return false;
          } else {
            if (lockPattern[i]) return false;
            else if (pattern[i]) {
              const [j, k] = pattern[i];
              if (lock[j][k] === 1) return false;
            }
          }
        }
        return true;
      }).length,
      keyPattern2.filter((pattern) => {
        for (let i = 0; i < Math.max(lockPattern.length, pattern.length); i++) {
          if (pattern[i] && lockPattern[i]) {
            const [j, k] = lockPattern[i];
            const [l, m] = pattern[i];
            if (j !== l || k !== m) return false;
          } else {
            if (lockPattern[i]) return false;
            else if (pattern[i]) {
              const [j, k] = pattern[i];
              if (lock[j][k] === 1) return false;
            }
          }
        }
        return true;
      }).length
    ) > 0
  );
}

const rotateMatrix = function (matrix, n = 1) {
  if (n === 0) return matrix;
  const rotated = [];
  const N = matrix.length;
  const M = matrix[0] && matrix[0].length;

  for (let i = 0; i < M; i++) {
    const arr = [];
    for (let j = N - 1; j >= 0; j--) {
      arr.push(matrix[j][i]);
    }
    rotated.push(arr);
  }
  return rotateMatrix(rotated, n - 1);
};

// function solution(key, lock) {
//   // TODO: 열쇠를 90도 회전시킨 것 4개를 각각 만들어본다.
//   const lockPattern = [];
//   for (let i = 0; i < lock.length; i++) {
//     for (let j = 0; j < lock.length; j++) {
//       if (lock[i][j] === 0) lockPattern.push([i, j]);
//     }
//   }
//   if (lockPattern.length === 0) return true;

//   const keyBundle = [
//     key,
//     rotateMatrix(key, 1),
//     rotateMatrix(key, 2),
//     rotateMatrix(key, 3),
//   ];

//   const keyPattern = keyBundle.map((key) => {
//     const result = [];
//     for (let i = 0; i < key.length; i++) {
//       for (let j = 0; j < key.length; j++) {
//         if (key[i][j] === 1) result.push([i, j]);
//       }
//     }

//     const [i, j] = lockPattern[0];
//     const [k, l] = result[0];
//     const q = i - k;
//     const w = j - l;

//     return result
//       .map((el) => [el[0] + q, el[1] + w])
//       .filter(
//         (el) =>
//           el[0] >= 0 && el[0] < lock.length && el[1] >= 0 && el[1] < lock.length
//       );
//   });

//   const keyPattern2 = keyBundle.map((key) => {
//     const result = [];
//     for (let i = 0; i < key.length; i++) {
//       for (let j = 0; j < key.length; j++) {
//         if (key[i][j] === 1) result.push([i, j]);
//       }
//     }

//     const [i, j] = lockPattern[lockPattern.length - 1];
//     const [k, l] = result[result.length - 1];
//     const q = i - k;
//     const w = j - l;

//     return result
//       .map((el) => [el[0] + q, el[1] + w])
//       .filter(
//         (el) =>
//           el[0] >= 0 && el[0] < lock.length && el[1] >= 0 && el[1] < lock.length
//       );
//   });

//   const keyPattern3 = keyBundle.map((key) => {
//     const result = [];
//     for (let i = 0; i < key.length; i++) {
//       for (let j = 0; j < key.length; j++) {
//         if (key[i][j] === 1) result.push([i, j]);
//       }
//     }
//     result.reduce((a, c) => {
//       const [i, j] = c;
//       const [k, l] = a;
//     });
//     const [i, j] = lockPattern[0];
//     const [k, l] = result[0];
//     const q = i - k;
//     const w = j - l;

//     return result
//       .map((el) => [el[0] + q, el[1] + w])
//       .filter(
//         (el) =>
//           el[0] >= 0 && el[0] < lock.length && el[1] >= 0 && el[1] < lock.length
//       );
//   });

//   return (
//     Math.max(
//       keyPattern.filter((pattern) => {
//         for (let i = 0; i < Math.max(lockPattern.length, pattern.length); i++) {
//           if (pattern[i] && lockPattern[i]) {
//             const [j, k] = lockPattern[i];
//             const [l, m] = pattern[i];
//             if (j !== l || k !== m) return false;
//           } else {
//             if (lockPattern[i]) return false;
//             else if (pattern[i]) {
//               const [j, k] = pattern[i];
//               if (lock[j][k] === 1) return false;
//             }
//           }
//         }
//         return true;
//       }).length,
//       keyPattern2.filter((pattern) => {
//         for (let i = 0; i < Math.max(lockPattern.length, pattern.length); i++) {
//           if (pattern[i] && lockPattern[i]) {
//             const [j, k] = lockPattern[i];
//             const [l, m] = pattern[i];
//             if (j !== l || k !== m) return false;
//           } else {
//             if (lockPattern[i]) return false;
//             else if (pattern[i]) {
//               const [j, k] = pattern[i];
//               if (lock[j][k] === 1) return false;
//             }
//           }
//         }
//         return true;
//       }).length
//     ) > 0
//   );
// }

// const rotateMatrix = function (matrix, n = 1) {
//   if (n === 0) return matrix;
//   const rotated = [];
//   const N = matrix.length;
//   const M = matrix[0] && matrix[0].length;

//   for (let i = 0; i < M; i++) {
//     const arr = [];
//     for (let j = N - 1; j >= 0; j--) {
//       arr.push(matrix[j][i]);
//     }
//     rotated.push(arr);
//   }
//   return rotateMatrix(rotated, n - 1);
// };

solution(
  [
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
  ],
  [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 0],
  ]
);
