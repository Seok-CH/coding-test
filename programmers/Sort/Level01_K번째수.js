// * -- 내 풀이 -- * //
// ? Level01 문제라서 그런지 크게 어렵지는 않았다.

function solution(array, commands) {
  const total = [];
  for (let el of commands) {
    // - commands의 각 요소를 이렇게 구조분해할당으로 나누어준다.
    const [begin, end, target] = el;
    // - 문제에서 주어진 숫자들은 배열로 정의 했을 때는 1을 빼주어야한다.
    // - slice 메소드는 두번째 인수 end까지는 포함하지 않기 때문에 1을 빼주지 않았다.
    const result = array.slice(begin - 1, end).sort((a, b) => a - b)[
      target - 1
    ];
    total.push(result);
  }
  return total;
}
