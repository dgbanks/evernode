class Api::NodesController < ApplicationController
  def create
    @node = Node.new(node_params)
    if @node.save
      if params[:node][:source_id]
        Link.create({source_id: params[:node][:source_id], target_id: @node.id})
      end
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
    @node = Node.find(params[:id])
    if @node.update_attributes(node_params)
      render :show
    else
      render json: @node.errors.full_messages, status: 422
    end
  end

  def destroy
    @node = Node.find(params[:id])
    @node.destroy
    render :show
  end

  private

  def node_params
    params.require(:node).permit(:title, :body, :canvas_id)
  end
end
