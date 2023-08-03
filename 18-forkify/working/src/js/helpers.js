import { FETCH_TIMEOUT_DURATION } from "./config";

function timeout(delay) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${delay} ms.`));
    }, delay);
  });
}

export async function fetchObj(url) {
  try {
    const response = await Promise.race([
      fetch(url),
      timeout(FETCH_TIMEOUT_DURATION),
    ]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (error) {
    throw error;
  }
}
