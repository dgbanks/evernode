class CreateLinks < ActiveRecord::Migration[5.1]
  def change
    create_table :links do |t|
      t.integer :source_id, null: false
      t.integer :target_id, null: false
      t.text :body
      t.timestamps
    end
  end
end
