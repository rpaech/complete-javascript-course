"use strict";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class Workout {
  date = new Date();
  id = new Date().getTime() + "-" + Math.random().toString(16).slice(2);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.description =
      `${this.type[0].toUpperCase()}${this.type.slice(1)}` +
      " on " +
      `${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this._getLocalStorage();
    this._getPosition();
    form.addEventListener("submit", (e) => this._newWorkout(e));
    inputType.addEventListener("change", (e) => this._toggleElevationField(e));
    containerWorkouts.addEventListener("click", (e) => this._moveToPopup(e));
  }

  _moveToPopup(e) {
    const workoutElmt = e.target.closest(".workout");

    if (!workoutElmt) return;

    const workout = this.#workouts.find((w) => w.id === workoutElmt.dataset.id);
    this.#map.setView(workout.coords, 13, {
      animate: true,
      pan: { duration: 1 },
    });
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (e) => {
          this._loadMap(e);
          this._loadWorkouts();
        },
        () => alert("Could not get your position.")
      );
    }
  }

  _loadWorkouts() {
    for (const w of this.#workouts) {
      this._renderWorkout(w);
      this._renderWorkoutMarker(w);
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    this.#map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", (e) => this._showForm(e));
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value = "";
    inputDuration.value = "";
    inputCadence.value = "";
    inputElevation.value = "";

    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    const areNumbers = (...inputs) =>
      inputs.every((input) => Number.isFinite(input));
    const arePositiveNumbers = (...inputs) =>
      inputs.every((input) => Number.isFinite(input) && input > 0);

    e.preventDefault();

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    let workout;
    switch (type) {
      case "running":
        const cadence = +inputCadence.value;
        if (!arePositiveNumbers(distance, duration, cadence))
          return alert(
            "Your distance, duration and cadence need to be positive numbers."
          );
        workout = new Running([lat, lng], distance, duration, cadence);
        break;
      case "cycling":
        const elevation = +inputElevation.value;
        if (!arePositiveNumbers(distance, duration))
          return alert(
            "Your distance and duration need to be positive numbers."
          );
        if (!areNumbers(elevation))
          return alert("Your elevation needs to be a number.");
        workout = new Cycling([lat, lng], distance, duration, elevation);
        break;
      default:
        return alert(`The workout type ${type} isn't valid`);
        break;
    }

    this.#workouts.push(workout);
    this._renderWorkoutMarker(workout);
    this._renderWorkout(workout);
    this._hideForm();
    this._setLocalStorage();
  }

  reset() {
    localStorage.removeItem("workouts");
    location.reload();
  }

  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = localStorage.getItem("workouts");

    if (!data) return;

    this.#workouts = JSON.parse(data);
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    const html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">
              ${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}
            </span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">
              ${Number(
                workout.type === "running" ? workout.pace : workout.speed
              ).toFixed(2)}
            </span>
            <span class="workout__unit">
              ${workout.type === "running" ? "min/km" : "km/h"}
            </span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">
              ${workout.type === "running" ? "🦶🏼" : "⛰"}
            </span>
            <span class="workout__value">
              ${
                workout.type === "running"
                  ? workout.cadence
                  : workout.elevationGain
              }
            </span>
            <span class="workout__unit">
              ${workout.type === "running" ? "spm" : "m"}
            </span>
          </div>
        </li>
      `;

    form.insertAdjacentHTML("afterend", html);
  }
}

const app = new App();
