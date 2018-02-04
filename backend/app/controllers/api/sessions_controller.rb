class Api::SessionsController < ApplicationController
  def authenticate_user
    debugger
    @user = User.find_by_google_id(user_params[:googleId])
    unless @user
      @user = User.new(user_params)
      @user.save!
    end
    login(@user)
  end
  
  def destroy
    
  end
  
  private
  
  def user_params
    params.require(:user).permit(:googleId, :first_name)
  end
end
