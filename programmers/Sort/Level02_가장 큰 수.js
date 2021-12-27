// * -- 삽질한 풀이 -- * //

// ! 진짜 하드 코딩 (10000까지 커버 가능)
// - 아이디어는  3과 34를 비교한다고 하면 334 보다 343이 더 크다
// - 그래서 3을 아예 33으로 가정하고 비교를 하였다.
// ? 왜 이런데 꽂혔지?

function solution(numbers) {
  return numbers
    .sort((a, b) => {
      if (a < 10) a += a * 1000 + a * 100 + a * 10;
      else if (a < 100) a = a * 100 + (a % 10) * 10 + (a % 10);
      else if (a < 1000) a = a * 10 + ((a % 100) % 10);

      if (b < 10) b += b * 1000 + b * 100 + b * 10;
      else if (b < 100) b = b * 100 + (b % 10) * 10 + (b % 10);
      else if (b < 1000) b = b * 10 + ((b % 100) % 10);

      return b - a;
    })
    .join("");
}

// * -- 힌트를 얻고 난 후 풀이 -- * //

// ? 테스트 케이스를 찾다가 힌트를 얻었다.
// - 각각에 대해 연결한 값을 비교하면 되는 거였다.
function solution(numbers) {
  const max = numbers
    .map((n) => String(n))
    .sort((a, b) => b + a - (a + b))
    .join("");

  // - 하지만 이 경우도 모든 숫자가 0 일때는 숫자 0을 반환해야한다. 그래서 다음과 같은
  // - 예외 케이스가 있다.
  if (Number(max) === 0) return "0";
  else return max;
}
