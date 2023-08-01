"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

function renderCountry(countryObj, className = "") {
  const html = `
      <article class="country ${className}">
      <img class="country__img" src="${countryObj.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${countryObj.name.official}</h3>
        <h4 class="country__region">${countryObj.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +countryObj.population / 1000000
        ).toFixed(2)} million people</p>
        <p class="country__row"><span>🗣️</span>${countryObj.languages.eng}</p>
        <p class="country__row"><span>💰</span>${
          Object.values(countryObj.currencies)[0].name
        }</p>
      </div>
      </article>
    `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
}

function renderError(msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
}

function showCountriesContainer() {
  countriesContainer.style.opacity = 1;
}

// function getCountry(countryName) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${countryName}`);
//   request.send();
//   request.addEventListener("load", () => {
//     const countryObjList = JSON.parse(request.responseText);
//     console.log(countryObjList);
//     countryObjList.forEach((c) => renderCountry(c));
//   });
// }

function getCountry(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => data.forEach((c) => renderCountry(c)));
}

// function getCountryAndNeighbours(countryName) {
//   const request1 = new XMLHttpRequest();
//   request1.open("GET", `https://restcountries.com/v3.1/name/${countryName}`);
//   request1.send();
//   request1.addEventListener("load", () => {
//     const countryObjList = JSON.parse(request1.responseText);
//     console.log(countryObjList);
//     countryObjList.forEach((countryObj) => {
//       renderCountry(countryObj);
//       if (!countryObj.borders) return;
//       for (const neighbourName of countryObj.borders) {
//         const request2 = new XMLHttpRequest();
//         request2.open(
//           "GET",
//           `https://restcountries.com/v3.1/alpha/${neighbourName}`
//         );
//         request2.send();
//         request2.addEventListener("load", () => {
//           const neighbourObjList = JSON.parse(request2.responseText);
//           neighbourObjList.forEach((neighbourObj) =>
//             renderCountry(neighbourObj, "neighbour")
//           );
//         });
//       }
//     });
//   });
// }

// function getCountryAndNeighbours(countryName) {
//   fetch(`https://restcountries.com/v3.1/name/${countryName}`)
//     .then((response1) => {
//       if (!response1.ok)
//         throw new Error(`Country not found (${response1.status})`);
//       return response1.json();
//     })
//     .then((data1) => {
//       renderCountry(data1[0]);
//       if (!data1[0].borders) return;
//       const neighbour = data1[0].borders[0];
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then((response2) => {
//       if (!response2) return [];
//       return response2.json();
//     })
//     .then((data2) => data2.forEach((c2) => renderCountry(c2, "neighbour")))
//     .catch((error1) => renderError(error1.message))
//     .finally(showCountriesContainer);
// }

function fetchObj(url, errMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok)
      throw new Error(`${errMsg} | Error status: (${response.status})`);
    return response.json();
  });
}

async function asyncfetchObj(url, errMsg = "Something went wrong") {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`${errMsg} | Error status: (${response.status})`);
  return await response.json();
}

function getCountryAndNeighbours(countryName) {
  fetchObj(
    `https://restcountries.com/v3.1/name/${countryName}`,
    `Country (${countryName}) not found`
  )
    .then((data1) => {
      renderCountry(data1[0]);
      if (!data1[0].borders) return [];
      const neighbour = data1[0].borders[0];
      return fetchObj(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        `Neighbour (${neighbour}) not found`
      );
    })
    .then((data2) => data2.forEach((c2) => renderCountry(c2, "neighbour")))
    .catch((error1) => renderError(error1.message))
    .finally(showCountriesContainer);
}

// getCountryAndNeighbours("usa");
// getCountryAndNeighbours("australia");
// getCountryAndNeighbours("italy");
// getCountry("australia");

// btn.addEventListener("click", () => {
//   const country = prompt("What country do you want to look up?");
//   getCountryAndNeighbours(country);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1

1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).

2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉

3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'

4. Chain a .catch method to the end of the promise chain and log errors to the console

5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2

6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.

7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

function whereAmI(lat, lng) {
  const geocodeUrl = `https://geocode.xyz/${lat},${lng}?geoit=json`;
  const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

  fetch(nominatimUrl)
    .then((response) => {
      if (!response.ok)
        throw new Error(`${response.statusText} (${response.status})`);
      return response.json();
    })
    .then((data) => {
      if (data.error) throw new Error(`${data.error?.message || data.error}`);
      // return console.log(data.address.city, data.address.country);
      getCountryAndNeighbours(data.address.country);
    })
    .catch((err) => console.warn(err.message));
}

// whereAmI(52.508, 13.381);
// whereAmI(52.508, 13.381 + "xx");
// whereAmI(5.234274, 169.786453);
// whereAmI(-38.096189, 144.881006);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

