module Blog
  class Post < ::ApplicationRecord
    self.table_name = 'posts'

    # belongs_to :user, class_name: 'Auth::User'
  end
end