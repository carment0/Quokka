json.array! @tasks do |task|
  json.extract! task, :id, :project_id, :name, :description, :completed, :due_date
  json.assignees task.assignees do |person|
    json.extract! person, :id, :first_name, :last_name
  end
  json.project task.project
end
