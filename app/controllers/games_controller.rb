class GamesController < ApplicationController
  before_action :redirect_if_logged_out

  def index
    @highscores = Highscore.all
    render :index
  end
end
