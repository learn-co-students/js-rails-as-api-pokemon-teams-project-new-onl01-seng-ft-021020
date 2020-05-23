class PokemonsController < ApplicationController
    def create
        # byebug
        trainer = Trainer.find_by(id: params[:trainer_id])
        if trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])
            pokemon.save
            # byebug
            render json: pokemon
        else 
            render json: {
                message: "Team can only have 6 Pokemon."
            }
        end 
    end 

    def destroy 
        # byebug
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end 
end
