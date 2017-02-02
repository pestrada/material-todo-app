Rails.application.routes.draw do
  resources :lists do
    resources :items
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'list', to: 'home#show'
  root 'home#index'
end
