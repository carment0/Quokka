class Project < ApplicationRecord
  validates :name, :admin_id, :deadline, presence: true
  validates :completed, inclusion: [true, false]

  belongs_to :admin,
             foreign_key: :admin_id,
             class_name: 'User'

  has_many :tasks

  has_many :task_assignments,
           through: :tasks,
           source: :task_assignments

# { distinct } => no duplicates of the same user when they have multiple tasks assigned in same project
  has_many :task_assignees,
           -> { distinct },
           through: :task_assignments,
           source: :user
end
