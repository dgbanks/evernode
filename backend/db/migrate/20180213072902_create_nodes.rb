class CreateNodes < ActiveRecord::Migration[5.1]
  def change
    create_table :nodes do |t|
      t.string :title, null: false
      t.text :body
      t.integer :canvas_id, null: false
      t.timestamps
    end
    add_index :nodes, :canvas_id
  end
end
