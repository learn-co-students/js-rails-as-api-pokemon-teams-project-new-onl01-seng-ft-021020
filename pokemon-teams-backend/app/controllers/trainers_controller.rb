# frozen_string_literal: true

class TrainersController < ApplicationController
  def index
    trainers = Trainer.all

    render json: trainers,
           except: %i[created_at updated_at],
           include: { pokemons: { except: %i[created_at updated_at] } }
  end
end
