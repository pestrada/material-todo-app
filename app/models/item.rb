class Item < ApplicationRecord
  belongs_to :list
  validates :name, presence: true,
                    length: { minimum: 5 }
  before_save :update_progress

  private
    def update_progress
      itemCount = self.list.items.length
      completed = self.list.items.to_a.count { |item| item.completed == true }
      completed += 1 if self.completed && !self.archived
      if completed > 0
        self.list.progress = (completed / itemCount.to_f * 100).ceil
      else
        self.list.progress = 0.0
      end
      self.list.save!
    end
end
