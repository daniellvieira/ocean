Rails.application.routes.draw do
  root "pages#home"
  get 'pages/home'

  mount RailsEventStore::Browser => '/res' if Rails.env.development?

  mount Auth::Engine => "/auth"
  mount Blog::Engine => "/blog"
  mount Diary::Engine => "/diary"
end
