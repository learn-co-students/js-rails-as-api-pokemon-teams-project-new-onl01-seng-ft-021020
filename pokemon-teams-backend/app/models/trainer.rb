class Trainer < ApplicationRecord
    has_many :pokemons
    # validate :trainer_team_maxed?
    # def trainer_team_maxed? 
    #     if self.pokemons.count >= 6 
    #         self.errors.add(team_limt: "Cannot exceed 6 Pokemon per team!")
    #     end
    # end
end
