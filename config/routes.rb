Rails.application.routes.draw do
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  resources :games, only: [:index]
  resource :highscore, only: [:create]

  root "games#index"
end
