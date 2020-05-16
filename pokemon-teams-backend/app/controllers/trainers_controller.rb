class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers, include: [:pokemons]
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    if trainer
      render json: trainer, include: [:pokemons]
    else
      render json: { message: "Could not find a trainer with that ID" }
    end
  end
end
