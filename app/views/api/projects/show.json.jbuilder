json.extract! @project, :id, :name, :description, :deadline, :completed, :admin_id
json.tasks @project.tasks do |task|
   json.extract! task, :id, :name, :description, :completed, :due_date
   json.set! :assignees do
     json.array! task.assignees do |assignee|
        json.extract! assignee, :id, :first_name, :last_name, :position
     end
   end
end
