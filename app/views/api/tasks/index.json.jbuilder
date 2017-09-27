json.array!(@projects) do |project|
  json.extract! project, :id, :name
  json.set! :tasks do
    json.array! project.tasks, :id, :name, :description, :completed, :due_date
  end
end
