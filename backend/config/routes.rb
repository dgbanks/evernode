Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#root'
  
  get 'callback', to: redirect('/callback'), as: 'callback'
  
  namespace :api, defaults: {format: :json} do
    post 'users/auth', to: 'users#authenticate_user'
    
    # resource :session, only: [:create, :destroy]
    
    resources :users, only: [:show]
  end
end
