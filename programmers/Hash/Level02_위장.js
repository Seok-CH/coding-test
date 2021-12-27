function solution(clothes) {
  const wearing = {};

  clothes.forEach((cloth) => {
    const [name, type] = cloth;
    if (!wearing[type]) {
      wearing[type] = [name];
    } else wearing[type].push(name);
  });

  let result = 1;
  for (const type in wearing) {
    result *= wearing[type].length + 1;
  }
  return result - 1;
}

// * -- 다른 사람 풀이 -- * //
// - 제일 깔끔하다. Object.values 메소드를
// - 써서 for문을 안 써도 되었다.
function solution(clothes) {
  return (
    Object.values(
      clothes.reduce((obj, t) => {
        obj[t[1]] = obj[t[1]] ? obj[t[1]] + 1 : 1;
        return obj;
      }, {})
    ).reduce((a, b) => a * (b + 1), 1) - 1
  );
}
