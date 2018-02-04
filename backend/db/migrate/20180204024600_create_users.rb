class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :google_id, null: false
      t.string :first_name, null: false
      t.string :session_token, null: false
      t.timestamps
    end
  end
end
