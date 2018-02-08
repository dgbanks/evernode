class Api::UsersController < ApplicationController
  def authenticate_user
    debugger
    @user = User.find_by_google_id(user_params[:google_id])
    unless @user
      @user = User.new(user_params)
      @user.save!
    end
    login(@user)
    render :show
  end

  def callback
    debugger
  end

  def show

  end

  private

  def user_params
    params.require(:user).permit(:google_id, :first_name)
  end
end
