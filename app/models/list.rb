class List < ApplicationRecord
  has_many :items
  validates :name, presence: true,
                    length: { minimum: 5 }
end
