function solution(s) {
  // TODO: 스택을 이용해서 구현한다.
  // - 받은 문자열을 배열로 바꾼다.
  const arr = s.split("");
  // TODO: 스택을 구현할 배열 설정
  const stack = [];

  for (let el of arr) {
    stack.push(el);

    if (el === ")" && stack[stack.length - 2] === "(") {
      stack.pop();
      stack.pop();
    }
  }
  // - 균형잡인 브라켓이면 스택에 아무것도 없어야함
  return stack.length === 0;
}
