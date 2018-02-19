class CreateCanvases < ActiveRecord::Migration[5.1]
  def change
    create_table :canvases do |t|
      t.string :title, null: false
      t.integer :owner_id, null: false
      t.timestamps
    end
    add_index :canvases, :owner_id
  end
end
