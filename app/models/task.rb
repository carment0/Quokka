class Task < ApplicationRecord
  validates :name, :project_id, presence: true
  validates :completed, inclusion: [true, false]

  belongs_to :project
  has_many :task_assignments
  has_many :assignees, through: :task_assignments, source: :user
end
