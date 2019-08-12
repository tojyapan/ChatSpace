class GroupUser < ApplicationRecord
  has_many :messages
  belongs_to :group
  belongs_to :user
end
