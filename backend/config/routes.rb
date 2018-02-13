Rails.application.routes.draw do
  
  get "/auth/oauth2/callback" => "auth0#callback"
  get "/auth/failure" => "auth0#failure"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static_pages#root'
  get 'callback', to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do

    post 'users/auth', to: 'users#authenticate_user'

    resource :session, only: [:destroy]

    resources :users, only: [:show]
  end
end
