// ! 이렇게 하니까 테스트 케이스 1번이 통과과 안됨

// * 첫번째 풀이

function solution(tickets) {
  // TODO: 전체 경로를 담을 배열 설정
  const total = [];

  // TODO: 남은 티켓 중에서 내가 선택한 출발지의 티켓만 고르기
  function findStart(start, tickets) {
    return tickets.filter((ticket) => ticket[0] === start);
  }

  // TODO: 경로 찾기
  function findPath(path, tickets) {
    // TODO: 출발지 티켓 찾기
    const start = findStart(path[path.length - 1], tickets);

    // - base case 설정 - 1. 출발지 티켓이 없고 남은 티켓이 없는 경우 경로를 찾았기 때문에
    // - total에 경로를 푸쉬한다.
    if (start.length === 0 && tickets.length === 0) total.push(path);
    // - 아닐경우에는 출발지 티켓을 이용하여 경로를 찾는다.
    else {
      // TODO: 출발지 티켓이 여러개인 경우를 위해 반복문을 돌려준다.
      for (let el of start) {
        // - 경로설정과 사용한 티켓을 삭제하기 위해 배열을 복사한다.
        const copyPath = path.slice();
        const copyTickets = tickets.slice();
        const destination = el[1];

        // - 복사한 경로에 도착지를 넣는다.
        copyPath.push(destination);

        // - 사용한 티켓은 필터링하여 삭제한다.
        const filtered = copyTickets.filter(
          (ticket) => !(ticket[0] === el[0] && ticket[1] === el[1])
        );

        // - 필터링한 배열을 다시 재귀로 findPath 함수를 호출한다.
        findPath(copypath, filtered);
      }
    }
  }

  // - 출발지는 항상 ICN 고정이기 때문에 path에 먼저 넣어준다.
  findPath(["ICN"], tickets);

  // - total이 여러개이기 때문에 알파벳 순서대로 정렬을 하여 제일 첫번째 것 만 리턴한다.
  return total.sort(sortFn)[0];
}

// TODO: arr.sort(fn) 고차함수의 정렬함수 fn을 만든다. 이차원 배열의 각 배열요소를
// TODO: 순회하면서 알파벳 순서대로 비교한다. 모든 요소를 비교해도 같다면 0을 반환
function sortFn(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) return 1;
    else if (a[i] < b[i]) return -1;
  }
  return 0;
}

/* --------------------- */

// ? 무엇이 문제일까 찾던 도중 위의 로직은 중복된 항공편 ( 예를들면 ['ICN','JFK'], ['JFK','ICN'])
// ? 이 있다고 한다면 filter에서 모두 필터링 하기 때문에 위의 상황에서는 적절한 경로를 찾지 못함

// * -- 두번째 풀이 (필터링에서 중복되는 요소는 다시 넣어줌) -- *//

function solution(tickets) {
  const total = [];

  function findStart(start, tickets) {
    return tickets.filter((ticket) => ticket[0] === start);
  }

  function findPath(answer, tickets) {
    const start = findStart(answer[answer.length - 1], tickets);
    if (start.length === 0 && tickets.length === 0) total.push(answer);
    else {
      for (let el of start) {
        const copyAnswer = answer.slice();
        copyAnswer.push(el[1]);
        const copyTickets = tickets.slice();
        const filtered = copyTickets.filter(
          (ticket) => !(ticket[0] === el[0] && ticket[1] === el[1])
        );

        // TODO: 중복되는 요소 찾기
        const overlap = copyTickets.filter(
          (ticket) => ticket[0] === el[0] && ticket[1] === el[1]
        );

        // - 하나만 빼고 다시 넣어준다.
        if (overlap.length > 1) filtered.push(...overlap.slice(0, -1));
        findPath(copyAnswer, filtered);
      }
    }
  }

  findPath(["ICN"], tickets);
  return total.sort(sortFn)[0];
}

function sortFn(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) return 1;
    else if (a[i] < b[i]) return -1;
  }
  return 0;
}
