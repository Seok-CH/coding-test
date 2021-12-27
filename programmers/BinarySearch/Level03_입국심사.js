// * -- 첫번째 풀이 -- * //

// ! 정답은 나온다. 다만 메모리 한계라고 뜬다
// ! 그리고 이진탐색으로 풀지도 않았기 때문에 다시 풀어야 한다.

function solution(n, times) {
  const immigration = [];

  times.forEach((time) => {
    for (let i = 1; i <= n; i++) {
      immigration.push(time * i);
    }
  });

  return immigration.sort((a, b) => a - b)[n - 1];
}

// * -- 두번째 풀이 -- * //

function solution(n, times) {
  times.sort((a, b) => a - b);

  let left = 1;
  let right = n * times[times.length - 1];
  let answer = right; // 최대값.

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let count = 0;

    times.forEach((value) => {
      count += Math.floor(mid / value);
    });

    if (count >= n) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return answer;
}

solution(4, [2, 5, 7, 9]);
