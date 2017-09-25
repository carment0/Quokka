class CreateTaskAssignments < ActiveRecord::Migration[5.1]
  def change
    create_table :task_assignments do |t|
      t.integer :user_id, null: false
      t.integer :task_id, null: false
      t.timestamps
    end
    add_index :task_assignments, %i(user_id task_id), unique: true
  end
end
