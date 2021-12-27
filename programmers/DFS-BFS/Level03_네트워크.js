function solution(n, computers) {
  // TODO: 무한루프 방지하기 위해 방문한 것 기록하기
  const visited = new Array(n).fill(false); //
  let answer = 0;

  // TODO: 정점을 하나씩 순회하면서 연결된 정점이 있는지 확인하기
  // TODO: 모든 정점을 다 도는 반복문을 설정
  for (let i = 0; i < computers.length; i++) {
    if (visited[i] === false) {
      // - bfs와 dfs 둘다 사용가능
      bfs(computers, i, visited);
      // dfs(computers, i, visited);
      answer++;
    }
  }

  return answer;
}

// * -- bfs 풀이 -- * //

function bfs(matrix, vertex, visited) {
  // - 큐에 먼저 정점을 넣고 enqueue 함수와 dequeue 함수를 정의
  const queue = [vertex];
  const enqueue = (n) => queue.push(n);
  const dequeue = (n) => queue.shift();

  // - 처음 넣었던 정점은 방문했다고 표시
  visited[vertex] = true;

  // - while 문으로 큐 돌리기
  while (queue.length > 0) {
    const now = dequeue();

    // - 현재 정점에서 반복문을 통해 경로 찾기
    for (let i = 0; i < matrix[now].length; i++) {
      // - 방문하지 않았고 경로가 존재한다면 enqueue하고 해당 정점은 방문했다고 표시하기
      if (visited[i] === false && matrix[now][i] === 1) {
        enqueue(i);
        visited[i] = true;
      }
    }
  }
}

// * -- dfs 풀이 -- * //

function dfs(matrix, vertex, visited) {
  // - 처음 넣은 정점은 방문했다고 표시
  visited[vertex] = true;

  // - 현재 정점에서 반복문을 통해 경로 찾기
  for (let i = 0; i < matrix[vertex].length; i++) {
    // - 방문하지 않았다면 재귀를 통해 경로 계속 찾기
    if (!visited[matrix[vertex][i]]) {
      dfs(matrix, matrix[vertex][i], visited);
    }
  }
}
