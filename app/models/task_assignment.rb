class TaskAssignment < ApplicationRecord
  validates :task_id, :user_id, presence: true
  validates :task_id,
            uniqueness: {
              scope: :user_id,
              message: "cannot assign same task to the same person"
            }

  belongs_to :user
  belongs_to :task
end
