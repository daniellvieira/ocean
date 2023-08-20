Blog::Engine.routes.draw do
  resources :posts do
    member do
      post :dup
      get :new_from_copy
    end
  end
end
