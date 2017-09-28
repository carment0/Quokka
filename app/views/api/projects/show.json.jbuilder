json.extract! @project, :id, :name, :description, :deadline, :completed
json.array! @project.tasks, :name, :description, :completed, :due_date
