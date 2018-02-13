class User < ApplicationRecord
  validates :google_id, :first_name, :session_token, presence: true

  after_initialize :generate_session_token


  has_many :canvases,
    primary_key: :id,
    foreign_key: :owner_id,
    class_name: :Canvas

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def generate_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
