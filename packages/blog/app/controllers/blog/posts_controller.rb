module Blog
  class PostsController < ::ApplicationController
    before_action :set_post, only: %i[ show edit update destroy dup new_from_copy ]

    # GET /posts or /posts.json
    def index
      @posts = Post.all.order(id: :desc)
    end

    # GET /posts/1 or /posts/1.json
    def show
    end

    # GET /posts/new
    def new
      @post = Post.new(
        title: Faker::Lorem.word,
        body: Faker::Lorem.paragraph
      )
    end

    # GET /posts/1/edit
    def edit
    end

    # POST /posts or /posts.json
    def create
      @post = Post.new(post_params)
      @post.user = current_user

      respond_to do |format|
        if @post.save
          format.html { redirect_to post_url(@post), notice: "Post was successfully created." }
          format.json { render :show, status: :created, location: @post }
        else
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /posts/1 or /posts/1.json
    def update
      respond_to do |format|
        if @post.update(post_params)
          format.html { redirect_to post_url(@post), notice: "Post was successfully updated." }
          format.json { render :show, status: :ok, location: @post }
        else
          format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /posts/1 or /posts/1.json
    def destroy
      @post.destroy

      respond_to do |format|
        format.html { redirect_to posts_url, notice: "Post was successfully destroyed." }
        format.json { head :no_content }
      end
    end

    def dup
      @new_post = @post.dup
      @new_post.title = @new_post.title + " (copy)(#{Time.now.strftime('%Y-%m-%d %H:%M:%S')})"

      respond_to do |format|
        if @new_post.save
          format.turbo_stream
          format.html { redirect_to post_url(@new_post), notice: "Post was successfully duplicated." }
          format.json { render :show, status: :ok, location: @new_post }
        else
          format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @new_post.errors, status: :unprocessable_entity }
        end
      end
    end

    def new_from_copy
      @post = @post.dup
      render :new
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :body)
      end
  end
end