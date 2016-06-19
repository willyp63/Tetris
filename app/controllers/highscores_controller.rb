class HighscoresController < ApplicationController
  def create
    Highscore.create!(score: params[:score], user_id: current_user.id)
    until Highscore.all.length == 5
      Highscore.order(:score).limit(1)[0].destroy
    end
    render json: Highscore.all.to_json
  end
end
