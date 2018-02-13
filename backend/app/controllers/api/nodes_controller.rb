class Api::NodesController < ApplicationController
  def create

  end

  def show

  end

  def index

  end

  def update

  end

  def destroy

  end

  private

  def node_params
    params.require(:node).permit(:title, :body, :owner_id)
  end
end
