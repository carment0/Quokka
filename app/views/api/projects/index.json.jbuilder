json.array!(@projects) do |project|
  json.extract! project, :name, :description, :completed, :admin_id, :deadline
  json.set! :task_assignees do
    json.array! project.task_assignees, :id, :name
  end
end
