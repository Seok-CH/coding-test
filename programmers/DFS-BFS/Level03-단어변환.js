// * -- 풀이 1 (bfs이용) -- * //

function solution(begin, target, words) {
  // TODO: words 의 단어를 문자열 하나로 합치고 중복되는 요소 제거 (strOnce 함수로)
  const once = strOnce(words.join(""));

  // TODO: 방문한 곳 체크하기
  const visited = {};
  for (let i = 0; i < words.length; i++) {
    visited[words[i]] = false;
  }

  // TODO: bfs를 위한 큐 설정
  const queue = [];
  queue.push([begin, 0]);

  // TODO: 단어 변환의 최소경로를 찾기 위해서 bfs를 이용
  while (queue.length !== 0) {
    const now = queue.shift();
    const cur = now[0];
    const curArr = strToArr(cur);

    // - 현재 값과 타켓이 같으면 카운트 반환
    if (cur === target) return now[1];

    // - 문자열 각 자리에 대해 중복제거한 문자열 조합(once)을 하나씩 넣어본다.
    for (let i = 0; i < begin.length; i++) {
      for (let j = 0; j < once.length; j++) {
        const cnt = now[1];

        // ! 만약 바꿀려는 i 번째 문자와 once 문자가 같다면 안 바꿔줘도 되기 때문에 반복을 넘긴다.
        if (curArr[i] === once[j]) continue;

        // - 배열을 copy하여 문자를 바꾼다
        const copyArr = curArr.slice();
        copyArr[i] = once[j];
        const copyStr = arrToStr(copyArr);

        // ! 바꾼 문자가 words안에 포함되어 있지 않거나 방문 한 것이면 반복을 건너뛴다.
        if (!words.includes(copyStr) || visited[copyStr]) continue;

        // - 아니라면 방문했다고 표시한다음 queue에 푸쉬한다.
        visited[copyStr] = true;
        queue.push([copyStr, cnt + 1]);
      }
    }
  }
  // - 모든 경로에 대해 찾을 수 없다면 0 반환
  return 0;
}

// TODO 중복되지 않는 문자열을 만드는 함수
function strOnce(str) {
  let answer = "";
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) == i) answer += str[i];
  }

  return answer;
}
// TODO 문자열을 배열로 바꾸는 함수
function strToArr(str) {
  return str.split("");
}
// TODO 배열을 문자열로 바꾸는 함수
function arrToStr(arr) {
  return arr.join("");
}
