json.extract! @project, :id, :name, :description, :deadline, :completed, :admin_id
json.tasks @project.tasks do |task|
   json.extract! task, :name, :description, :completed, :due_date
   json.set! :assignees do
     json.array! task.assignees do |assignee|
        json.extract! assignee, :name, :username
     end
   end
end
