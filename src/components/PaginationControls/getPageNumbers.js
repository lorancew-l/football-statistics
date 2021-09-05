export default function getPagesNumbers(current, total, max) {
  const left = Math.floor(current / max) * max;
  const right = left + max > total ? total - left : max;

  return Array.from({ length: right }, (_, i) => i + left);
}
