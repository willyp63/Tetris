class SessionsController < ApplicationController
  before_action :redirect_if_logged_in, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    user = User.find_by_credentials(params[:user][:username],
      params[:user][:password])
    if user
      log_in!(user)
      redirect_to :root
    else
      @user = User.new(user_params)
      flash.now[:errors] = ["Invalid Username/Password"]
      render :new
    end
  end

  def destroy
    log_out!
    redirect_to new_session_url
  end
end
