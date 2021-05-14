export default function fetchWithTimeout(url, data, timeout = 5000) {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      reject(new Error("Request timed out"))
    }, timeout);

    fetch(url, data).then(
      response => resolve(response),
      err => reject(err)
    )
      .finally(() => clearTimeout(timer));
  });
}