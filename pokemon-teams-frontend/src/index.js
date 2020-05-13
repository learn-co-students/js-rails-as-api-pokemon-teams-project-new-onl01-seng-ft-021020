const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector("main");

fetch(TRAINERS_URL)
  .then((response) => response.json())
  .then((json) => {
    for (const trainer of json) {
      renderTrainers(trainer);
    }
  })
  .catch((error) =>{ alert("sorry an Error has ocurred"); console.warn(error)});

main.addEventListener("click", function delegatedClick(event) {
  if (event.target.innerText == "Add Pokemon") {
    renderNewPokemon(event);
  }
  if (event.target.innerText == "Release") {
    deletePokemon(event);
  }
});

function deletePokemon(event) {
  let pokemonId = event.target.dataset.pokemonId;
  configurationObject = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ id: pokemonId }),
  };

  return fetch(`${POKEMONS_URL}/${pokemonId}`, configurationObject)
    .then(() => event.target.parentElement.remove())
    .catch((error) => console.log(error));
}

function createNewPokemon(trainerId) {
  // function than return a  promise with the data as LI element
  configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ trainer_id: trainerId }),
  };

  return fetch(POKEMONS_URL, configurationObject)
    .then((response) => response.json())
    .then((json) => renderPokemon(json))
    .catch((error) => console.log(error));
  // promise when resolve will return a LI as string
}

function renderNewPokemon(event) {
  // add to the DOM on event UL in async way the Li return by CreateNewPokemon
  let trainerId = event.target.dataset.trainerId;
  let ul = event.target.nextElementSibling;
  render();

  async function render() {
    let newPokemon = await createNewPokemon(trainerId);
    ul.innerHTML += newPokemon;
  }
}

function renderTrainers({ id, name, pokemons } = {}) {
  template = `
    <div class="card" data-id=${id}><p>${name}</p>
      <button data-trainer-id=${id}>Add Pokemon</button>
      <ul>
        ${pokemons.map(renderPokemon).join("")}
      </ul>
    </div>
  `;
  main.innerHTML += template;
}

function renderPokemon({ species, id, nickname }) {
  return `<li> ${nickname} (${species}) <button class="release" data-pokemon-id="${id}">Release</button></li>`;
}
