const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener("DOMContentLoaded", (event) => {
    populateTrainers();
})

function populateTrainers(){
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(data => htmlifyTrainers(data));
}

function htmlifyTrainers(trainerData){
    trainerData.forEach(trainer => {
        const main = document.querySelector("main");
        const div = document.createElement("div");
        const p = document.createElement("p");
        const button = document.createElement("button");
        const ul = document.createElement("ul");

        div.classList.add("card");
        div.setAttribute("data-id", `${trainer.id}`);

        p.innerText = `${trainer.name}`;

        button.setAttribute("data-trainer-id", `${trainer.id}`);
        button.innerText = "Add Pokemon";
        button.addEventListener("click", (event) => {
            addPokemon(event);
        })

        htmlifyPokemonForTrainer(trainer, ul);

        div.appendChild(p);
        div.appendChild(button);
        div.appendChild(ul);
        main.appendChild(div);
    })
}

function htmlifyPokemonForTrainer(trainer, ul){
    trainer.pokemons.forEach(pokemon => {
        const li = document.createElement("li");
        const button = document.createElement("button");

        li.innerText = `${pokemon.nickname} (${pokemon.species})`;
        button.classList.add("release");
        button.setAttribute("data-pokemon-id", `${pokemon.id}`);
        button.innerText = "Release"
        button.addEventListener("click", (event) => {
            releasePokemon(event);
        })

        li.appendChild(button);
        ul.appendChild(li);
    })
}

function addPokemon(event){
    const trainerInfo = {trainer_id: parseInt(event.target.getAttribute("data-trainer-id"))}
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trainerInfo)
    })
        .then(resp => resp.json())
        .then(data => addNewPokemonToTrainerHtml(data))
}

function addNewPokemonToTrainerHtml(pokemon){
    const trainerUl = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`).querySelector("ul")
    const li = document.createElement("li");
    const button = document.createElement("button");

    li.innerText = `${pokemon.nickname} (${pokemon.species})`;
    button.classList.add("release");
    button.setAttribute("data-pokemon-id", `${pokemon.id}`);
    button.innerText = "Release"
    button.addEventListener("click", (event) => {
        releasePokemon(event);
    })

    li.appendChild(button);
    trainerUl.appendChild(li);
}

function releasePokemon(event){
    const pokemonId = event.target.getAttribute("data-pokemon-id")
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE"
    })
    event.target.parentElement.remove()
}

{/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */}