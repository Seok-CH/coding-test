function solution(lines) {
  const dotArr = [];

  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      console.log(i, j);
      const dot = getCrossDot(lines[i], lines[j]);
      if (dot) dotArr.push(dot);
    }
  }
  return makeImage(dotArr);
}

function getCrossDot(line1, line2) {
  const [A, B, E] = line1;
  const [C, D, F] = line2;

  const x = (B * F - E * D) / (A * D - B * C);
  const y = (E * C - A * F) / (A * D - B * C);

  if (isValidNum(x) && isValidNum(y)) return [x, y];
}

function isValidNum(num) {
  if (num !== Infinity && Number.isInteger(num)) return true;
  else return false;
}

function makeImage(arr) {
  const xArr = [];
  const yArr = [];

  arr.forEach((el) => {
    xArr.push(el[0]);
    yArr.push(el[1]);
  });

  const Xmin = Math.min(...xArr);
  const Ymin = Math.min(...yArr);

  const Xlen = Math.max(...xArr) - Math.min(...xArr);
  const Ylen = Math.max(...yArr) - Math.min(...yArr);

  const adjustArr = arr.map((el) => [el[0] - Xmin, el[1] - Ymin]);

  const image = [];
  for (let i = Ylen; i >= 0; i--) {
    let line = "";
    for (let j = 0; j <= Xlen; j++) {
      if (adjustArr.some((el) => el[0] === j && el[1] === i)) line += "*";
      else line += ".";
    }
    image.push(line);
  }
  return image;
}
