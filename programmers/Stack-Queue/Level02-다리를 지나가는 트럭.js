// * -- 내풀이 -- * //

function solution(bridge_length, weight, truck_weights) {
  // TODO: bridge의 상태를 배열로 만들기, 트럭이 없는 곳은 0으로 채우기
  const bridge = new Array(bridge_length).fill(0);
  // TODO: 걸리는 시간과 bridge의 현재 무게에 대한 변수 설정
  let time = 0;
  let bridge_weight = 0;

  // TODO: 다음 트럭이 들어오고 맨 앞의 트럭이 나갈 때 무게 측정용 함수
  function contain(something) {
    return bridge_weight + something - bridge[0];
  }
  // TODO: 다음 트럭이 들어오고 맨 앞의 트럭이 나가는 큐 함수, 무게도 갱신한다
  // TODO: 큐가 한번 실행 될 때 마다 시간이 걸리는 거니까 time변수를 1씩 올린다
  function queue(something = 0) {
    bridge_weight += something - bridge[0];
    bridge.push(something);
    bridge.shift();
    time++;
  }

  // - 대기 중인 트럭이 없을 때 까지 반복
  while (truck_weights.length > 0) {
    // - 다음 트럭이 견딜 수 있는 무게 이하면 큐에 넣는다.
    if (contain(truck_weights[0]) <= weight) {
      const newTruck = truck_weights.shift();
      queue(newTruck);
    }

    // - 아니라면 넣을 수 있도록 계속 이동 시킨다 (0을 계속 넣음)
    while (contain(truck_weights[0]) > weight) {
      queue();
    }
  }

  // - 대기 중인 트럭이 없으면 이제 들어왔던건 모두 비우기 위해서
  // - 다리 무게가 0이 될 때까지 계속 이동시킨다
  while (bridge_weight > 0) {
    queue();
  }
  return time;
}
