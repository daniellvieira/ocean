Auth::Engine.routes.draw do
  root to: redirect { Rails.application.routes.url_helpers.root_path }

  devise_for :users, class_name: 'Auth::User', module: :devise, controllers: {
    registrations: 'auth/users/registrations',
    sessions: 'auth/users/sessions'
  }
  # Devise TwoFactor Authentication
  get 'enable_otp_show_qr', to: 'users#enable_otp_show_qr', as: :enable_otp_show_qr
  post 'enable_otp_verify', to: 'users#enable_otp_verify', as: :enable_otp_verify
  get 'users/otp', to: 'users#show_otp', as: :user_otp
  post 'users/otp', to: 'users#verify_otp', as: :verify_user_otp
  post 'verify_otp', to: 'users#sessions/verify_otp'
end
