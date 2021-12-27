function solution(new_id) {
  // - 원하는 형태의 아이디를 위한 정규표현식들
  const regExp1 = /^[-_a-z0-9][-_a-z0-9.]{1,13}[-_a-z0-9]$/;
  const regExp2 = /\.{2,}/;
  // - rule 모음집
  const ruleBook = [rule1, rule2, rule3, rule4, rule5, rule6, rule7];
  // - 정규표현식을 통과 못하면 rule대로 설정하여 추천 아니면 그대로 반환
  if (!(regExp1.test(new_id) && !regExp2.test(new_id))) {
    return ruleBook.reduce((temp, rule) => rule(temp), new_id);
  } else return new_id;
}

// - 일치하는 대문자를 소문자로 바꾸는 함수
function rule1(id) {
  return id.replace(/[A-Z]/g, (str) => str.toLowerCase());
}
// - 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.) 를 제외한 문자 제거
function rule2(id) {
  return id.replace(/[^-_a-z0-9.]/g, "");
}
// - 연속된 마침표를 하나로 줄이는 함수
function rule3(id) {
  return id.replace(/\.{2,}/g, ".");
}
// - 양 끝의 마침표를 없애는 함수
function rule4(id) {
  return id.replace(/^[.]|[.]$/g, "");
}
// - 빈문자열이면 a를 반환하는 함수
function rule5(id) {
  return id === "" ? "a" : id;
}
// - 16자 이상이면 15자로 줄이고 끝에 마침표가 있다면 없애는 함수
function rule6(id) {
  return id.length >= 16 ? id.slice(0, 15).replace(/[.]$/g, "") : id;
}
// - 3자 미만이면 3자가 될 때까지 맨 끝의 문자 이어 붙이기
function rule7(id) {
  return id.length <= 2 ? id + id[id.length - 1].repeat(3 - id.length) : id;
}
