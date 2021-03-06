class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  helper_method :logged_in?, :current_user

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def login(user)
    @current_user = user
    session[:session_token] = @current_user.reset_session_token
  end

  def logout
    current_user.reset_session_token
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!current_user
  end

  def ensure_logged_in
    render json: ["Invalid credentials"], status: 404 unless logged_in?
  end

end
