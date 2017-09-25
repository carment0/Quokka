class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.text :description
      t.boolean :completed, null: false, default: false
      t.integer :admin_id, null: false
      t.date :deadline, null: false
      t.timestamps
    end
    add_index :projects, :admin_id
  end
end
