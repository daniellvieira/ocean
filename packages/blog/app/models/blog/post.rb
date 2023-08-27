module Blog
  class Post < ::ApplicationRecord
    self.table_name = 'posts'

    # Versioning
    has_logidze

    belongs_to :user, class_name: '::User'
  end
end