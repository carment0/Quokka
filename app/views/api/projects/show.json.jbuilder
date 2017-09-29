json.extract! @project, :id, :name, :description, :deadline, :completed
json.tasks @project.tasks do |task|
   json.extract! task, :name, :description, :completed, :due_date
   json.set! :assignees do
     json.extract! task.assignees, :name
   end
end
