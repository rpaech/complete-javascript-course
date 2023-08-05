import { async } from "regenerator-runtime";
import { FETCH_TIMEOUT_DURATION } from "./config";

function timeout(delay) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${delay} ms.`));
    }, delay);
  });
}

export async function fetchObj(url, obj = undefined) {
  try {
    const fetchPr = obj
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
      : fetch(url);
    const response = await Promise.race([
      fetchPr,
      timeout(FETCH_TIMEOUT_DURATION),
    ]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (error) {
    throw error;
  }
}

// export async function fetchObj(url) {
//   try {
//     const response = await Promise.race([
//       fetch(url),
//       timeout(FETCH_TIMEOUT_DURATION),
//     ]);
//     const data = await response.json();

//     if (!response.ok) throw new Error(`${data.message} (${response.status})`);

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function sendObj(url, obj) {
//   try {
//     const response = await Promise.race([
//       fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(obj),
//       }),
//       timeout(FETCH_TIMEOUT_DURATION),
//     ]);
//     const data = await response.json();

//     if (!response.ok) throw new Error(`${data.message} (${response.status})`);

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }
