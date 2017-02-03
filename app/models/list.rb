class List < ApplicationRecord
  has_many :items, :dependent => :delete_all
  validates :name, presence: true,
                    length: { minimum: 5 }
end
