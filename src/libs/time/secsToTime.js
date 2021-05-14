export default function secsToTime(secs) {
  let d = secs / 8.64e4 | 0;
  let H = (secs % 8.64e4) / 3.6e3 | 0;
  let m = (secs % 3.6e3) / 60 | 0;
  let s = secs % 60;
  let z = n => (n < 10 ? '0' : '') + n;
  return `${d}:${z(H)}:${z(m)}:${z(s)}`
}