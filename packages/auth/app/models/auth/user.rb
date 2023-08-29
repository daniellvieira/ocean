module Auth
  class User < ApplicationRecord
    self.table_name = 'users'

    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :two_factor_authenticatable, :registerable,
           :recoverable, :rememberable, :validatable
  end
end