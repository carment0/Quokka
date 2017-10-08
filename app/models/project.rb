# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :text
#  completed   :boolean          default(FALSE), not null
#  admin_id    :integer          not null
#  deadline    :date             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Project < ApplicationRecord
  after_initialize :init
  validates :name, :admin_id, :deadline, presence: true
  validates :completed, inclusion: [true, false]

  belongs_to :admin,
             foreign_key: :admin_id,
             class_name: 'User'

  has_many :tasks, dependent: :destroy

  has_many :task_assignments,
           through: :tasks,
           source: :task_assignments,
           dependent: :destroy

# { distinct } => no duplicates of the same user when they have multiple tasks assigned in same project
  has_many :task_assignees,
           -> { distinct },
           through: :task_assignments,
           source: :user

  def init
    self.completed ||= false
  end
end
