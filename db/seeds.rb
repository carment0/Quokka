# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

admin_1 = User.create(name: "Guest User", username: "guestuser", password: "123456")
admin_2 = User.create(name: "Calvin Feng", username: "cfeng", password: "12341234")

user_1 = User.create(name: "Carmen To", username: "cto", password: "123123")
user_2 = User.create(name: "Sam Madison", username: "smadison", password: "qweqwe")


project_description = %Q(
The development of therapeutic proteins requires the understanding of the relationship between the dose, exposure,
efficacy, and toxicity of a moleculeThis is the second line.Several intrinsic and extrinsic factors contribute to the
challenges for measuring therapeutic In addition, induction of an immune response to therapeutic protein results in
additional complexities in the analysis of the pharmacokinetic profile, toxicity, safety, and efficacy of an molecule.
This project is to assess the immunogenicity of a potential therapeutic protein that is required for regulatory license
filings proteins in a precise and accurate manner.
)

project_1 = Project.create(name: "Protein ADS122",
                           description: project_description,
                           completed: false,
                           admin_id: admin_1.id,
                           deadline: "2017-10-01")

project_2 = Project.create(name: "Protein ADS123",
                          description: project_description,
                          completed: false,
                          admin_id: admin_1.id,
                          deadline: "2017-10-02")

project_3 = Project.create(name: "Protein ADS124",
                          description: project_description,
                          completed: false,
                          admin_id: admin_2.id,
                          deadline: "2017-10-03")

task_1 = Task.create(name: "Materials",
                     description: "Request protein",
                     completed: true,
                     project_id: project_1.id,
                     due_date: "2017-09-23")
task_2 = Task.create(name: "Experiment",
                     description: "completed three day PK with ADS122",
                     completed: false,
                     project_id: project_2.id,
                     due_date: "2017-09-26")
task_3 = Task.create(name: "Presentation slides",
                     description: "Prepare slides with summarized data for project meeting discussion",
                     completed: false,
                     project_id: project_3.id,
                     due_date: "2017-10-30")


TaskAssignment.create(user_id: admin_1.id, task_id: task_1.id)
TaskAssignment.create(user_id: admin_1.id, task_id: task_2.id)
TaskAssignment.create(user_id: admin_1.id, task_id: task_3.id)

TaskAssignment.create(user_id: user_1.id, task_id: task_2.id)
TaskAssignment.create(user_id: user_1.id, task_id: task_3.id)

TaskAssignment.create(user_id: user_2.id, task_id: task_1.id)
TaskAssignment.create(user_id: user_2.id, task_id: task_3.id)
