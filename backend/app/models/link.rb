class Link < ApplicationRecord
  validates :source, :target, presence: true

  belongs_to :source,
    primary_key: :id,
    foreign_key: :source_id,
    class_name: :Node

  belongs_to :target,
    primary_key: :id,
    foreign_key: :target_id,
    class_name: :Node

end
