Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static_pages#root'
  get 'callback', to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    post 'users/auth', to: 'users#authenticate_user'
    resources :users, only: [:show]
    resource :session, only: [:destroy]
    resources :canvases, only: [:create, :index, :show, :update, :destroy]

    resources :nodes, only: [:create, :index, :show, :update, :destroy]
  end

end
