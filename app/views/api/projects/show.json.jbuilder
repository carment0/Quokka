json.extract! @project, :id, :name
json.task_assignees do
  json.array! @project.task_assignees
end
