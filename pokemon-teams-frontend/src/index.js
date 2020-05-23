const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector("main")


document.addEventListener('DOMContentLoaded', ()=> {
    populateTrainers()
})

function populateTrainers(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(getTrainers)
}


function getTrainers(trainers){

    trainers.forEach(trainer => {
        let pokemonString = ""
        trainer.pokemons.forEach(pokemon => {
            pokemonString += `<li>${pokemon.nickname} (${pokemon.species}) <button class= "release" data-pokemon-id= "${pokemon.id}">Release</button></li>`
        })
        document.querySelector("main").innerHTML += `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p><button data-trainer-id="${trainer.id}">Add Pokemon</button><ul>${pokemonString}</ul></div>`
    })
}

document.querySelector("main").addEventListener('click', event => {
    
    if (event.target.dataset.trainerId != undefined){
 
        console.log("adding pokemon...")
        let configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            trainer_id: event.target.dataset.trainerId
          })
        }
        fetch(POKEMONS_URL, configObj)
        .then(r => r.json())
        .then(data => addPokeToDom(data, event))
    }

    if (event.target.dataset.pokemonId != undefined){
        // debugger
        event.target.parentElement.remove()
        fetch(POKEMONS_URL+`/${event.target.dataset.pokemonId}`, {
            method: 'DELETE'
        })
        

    }


})

function addPokeToDom(data, event){
    // debugger
    if (data.message){
        alert(data.message)
    } else {
        // debugger
        mainDiv.children[data.trainer_id-1].lastElementChild.innerHTML += `<li>${data.nickname} (${data.species}) <button class= "release" data-pokemon-id= "${data.id}">Release</button></li>`
    }
}