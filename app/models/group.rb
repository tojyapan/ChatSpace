class Group < ApplicationRecord
  has_many :group_users
  has_many :users, though: :group_users
  validates :name, presence: true, uniqueness: true
end
