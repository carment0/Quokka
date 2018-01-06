json.extract! @task, :id, :name, :project_id, :description
json.assignees do
  json.array! @task.assignees
end
