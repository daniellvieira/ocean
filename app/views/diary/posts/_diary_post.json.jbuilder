json.extract! diary_post, :id, :title, :body, :created_at, :updated_at
json.url diary_post_url(diary_post, format: :json)
