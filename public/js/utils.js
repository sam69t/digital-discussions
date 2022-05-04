function map(num, start1, stop1, start2, stop2) {
  return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function mapClamped(num, start1, stop1, start2, stop2) {
  return map(clamp(num, start1, stop1), start1, stop1, start2, stop2);
}

function clamp(num, min, max) {
  if (min > max) [min, max] = [max, min];
  return Math.min(Math.max(num, min), max);
}
