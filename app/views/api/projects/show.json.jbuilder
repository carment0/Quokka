json.extract! @project, :id, :name, :deadline, :completed
json.tasks do
  json.array! @project.tasks
end
json.task_assignees do
  json.array! @project.task_assignees
end
