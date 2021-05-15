export default function secsToTime(secs) {
  const z = n => (n < 10 ? '0' : '') + n;
  return {
    days: z(secs / 8.64e4 | 0),
    hours: z((secs % 8.64e4) / 3.6e3 | 0),
    minutes: z((secs % 3.6e3) / 60 | 0),
    seconds: z(secs % 60)
  }
}