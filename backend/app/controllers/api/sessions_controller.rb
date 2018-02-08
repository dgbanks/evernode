class Api::SessionsController < ApplicationController

  def destroy
    @user = current_user
    logout
    render "api/users/show"
  end

end
