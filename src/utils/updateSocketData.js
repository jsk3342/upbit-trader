import { cloneDeep } from 'lodash';

//데이터 전송 전 버퍼가 있고 새로운 데이터 추가하여 최신화 후 값 리턴하는 함수
export default function updateSocketData(origininalData, newData) {
  const copyOriginal = cloneDeep(origininalData);
  const copyNew = cloneDeep(newData);

  for (let i = 0; i < copyOriginal.length; i++) {
    const target = copyOriginal[i];
    for (let j = 0; j < newData.length; j++) {
      if (target.code === newData[j].code) {
        copyOriginal[i] = newData[j];
        copyNew[j] = null;
        break;
      } else continue;
    }
  }

  // 원본 데이터에 없는 market 데이터가 새롭게 받은 데이터에 존재하는 case
  const remainNew = copyNew.filter((element) => element !== null);
  if (remainNew.length > 0) {
    copyOriginal.push(...remainNew);
  }
  return copyOriginal;
}
