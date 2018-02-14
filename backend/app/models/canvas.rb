class Canvas < ApplicationRecord
  validates :title, :owner_id, presence: true

  belongs_to :owner,
    primary_key: :id,
    foreign_key: :owner_id,
    class_name: :User

  has_many :nodes,
    primary_key: :id,
    foreign_key: :canvas_id,
    class_name: :Node,
    dependent: :destroy

  after_initialize :create_title_node

  def create_title_node
    Node.create({title: self.title, canvas_id: self.id})
  end
end
