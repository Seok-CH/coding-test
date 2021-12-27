function solution(n) {
  let result = 0;
  const matrix = new Array(n).fill(0).map((item) => new Array(n).fill(0));

  function find(matrix, count) {
    if (count === n) result++;
    else {
      for (let j = 0; j < n; j++) {
        const copy = copyMatrix(matrix);
        if (isQueen(copy, count, j)) {
          copy[count][j] = "Q";
          find(copy, count + 1);
        }
      }
    }
  }

  find(matrix, 0);

  return result;
}

function copyMatrix(matrix) {
  const copy = [];
  for (let i = 0; i < matrix.length; i++) {
    copy.push(matrix[i].slice());
  }
  return copy;
}

function isQueen(matrix, x, y) {
  const xArr = [];
  const yArr = [];
  const dArr = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (i === x) xArr.push(matrix[i][j]);
      if (j === y) yArr.push(matrix[i][j]);
      if (i + j === x + y) dArr.push(matrix[i][j]);
      if (i - j === x - y) dArr.push(matrix[i][j]);
    }
  }

  if (xArr.includes("Q") || yArr.includes("Q") || dArr.includes("Q"))
    return false;
  else return true;
}
