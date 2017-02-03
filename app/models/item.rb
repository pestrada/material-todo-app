class Item < ApplicationRecord
  belongs_to :list
  validates :name, presence: true,
                    length: { minimum: 5 }
  before_save :update_progress

  private
    def update_progress
      itemCount = self.list.items.length
      completed = self.list.items.count { |item| item.completed == true }
      if itemCount > 0
        self.list.progress = 100 * completed / itemCount
        self.list.save
      end
    end
end
