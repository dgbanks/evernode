class Link < ApplicationRecord
  validates :source_id, :target_id, presence: true

  # must use has_one and not belongs_to because a link should be
  # destroyed if EITHER the source OR the target is destroyed!

  has_one :source,
    primary_key: :id,
    foreign_key: :source_id,
    class_name: :Node,
    dependent: :destroy

  has_one :target,
    primary_key: :id,
    foreign_key: :target_id,
    class_name: :Node,
    dependent: :destroy
end
