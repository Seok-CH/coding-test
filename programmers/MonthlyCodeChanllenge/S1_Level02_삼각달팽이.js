// function solution(n) {
//   let triangle = new Array(n).fill(0).map((_, i) => new Array(i + 1));
//   let [row, col, num] = [-1, 0, 0];

//   for (let i = n; i > 0; i -= 3) {
//     triangle[++row][col] = ++num;
//     for (let j = 0; j < i - 1; j++) triangle[++row][col] = ++num; // - 왼쪽 빗변 채우기
//     for (let j = 0; j < i - 1; j++) triangle[row][++col] = ++num; // - 밑면 채우기
//     for (let j = 0; j < i - 2; j++) triangle[--row][--col] = ++num; // - 오른쪽 빗변 채우기
//   }
//   return a.flat();
// }

// solution(4);

let triangle = new Array(n).fill(0).map((s, i) => new Array(i + 1));
function solution(n) {
  const itv = Math.floor(n / 3) + 1;
  const [k, l] = [0, 0];
  let max = 0;

  while (itv > 0) {
    fillShell(tri, max);
    itv--;
  }
}

function fillShell(tri, max) {
  for (let i = 1; i <= tri.length; i++) {
    if (i === 0) tri[0][0] = i;
    else if (i === tri.length) {
      tri[i - 1].forEach((e, idx) => (e = i + idx));
    } else {
      tri[i - 1][0] = i;
      tri[i - 1][i - 1] = max - i;
    }
  }
}
function getShellMax(n) {
  return n === 1 ? 1 : 3 * n - 1;
}
