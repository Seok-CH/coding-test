function solution(name) {
  const visited = name.split("").map((n) => (n === "A" ? true : false));
  let [moveSum, pos] = [0, 0];

  while (true) {
    const r = moveJoyStick(pos, name, visited);
    if (!r) break;
    pos = r[0];
    moveSum += r[1];
  }

  return moveSum;
}
// TODO: 조이스틱 조작 횟수가 최소가 되는 곳 구하는 함수
function moveJoyStick(pos, name, visited) {
  const result = [];

  for (let i = 0; i < name.length; i++) {
    const [upDown, leftRight] = getMove(name, i, pos);
    result.push([i, upDown + leftRight, leftRight]);
  }

  result.sort((a, b) => a[2] - b[2]);

  for (let el of result) {
    if (!visited[el[0]]) {
      visited[el[0]] = true;
      return el;
    }
  }
}

function getMove(name, i, pos) {
  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt

  const diff = name.charCodeAt(i) - 65;
  const len = i - pos;

  // - upDown이 최소가 되도록 뒤에서 찾거나 앞에서 찾는 것중 최소를 고른다.

  // - leftRight는 현재 포지션보다 앞으로 가는 경우(오른쪽 이동)
  // - 즉 len이 0보다 큰 경우에는 왼쪽으로도 이동 할 수 있기 때문에 왼쪽과 오른쪽 중 최소를 선택
  // - 현재 포지션보다 뒤로 가는 경우에는 오른쪽으로 이동할 수 없기 때문에 그냥 그 길이를 반환

  const upDown = Math.min(diff, 26 - diff);
  const leftRight = len > 0 ? Math.min(len, name.length - len) : Math.abs(len);
  return [upDown, leftRight];
}
