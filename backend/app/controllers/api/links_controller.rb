class Api::LinksController < ApplicationController
  def create
    debugger
    @link = Link.new({source_id: params[:source_id], target_id: params[:target_id]})
    if @link.save
      @node = @link.target
      render "api/links/show"
    else
      render json: ["Could not join nodes"], status: 422
    end
  end

  def destroy
    @link = Link.where(source_id: params[:source_id]).find_by(target_id: params[:target_id])
    if @link.destroy
      render json: {}
    else
      render json: ["Could not delete link"], status: 404
    end
  end
end
