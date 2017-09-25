class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description
      t.boolean :completed, null: false, default: false
      t.integer :project_id, null: false
      t.date :due_date
      t.timestamps
    end
    add_index :tasks, :project_id
  end
end
