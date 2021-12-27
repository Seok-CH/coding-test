// * -- 풀이 -- * //

function solution(progresses, speeds) {
  // TODO: 진척도와 작업속도를 통해서 작업해야하는 날의 수를 구한다. (배열로)
  // TODO: Math.ceil() 로 남은 작업보다 작업속도가 더 클 때도 하루가 걸리는 것으로 한다.
  const workingDay = progresses.map((progress, idx) =>
    Math.ceil((100 - progress) / speeds[idx])
  );

  // - 배포 순서는 큐 처럼 먼저들어 온 것이 먼저 나간다. 앞의 것보다 먼저 끝낸 작업은
  // - 대기 하다가 앞의 것이 끝나면 같이 나가는 형태이다.
  // - 그래서 큰 숫자의 값(오래 걸리는 작업)을 기준으로 삼아서
  // - 그 숫자와 그 숫자보다 작은 것들의 수를 차례대로 센다. (같이 배포하는 작업의 수)
  // - 그러다가 기준으로 잡았던 큰 숫자보다 더 큰 숫자가 나타나면 같이 배포할 수 없기 때문에
  // - 다시 기준을 잡고 위와 똑같이 반복을 하면 된다.

  // - 처음 제일 큰 숫자는 배열의 첫번째 요소로 설정
  let max = workingDay[0];
  let count = 0;
  // - 같이 나가는 작업의 수를 담을 배열 설정
  const total = [];

  // TODO: workingDay 배열을 순회하며 배포할 때 같이 나가는 작업의 수 세기
  for (let day of workingDay) {
    // - 만약 설정한 기준 보다 작거나 같다면 같이 나가기 때문에 카운트를 올린다
    if (day <= max) {
      count++;
      // - 아니라면 같이 나갈수 없기 떄문에 새로운 기준을 설정하고 기존의 카운트는 total에 푸쉬한다음
      // - count를 1로 설정 (이 작업도 카운트에 포함되기 때문)
    } else {
      total.push(count);
      max = day;
      count = 1;
    }
  }

  //- 배열의 순회가 끝났다면 남아있던 카운트도 푸쉬한다.
  total.push(count);
  return total;
}

// ? 이렇게 풀고 테스트가 통과되어서 다른 사람의 풀이도 봤는데
// ? 맨 처음의 풀이가 나랑 매우 비슷해서 놀랐다. 역시 사람들 생각하는 건 다 똑같은 것 같다.
