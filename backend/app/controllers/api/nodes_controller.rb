class Api::NodesController < ApplicationController
  def create
    @node = Node.new(node_params)
    if @node.save
      render :show
    else
      render json: @node.errors.full_messages, status: 422
    end
  end

  def show
    @node = Node.where(id: params[:id])
    render :show
  end

  def index
    @nodes = Node.where(canvas_id: params[:canvas_id])
    render :index
  end

  def update
    @node = Node.where(id: params[:id])
    if @node.update_attributes(node_params)
      render :show
    else
      render json: @node.errors.full_messages, status: 422
    end
  end

  def destroy
    @node = Node.where(id: params[:id])
    @node.destroy
    render :show
  end

  private

  def node_params
    params.require(:node).permit(:title, :body, :owner_id)
  end
end
