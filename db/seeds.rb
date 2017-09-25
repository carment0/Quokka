# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: "Guest User", username: "guestuser", password: "123456")

admin = User.create(name: "Calvin Feng", username: "cfeng", password: "12341234")
user_1 = User.create(name: "Carmen To", username: "cto", password: "123123")
user_2 = User.create(name: "Sam Madison", username: "smadison", password: "qweqwe")

project_1 = Project.create(name: "Protein ADS122",
                           description: "Exploring the efficacy of ADS122",
                           completed: false,
                           admin_id: admin.id,
                           deadline: "2017-10-01")

task_1 = Task.create(name: "Materials",
                     description: "Request protein",
                     completed: true,
                     project_id: project_1.id,
                     due_date: "2017-09-23")
task_2 = Task.create(name: "Experiment",
                     description: "completed three day PK with ADS122",
                     completed: false,
                     project_id: project_1.id,
                     due_date: "2017-09-26")
task_3 = Task.create(name: "Presentation slides",
                     description: "Prepare slides with summarized data for project meeting discussion",
                     completed: false,
                     project_id: project_1.id,
                     due_date: "2017-10-30")

assignment_1 = TaskAssignment.create(user_id: user_2.id, task_id: task_1.id)
assignment_2 = TaskAssignment.create(user_id: user_1.id, task_id: task_2.id)
assignment_3 = TaskAssignment.create(user_id: user_2.id, task_id: task_2.id)
assignment_4 = TaskAssignment.create(user_id: user_1.id, task_id: task_3.id)

# 5 seeds
# 6 util/actions
# 7 reducers
# 10 container
# 12 components
