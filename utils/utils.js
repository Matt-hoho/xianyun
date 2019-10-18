export function computeTime(dep_time, arr_time) {
  if (!dep_time || !arr_time) return;
  const depTime = dep_time.split(":");
  const arrTime = arr_time.split(":");

  if (arrTime[0] < depTime[0]) {
    arrTime[0] += 24;
  }

  const start = depTime[0] * 60 + +depTime[1];
  const end = arrTime[0] * 60 + +arrTime[1];

  const rankTime = end - start;

  const hours = Math.floor(rankTime / 60);

  const min = rankTime % 60;
  return `${hours}小时${min}分钟`;
}
