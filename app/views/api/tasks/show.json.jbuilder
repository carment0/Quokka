json.extract! @task, :id, :name, :project_id, :description, :completed, :due_date
json.assignees do
  json.array! @task.assignees
end
