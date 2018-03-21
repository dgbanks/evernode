class Node < ApplicationRecord
  validates :title, :canvas_id, presence: true

  belongs_to :canvas,
    primary_key: :id,
    foreign_key: :canvas_id,
    class_name: :Canvas

  has_many :links,
    primary_key: :id,
    foreign_key: :source_id,
    class_name: :Link,
    dependent: :destroy

  has_many :links_to,
    primary_key: :id,
    foreign_key: :target_id,
    class_name: :Link,
    dependent: :destroy
end
