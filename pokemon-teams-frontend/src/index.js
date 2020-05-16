const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener('DOMContentLoaded', () => {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => renderTrainers(data))
})

function renderTrainers(data) {
  data.forEach(trainer => trainerCard(trainer));
}

function trainerCard(trainer) {
  let divCard = document.createElement('div')
  divCard.className = 'card'
  divCard.setAttribute('data-id', trainer.id)

  let pName = document.createElement('p')
  pName.textContent = trainer.name

  let button = document.createElement('button')
  button.addEventListener('click', createPokemon)
  button.setAttribute('data-trainer-id', trainer.id)
  button.textContent = 'Add pokemon'
  divCard.appendChild(pName)
  divCard.appendChild(button)

  let pokeList = pokeCard(divCard, trainer.pokemons)

  document.querySelector('main').appendChild(divCard)
}

function pokeCard(card, pokes) {
  let pokeList = document.createElement('ul')
  for (const poke of pokes) {
    let pokeItem = document.createElement('li')
    pokeItem.textContent = `${poke.nickname} (${poke.species})`
    let newbtn = document.createElement('button')
    newbtn.addEventListener('click', releasePokemon)
    newbtn.setAttribute('data-pokemon-id', poke.id)
    newbtn.className = 'release'
    newbtn.textContent = 'Release'

    pokeItem.appendChild(newbtn)
    pokeList.appendChild(pokeItem) 
    card.appendChild(pokeList)
  };
  return card
}

function releasePokemon(event) {
  let pokeid = event.target.getAttribute('data-pokemon-id') 
  let deleteConfig = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "pokemon_id": pokeid })
  };
  fetch(`${POKEMONS_URL}/${pokeid}`, deleteConfig)
    .then(response => response.json())
    .then(() => {
      event.target.parentElement.remove()
    })
}

function createPokemon(event) {
  if (event.target.parentElement.querySelectorAll('li').length < 6) {
    let postConfig = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "trainer_id": event.target.getAttribute('data-trainer-id') })
    };
    fetch(POKEMONS_URL, postConfig)
      .then(response => response.json())
      .then((data) => {
        let pokeItem = document.createElement('li')
        pokeItem.textContent = `${data.nickname} (${data.species})`
        let newbtn = document.createElement('button')
        newbtn.addEventListener('click', releasePokemon)
        newbtn.setAttribute('data-pokemon-id', data.id)
        newbtn.className = 'release'
        newbtn.textContent = 'Release'
        pokeItem.appendChild(newbtn)
        event.target.parentElement.querySelector('ul').appendChild(pokeItem)
      })
      .catch(error => console.log(error))
  }
  else {
    console.log('too many already')
  }
}

{/* <div class="card" data-id="1"><p>Prince</p> */}
{/*   <button data-trainer-id="1">Add Pokemon</button> */}
{/*   <ul> */}
{/*     <li>Jacey (Kakuna) <button class="release" data-wpokemon-id="140">Release</button></li> */}
{/*     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li> */}
{/*     <li>Mittie (Farfetch'd) <button class="waddrelease" data-pokemon-id="149">Release</button></li> */}
{/*     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li> */}
{/*     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li> */}
{/*   </ul> */}
{/* </div> */}
