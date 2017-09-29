json.array! @assigned_tasks do |task|
  json.extract! task, :name, :description, :completed, :due_date
  json.assignees task.assignees do |person|
    json.extract! person, :id, :name
  end
  json.project task.project
end
