class UsersController < ApplicationController
  before_action :redirect_if_logged_in

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      redirect_to :root
    else
      render :new
    end
  end
end
