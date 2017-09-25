@projects.each do |project|
  json.extract! project, :name, :description, :completed, :admin_id, :deadline
  json.set! :task_assignees do
    json.array! project.task_assignees
  end

  json.set! :task_assignments do
    json.array! project.task_assignments
  end

  json.set! :tasks do
    json.array! project.tasks
  end
end
