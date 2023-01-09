// 기존 데이터와 새로들어온 데이터 비교하여 최신값만 반환 하는 함수
export default function squeezeBuffers(buffer, requestLength) {
  const result = [];
  for (let i = buffer.length - 1; i >= 0; i--) {
    let isExist = false;
    for (let j = 0; j < result.length; j++) {
      if (result[j].code === buffer[i].code) {
        isExist = true;
      } else continue;
    }

    if (!isExist) {
      result.push(buffer[i]);
    } else {
      if (requestLength <= result.length) break;
      else continue;
    }
  }
  return result;
}
