// * 풀이 1 (bfs)
function solution(numbers, target) {
  //  TODO: queue에 음수와 양수를 넣기
  const queue = [
    [-numbers[0], 0],
    [+numbers[0], 0],
  ];

  // TODO: 타겟과 같을 때 answer 카운트 올리기
  let answer = 0;

  //TODO: bfs로 경로 탐색
  while (queue.length !== 0) {
    // TODO: 더한 것을 모은 곳은 sum, 현재 더한 횟수는 num, 다음 횟수는 next에 저장
    const now = queue.shift();
    const sum = now[0];
    const num = now[1];
    const next = num + 1;

    // - num이 4이면 현재 모든 숫자를 더했다는 뜻, 그 때 sum 과 target을 비교하여 같으면 카운트를 올린다
    if (num === 4 && sum === target) answer += 1;
    // - 아니면 다음횟수가 4이하 일 때 까지만 numbers의 값을 - / + 한것을 sum과 더하여 큐에 넣는다.
    else if (next <= 4) {
      queue.push([sum - numbers[next], next], [sum + numbers[next], next]);
    }
  }
  return answer;
}

// ! 위와 같이 작성하고 제출 했을 때 테스트 케이스가 통과가 안됨
// ? bfs 로 풀어서 일까? dfs일때도 모든 경로를 탐색해야 하는건 같지 않나?

// * -- 풀이 2 (bfs로 풀되 shift횟수를 줄여보기) --* //

function solution(numbers, target) {
  const queue = [];
  queue.push([numbers[0], -numbers[0]]);
  let index = 1;
  let answer = 0;

  while (queue.length !== 0) {
    const list = queue.shift();

    if (index !== numbers.length) {
      const newList = [];

      for (let num of list) {
        newList.push(num + numbers[index]);
        newList.push(num - numbers[index]);
      }

      index++;
      queue.push(newList);
    } else {
      for (let num of list) {
        if (num === target) {
          answer++;
        }
      }
    }
  }
  return answer;
}

// ! 이 부분은 다른 분의 코드를 빌려왔다.
// ? 이렇게 shitf 메소드를 덜 사용하니까 통과가 되었다. 실제로 프로그래머스 질문창을 보니까 shift()의 성능이 별로라는 얘기가 있다.

// * -- 풀이 3 (dfs) -- * //

function solution(numbers, target) {
  const len = numbers.length;
  let answer = 0;

  function findNum(num, count) {
    if (count < len) {
      findNum(num + numbers[count], count + 1);
      findNum(num - numbers[count], count + 1);
    } else {
      if (target === num) answer++;
    }
  }

  findNum(0, 0);

  return answer;
}
