function solution(m, musicinfos) {
  const result = [];

  musicinfos.forEach((musicinfo) => {
    const [start, end, title, codes] = musicinfo.split(",");
    const playTime = getMinutesDiff(start, end);
    const melody = getMelody(codes);
    const m_melody = getMelody(m);
    const fullMelody = [];

    if (melody.length < playTime) {
      const repeats = Math.floor((playTime - melody.length) / melody.length);
      const rest = (playTime - melody.length) % melody.length;

      for (let i = 0; i <= repeats; i++) {
        fullMelody.push(...melody);
      }
      fullMelody.push(...melody.slice(0, rest));
    } else {
      fullMelody.push(...melody.slice(0, playTime));
    }

    const idxArr = getIndexArr(fullMelody, m_melody[0]);

    if (idxArr.length !== 0) {
      for (let j = 0; j < idxArr.length; j++) {
        const first = idxArr[j];
        let correct = true;
        for (let i = 0; i < m_melody.length; i++) {
          if (m_melody[i] !== fullMelody[i + first]) correct = false;
        }

        if (correct) result.push([title, playTime]);
      }
    }
  });

  return result.length === 0
    ? "(None)"
    : result.sort((a, b) => b[1] - a[1])[0][0];
}

function getIndexArr(arr, code) {
  const result = [];
  let first = arr.indexOf(code);
  while (first !== -1 && first < arr.length) {
    result.push(first);
    first = fullMelody.indexOf(code, first + 1);
  }
  return result;
}

function getMelody(code) {
  const melody = [];

  for (let i = 0; i < code.length; i++) {
    if (code[i] === "#") continue;
    else if (code[i + 1] === "#") melody.push(code[i] + "#");
    else melody.push(code[i]);
  }

  return melody;
}

function getMinutesDiff(start, end) {
  const startDate = new Date(1970, 1, 1, start.slice(0, 2), start.slice(-2));
  const endDate = new Date(1970, 1, 1, end.slice(0, 2), end.slice(-2));

  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / 1000 / 60;
}
