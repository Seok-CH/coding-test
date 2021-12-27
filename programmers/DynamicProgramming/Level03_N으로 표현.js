// * -- 첫번째 풀이 -- * //

const cache = Array.from({ length: 8 }, () => []);

// TODO: 사용횟수를 측정할 함수 생성
function solution(N, number) {
  // - cache 생성
  makeCache(N);
  // - 전체 cache를 돌면서 특정한 cache레벨 (N 사용횟수)에 원하는 숫자가 있다면 그 cache레벨을 반환
  for (let i = 0; i < cache.length; i++) {
    for (let el of cache[i]) {
      if (el === number) return i + 1;
    }
  }
  // - 존재하지 않는다면 -1을 반환
  return -1;
}

// TODO: cache를 만드는 함수 생성
function makeCache(N) {
  // TODO: 연산자 함수들 묶음
  const operators = [add, sub, multi, divide];

  for (let i = 0; i < 8; i++) {
    // - i가 1부터 연산자를 적용한다
    if (i > 0) {
      // - 전체 연산자들로 반복을 돌린다.
      operators.forEach((operator) => {
        // - 각 cache레벨의 서브루틴의 최댓값 설정
        const max = i - 1;
        // - 서브루틴 절반 이후부터는 중복되니까 max/2까지만 반복을 돌린다.
        for (let j = 0; j <= max / 2; j++) {
          for (let el of cache[j]) {
            for (let el2 of cache[max - j]) {
              cache[i].push(operator(el, el2));
            }
          }
        }
      });
    }

    // - N이 여러번 쓰인경우도 cache에 넣어준다.
    cache[i].push(Number(`${N}`.repeat(i + 1)));
  }
}
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return Math.abs(a - b);
}

function multi(a, b) {
  return a * b;
}

function divide(a, b) {
  const temp = a > b ? a / b : b / a;
  if (Number.isInteger(temp)) return temp;
}

// * -- 두번째 풀이 (set으로 바꾸고 숫자확인을 반복에서 처리하기)-- * //
// NOTICE: 시간복잡도가 많이 개선됨

const cache = Array.from({ length: 8 }, () => new Set());

function solution(N, number) {
  const result = makeCache(N, number);
  return result || -1;
}

function makeCache(N, number) {
  const operators = [add, sub, multi, divide];

  for (let i = 0; i < 8; i++) {
    if (i > 0) {
      operators.forEach((operator) => {
        const max = i - 1;
        for (let j = 0; j <= max / 2; j++) {
          for (let el of cache[j]) {
            for (let el2 of cache[max - j]) {
              cache[i].add(operator(el, el2));
            }
          }
        }
      });
    }
    cache[i].add(Number(`${N}`.repeat(i + 1)));
    if (cache[i].has(number)) return i + 1;
  }
}
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return Math.abs(a - b);
}

function multi(a, b) {
  return a * b;
}

function divide(a, b) {
  const temp = a > b ? a / b : b / a;
  if (Number.isInteger(temp)) return temp;
}
