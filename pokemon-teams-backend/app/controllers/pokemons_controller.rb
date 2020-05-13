# frozen_string_literal: true

class PokemonsController < ApplicationController
  def create
    pokemon = create_pokemon
    render json: pokemon, except: %i[created_at updated_at] if pokemon.save
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    render json: pokemon, except: %i[created_at updated_at] if pokemon.destroy
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end

  def create_pokemon
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.new(nickname: name, species: species, trainer_id: pokemon_params['trainer_id'])
  end
end
