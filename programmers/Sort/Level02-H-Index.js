// * -- 내 풀이 * -- //

// ? 한번만에 통과해서 의아 했던 문제

function solution(citations) {
  // - Hindex 변수 설정
  let Hindex = 0;
  // - 내림차순으로 정렬
  citations.sort((a, b) => b - a);
  // - 정렬한 citations를 순회하면서 h번 이상 인용된 논문이 h개 이상이어야 한다
  // - idx에 1을 넣어주는 이유는 갯수로 파악하기 위해서
  // - 그래서 각 citation 숫자는 idx + 1 보다 크거나 같으면
  // - 위의 h번 이상 인용된 논문이 h개 이상이라는 것을 만족한다.
  citations.forEach((citation, idx) => {
    if (citation >= idx + 1) Hindex++;
  });

  return Hindex;
}
