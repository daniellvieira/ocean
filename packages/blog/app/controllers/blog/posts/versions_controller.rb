module Blog
  class Posts::VersionsController < ::ApplicationController
    # GET /posts/versions
    def index
      @post = Post.with_log_data.find(params[:post_id])
      @versions = @post.log_data&.versions&.reverse || []
    end
  end
end
