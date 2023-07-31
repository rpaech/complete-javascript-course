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

function getCountryAndNeighbours(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response1) => response1.json())
    .then((data1) => {
      renderCountry(data1[0]);
      if (!data1[0].borders) return;
      const neighbour = data1[0].borders[0];
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response2) => {
      if (!response2) return [];
      return response2.json();
    })
    .then((data2) => data2.forEach((c2) => renderCountry(c2, "neighbour")));
}

// getCountryAndNeighbours("usa");
getCountryAndNeighbours("australia");
// getCountryAndNeighbours("italy");
// getCountry("australia");
