class Diary::PostsController < ApplicationController
  before_action :set_post, only: %i[show update destroy]

  # GET /diary/posts
  def index
    @posts = Diary::Post.order(created_at: :desc)
  end

  # GET /diary/posts/1
  def show
  end

  # POST /diary/posts
  def create
    @post = Diary::Post.new(post_params)

    if @post.save
      render :show, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /diary/posts/1
  def update
    if @post.update(post_params)
      render :show, status: :ok, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /diary/posts/1
  def destroy
    @post.destroy

    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Diary::Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :body)
    end
end
