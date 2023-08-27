Blog::Engine.routes.draw do
  resources :posts do
    member do
      post :dup
      get :new_from_copy
    end

    scope module: 'posts' do
      resources :versions, only: %w(index)
    end
  end
end
