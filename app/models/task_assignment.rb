# == Schema Information
#
# Table name: task_assignments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  task_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

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
