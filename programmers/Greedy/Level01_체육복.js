// * -- 나의 풀이 -- * //

// ! 엄청난 하드코딩 로직을 좀더 간단하게 만들어도 될 것 같다
// ! 탐욕법에 맞는 풀이는 아닌 것 같다.

function solution(n, lost, reserve) {
  const setA = new Set(lost);
  const setB = new Set(reserve);

  lost = Array.from(setA.diff(setB));
  reserve = Array.from(setB.diff(setA));

  lost.sort((a, b) => a - b);
  reserve.sort((a, b) => a - b);

  while (reserve.length > 0 && lost.length > 0) {
    const s = reserve.shift();
    let num;
    for (let el of lost) {
      if (el + 1 === s || el - 1 === s) {
        num = el;
        break;
      }
    }

    lost = lost.filter((n) => n !== num);
  }
  return n - lost.length;
}

Set.prototype.diff = function (set) {
  const result = new Set(this);

  for (const value of set) {
    result.delete(value);
  }
  return result;
};

// * -- 다른 사람 풀이 (예전풀이 인데 깔끔해서 가져와 봤음) -- * //

function solution(n, lost, reserve) {
  return (
    n -
    lost.filter((a) => {
      const b = reserve.find((r) => Math.abs(r - a) <= 1);
      if (!b) return true;
      reserve = reserve.filter((r) => r !== b);
    }).length
  );
}
