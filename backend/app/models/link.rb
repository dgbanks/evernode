class Link < ApplicationRecord
  validates :source_id, :target_id, presence: true

  # belongs_to :source,
  #   primary_key: :id,
  #   foreign_key: :source_id,
  #   class_name: :Node

  # has_one :source,
  #   primary_key: :id,
  #   foreign_key: :source_id,
  #   class_name: :Node,
  #   dependent: :destroy

  has_one :target,
    primary_key: :id,
    foreign_key: :target_id,
    class_name: :Node,
    dependent: :destroy
end
