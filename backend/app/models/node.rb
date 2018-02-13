class Node < ApplicationRecord
  validates :title, :canvas_id, presence :true

  belongs_to :canvas,
    primary_key: :id,
    foreign_key: :canvas_id,
    class_name: :Canvas
end
