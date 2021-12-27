function solution(records) {
  const id = {};
  const result = [];

  records.forEach((record) => {
    const [action, uid, name] = record.split(" ");
    if (action === "Enter" || action === "Change") id[uid] = name;
  });

  records.forEach((record) => {
    const [action, uid] = record.split(" ");

    if (action === "Enter") result.push(`${id[uid]}님이 들어왔습니다.`);
    if (action === "Leave") result.push(`${id[uid]}님이 나갔습니다.`);
  });

  return result;
}
