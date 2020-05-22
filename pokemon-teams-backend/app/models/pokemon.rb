class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :pokemon_count_valid?

  private
  
  def pokemon_count_valid?
    if self.trainer.pokemons.count >= 6 
      self.errors.add(:team_max, "6 Pokemon Max Per Trainer!" )
    end
  end

end