///////////////////////////////////////
// Lectures

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// btn.addEventListener("click", () =>
//   getPosition().then((pos) =>
//     whereAmI(pos.coords.latitude, pos.coords.longitude)
//   )
// );

// async function asyncWhereAmI() {
//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;

//   const response = await fetch(
//     `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
//   );
//   if (!response.ok) {
//     console.warn(`${response.statusText} (${response.status})`);
//     return;
//   }

//   const data = await response.json();
//   if (data.error) {
//     console.warn(`${data.error?.message || data.error}`);
//     return;
//   }

//   getCountryAndNeighbours(data.address.country);
// }

async function asyncWhereAmI() {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    if (!response.ok)
      throw new Error(
        `Fetch error: ${response.statusText} (${response.status})`
      );

    const data = await response.json();
    if (data.error)
      throw new Error(`Data error: ${data.error?.message || data.error}`);

    getCountryAndNeighbours(data.address.country);

    // return "All done. 😊";
  } catch (err) {
    console.log(err.message);
    // throw err;
  }
}

// console.log("1: Start");
// asyncWhereAmI()
//   .then((result) => console.log(`2: ${result}`))
//   .catch((err) => console.log(`2: ${err}`))
//   .finally(() => console.log("3: Finish"));

btn.addEventListener("click", () => asyncWhereAmI());

async function get3CountriesInSequence(c1, c2, c3) {
  try {
    const [data1] = await fetchObj(
      `https://restcountries.com/v3.1/name/${c1}`,
      `Country (${c1}) not found`
    );
    const [data2] = await fetchObj(
      `https://restcountries.com/v3.1/name/${c2}`,
      `Country (${c2}) not found`
    );
    const [data3] = await fetchObj(
      `https://restcountries.com/v3.1/name/${c3}`,
      `Country (${c3}) not found`
    );
    console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
  } catch (error) {
    console.log(`💥 Boom! : ${error.message}`);
  }
}

async function get3CountriesInParallel(c1, c2, c3) {
  try {
    const dataList = await Promise.all([
      fetchObj(
        `https://restcountries.com/v3.1/name/${c1}`,
        `Country (${c1}) not found`
      ),
      fetchObj(
        `https://restcountries.com/v3.1/name/${c2}`,
        `Country (${c2}) not found`
      ),
      fetchObj(
        `https://restcountries.com/v3.1/name/${c3}`,
        `Country (${c3}) not found`
      ),
    ]);
    console.log(dataList.map((data) => data[0].capital[0]));
  } catch (error) {
    console.log(`💥 Boom! : ${error.message}`);
  }
}

async function getFirstOf3Countries(c1, c2, c3) {
  try {
    const data = await Promise.race([
      fetchObj(
        `https://restcountries.com/v3.1/name/${c1}`,
        `Country (${c1}) not found`
      ),
      fetchObj(
        `https://restcountries.com/v3.1/name/${c2}`,
        `Country (${c2}) not found`
      ),
      fetchObj(
        `https://restcountries.com/v3.1/name/${c3}`,
        `Country (${c3}) not found`
      ),
    ]);
    console.log(data[0].capital[0]);
  } catch (error) {
    console.log(`💥 Boom! : ${error.message}`);
  }
}

function timeout(delay) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request took too long")), delay)
  );
}

async function getCountryWithTimout(c1) {
  try {
    const data = await Promise.race([
      fetchObj(
        `https://restcountries.com/v3.1/name/${c1}`,
        `Country (${c1}) not found`
      ),
      timeout(750),
    ]);
    console.log(data[0].capital[0]);
  } catch (error) {
    console.log(`💥 Boom! : ${error.message}`);
  }
}

// get3CountriesInSequence("nepal", "usa", "new zealand");
// get3CountriesInParallel("nepal", "usa", "new zealand");
// getFirstOf3Countries("nepal", "usa", "new zealand");
// getFirstOf3Countries("japan", "poland", "greece");
// getCountryWithTimout("roman");

// If any are rejected, the promise is rejected!
Promise.all([
  Promise.resolve("Success"),
  Promise.reject("Boo"),
  Promise.resolve("Another seccess"),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// If any are resolved, all are returned.
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Boo"),
  Promise.resolve("Another seccess"),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// If any are resolved, all are returned.
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Boo"),
  Promise.resolve("Another seccess"),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1

TODO: 1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2

TODO: 2. Comsume the promise using .then and also add an error handler;

TODO: 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;

TODO: 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);

TODO: 5. After the second image has loaded, pause execution for 2 seconds again;

TODO: 6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1

TODO: Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2

TODO: 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';

TODO: 2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')

TODO: 3. Check out the 'imgs' array in the console! Is it like you expected?

TODO: 4. Use a promise combinator function to actually get the images from the array 😉

TODO: 5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
