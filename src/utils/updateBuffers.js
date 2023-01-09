export default function updateBuffers(originalBuffers, sortBy) {
  const result = [];
  for (let i = 0; i < sortBy.length; i++) {
    const targetCode = sortBy[i].market;
    for (let j = 0; j < originalBuffers.length; j++) {
      if (targetCode === originalBuffers[j].code) {
        result.push(originalBuffers[j]);
        break;
      } else continue;
    }
  }
  return result;
}
