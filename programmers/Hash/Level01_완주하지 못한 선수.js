// * -- 첫번째 풀이 -- * //
// ! 정확성 테스트는 통과되지만 효율성 테스트 불합격

function solution(participant, completion) {
  completion.forEach((player) => {
    participant.splice(participant.indexOf(player), 1);
  });
  return participant;
}

// * -- 두번째 풀이 -- * //

// - 이중 반복문을 없애고 객체에 선수 정보를 객체에 저장하여
// - 완주한 선수 목록과 비교하여 빼는 식으로 했다.
function solution(participant, completion) {
  const marathon = participant.reduce((obj, p) => {
    obj[p] = obj[p] ? obj[p] + 1 : 1;
    return obj;
  }, {});

  completion.forEach((p) => {
    marathon[p] -= 1;
  });

  for (let p in marathon) {
    if (marathon[p] === 1) return p;
  }
}
