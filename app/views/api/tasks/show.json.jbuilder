json.extract! @task, :id, :name
json.assignees do
  json.array! @task.assignees
end
