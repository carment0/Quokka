json.array!(@projects) do |project|
  json.extract! project, :id, :name, :description, :completed, :admin_id, :deadline
  json.set! :task_assignees do
    json.array! project.task_assignees, :id, :first_name, :last_name
  end
  json.tasks project.tasks
end
