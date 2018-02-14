class Api::CanvasesController < ApplicationController
  def create
    @canvas = Canvas.new(canvas_params)
    @canvas.owner_id = current_user.id
    if @canvas.save
      render :show
    else
      render json: @canvas.errors.full_messages, status: 422
    end
  end

  def show
    @canvas = current_user.canvases.find_by(id: params[:id])
    render :show
  end

  def index
    @canvases = current_user.canvases
    render :index
  end

  def update
    @canvas = current_user.canvases.find_by(id: params[:id])
    if @canvas.update_attributes(canvas_params)
      render :show
    else
      render json: @canvas.errors.full_messages, status: 422
    end
  end

  def destroy
    @canvas = current_user.canvases.find_by(id: params[:id])
    @canvas.destroy
    render :show
  end

  private

  def canvas_params
    params.require(:canvas).permit(:title, :owner_id)
  end
end
