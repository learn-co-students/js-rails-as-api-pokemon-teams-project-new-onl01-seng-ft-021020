class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    if trainer
      new_poke = trainer.pokemons.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
      render json: new_poke if new_poke.valid?
    else
      render json: { error: "Could not find a trainer with that ID" }
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:pokemon_id])
    pokemon.delete
    render json: { message: "Pokemon deleted" } 
  end
end
