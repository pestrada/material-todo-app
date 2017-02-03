class AddProgressToList < ActiveRecord::Migration[5.0]
  def change
    add_column :lists, :progress, :decimal, default: 0
  end
end
