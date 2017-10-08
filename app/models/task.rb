# == Schema Information
#
# Table name: tasks
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :text
#  completed   :boolean          default(FALSE), not null
#  project_id  :integer          not null
#  due_date    :date
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Task < ApplicationRecord
  validates :name, :project_id, presence: true
  validates :completed, inclusion: [true, false]

  belongs_to :project
  has_many :task_assignments
  has_many :assignees, through: :task_assignments, source: :user

  after_initialize :init
  after_update :broadcast_update
  after_create :broadcast_create
  after_destroy :broadcast_delete

  def init
    self.completed ||= false
  end

  def broadcast_create
    ActionCable.server.broadcast 'tasks',
      status: 'created',
      id: self.id,
      name: self.name,
      description: self.description,
      completed: self.completed,
      due_date: self.due_date,
      project_id: self.project_id
  end

  def broadcast_update
    ActionCable.server.broadcast 'tasks',
      status: 'updated',
      id: self.id,
      name: self.name,
      description: self.description,
      completed: self.completed,
      due_date: self.due_date,
      project_id: self.project_id
  end

  def broadcast_delete
    ActionCable.server.broadcast 'tasks',
      status: 'deleted',
      id: self.id
  end
end
