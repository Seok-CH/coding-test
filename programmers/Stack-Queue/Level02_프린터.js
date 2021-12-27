// * -- 내 풀이 -- * //

function solution(priorities, location) {
  const result = [];
  const priorityQueue = priorities.map((priority, idx) => {
    return { key: idx, value: priority };
  });
  const len = priorityQueue.length;

  for (let i = 0; i < len; i++) {
    const copy = priorityQueue.slice();
    const value = priorityQueue.map((priority) => priority.value);
    const max = Math.max(...value);
    const newList = [];
    for (let j = 0; copy[j].value !== max; j++) {
      newList.push(priorityQueue.shift());
    }
    priorityQueue.push(...newList);
    result.push(priorityQueue.shift());
  }

  let order;
  result.forEach((priority, idx) => {
    if (priority.key === location) order = idx + 1;
  });
  return order;
}

// * -- 다른 사람 풀이 -- * //

// ? 풀면서 되게 복잡하게 푼 느낌이라 다른 사람의 풀이를 들고와 봤다

function solution(priorities, location) {
  const arr = priorities.map((priority, index) => {
    return {
      key: index,
      value: priority,
    };
  });

  const queue = [];

  while (arr.length > 0) {
    const firstEl = arr.shift();
    const hasHighPriority = arr.some((el) => el.value > firstEl.value);
    if (hasHighPriority) {
      arr.push(firstEl);
    } else {
      queue.push(firstEl);
    }
  }

  return queue.findIndex((el) => el.key === location) + 1;
}
