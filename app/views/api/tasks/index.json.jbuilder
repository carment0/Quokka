@tasks.each do |task|
  json.extract! task, :name, :description, :completed, :project_id, :due_date
  json.set! :task_assignments do
    json.array! task.task_assignments
  end

  json.set! :assignees do
    json.array! task.assignees
  end
end
