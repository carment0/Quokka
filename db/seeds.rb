require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

admin_1 = User.create(name: "Guest User", username: "guestuser", password: "123456")
admin_2 = User.create(name: "Calvin Feng", username: "cfeng", password: "12341234")

8.times do
  fname = Faker::Name.first_name
  lname = Faker::Name.last_name
  User.create!(
    name: "#{fname}".concat(" #{lname}"),
    username: "#{fname}".concat("#{lname}"),
    password: "password"
  )
end

description_1 = %Q(
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus massa posuere urna
  euismod accumsan. Sed leo eros, congue nec volutpat malesuada, interdum sit amet metus. Nam tempor
  dui quis lorem accumsan, eget varius risus gravida. Morbi molestie turpis et laoreet malesuada.
  Pellentesque malesuada vehicula ex. Curabitur commodo vehicula commodo. Duis nec sem bibendum,
  pulvinar arcu vel, scelerisque justo. Nunc eu posuere diam, quis scelerisque massa. Ut vel
  consequat leo. Vivamus condimentum ligula et eros aliquet commodo. Mauris in metus egestas,
  accumsan ipsum fringilla, ultrices tortor. Nunc euismod lacus ut enim molestie, ut suscipit
  libero tincidunt. Pellentesque at pulvinar urna. Nulla suscipit erat eget sapien lacinia, at
  pretium ligula venenatis. Morbi ut lacus vel lacus dignissim tempor.
)
description_2 = %Q(
In ligula dolor, suscipit ut odio sit amet, feugiat ultrices ex. Sed commodo augue id dolor
rutrum, sed elementum nisi laoreet. Integer eu ante commodo, sodales tortor ultrices, laoreet
sem. Morbi vel orci eu tellus scelerisque facilisis at in felis. Vivamus faucibus mauris eu
justo luctus ullamcorper. Nullam interdum accumsan elit vel faucibus. Pellentesque facilisis
est ligula, eget viverra libero cursus et. Aliquam erat volutpat. In eu eros justo. Etiam ac
finibus nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mi enim, varius
quis velit nec, aliquam consectetur eros. Lorem ipsum dolor sit amet, consectetur adipiscing
elit. Praesent lacinia venenatis lorem ut tincidunt. Aenean a molestie est, sit amet vulputate
tortor. Phasellus aliquet purus et nunc porta viverra.
)
description_3 = %Q(
Morbi quis efficitur enim. Suspendisse nunc dui, sagittis vitae elit nec, imperdiet tristique
elit. Suspendisse at felis sit amet tortor tincidunt consequat ac et nisl. Aliquam in aliquet
sem, in sagittis justo. Donec tincidunt justo lorem. Sed gravida lorem urna, id fermentum eros
posuere ac. Aliquam eget nibh turpis. Ut efficitur elit ut risus volutpat auctor. Cras vitae
quam at justo laoreet mollis. Proin auctor vestibulum velit, nec blandit dui efficitur non.
Sed id turpis tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
malesuada mauris purus, ut finibus mauris convallis eget. Etiam varius sed nisl sed volutpat.
Suspendisse interdum orci eu eros cursus porta.
)
description_4 = %Q(
Sed non leo est. Quisque vel dui vel augue interdum rutrum sed non elit. Class aptent taciti
sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur luctus,
justo sed dapibus fringilla, neque tellus tempor quam, non pulvinar nulla lacus sit amet nisi.
Integer efficitur varius massa at tristique. Nam tincidunt mi a dignissim semper. Nullam ac
neque tortor. Donec lacinia augue semper, porta nunc vel, aliquet est. Donec a nulla tincidunt,
egestas lacus pellentesque, pretium felis. Donec augue quam, accumsan ac mi vel, sollicitudin
semper massa. Donec nulla ante, ultricies id velit et, maximus auctor risus. Aliquam condimentum
eros eget orci laoreet tempus. Pellentesque id ornare ex. Nunc auctor, lectus sed molestie tempus,
justo tellus volutpat nisi, nec pulvinar dui dolor in tortor. Vestibulum porttitor blandit
lacus ac laoreet.
)

project_1 = Project.create(name: "Protein ADS122 Efficacy",
                           description: description_1,
                           completed: true,
                           admin_id: admin_1.id,
                           deadline: "2017-10-01")

project_2 = Project.create(name: "Protein ADS123 Efficacy",
                          description: description_2,
                          completed: false,
                          admin_id: admin_1.id,
                          deadline: "2017-10-05")

project_3 = Project.create(name: "Protein ADS124 Efficacy",
                          description: description_3,
                          completed: false,
                          admin_id: admin_2.id,
                          deadline: "2017-10-08")

project_4 = Project.create(name: "Protein ADS125 Efficacy",
                          description: description_4,
                          completed: false,
                          admin_id: admin_2.id,
                          deadline: "2017-10-12")

task_1 = Task.create(name: "Materials",
                     description: "Request protein",
                     completed: true,
                     project_id: project_1.id,
                     due_date: "2017-09-23")
task_2 = Task.create(name: "Experiment",
                     description: "completed three day PK with ADS122",
                     completed: true,
                     project_id: project_1.id,
                     due_date: "2017-09-26")
task_3 = Task.create(name: "Presentation slides",
                     description: "Prepare slides with summarized data for project meeting discussion",
                     completed: true,
                     project_id: project_1.id,
                     due_date: "2017-10-30")

task_4 = Task.create(name: "Materials",
                    description: "Request protein",
                    completed: true,
                    project_id: project_2.id,
                    due_date: "2017-09-23")
task_5 = Task.create(name: "Experiment",
                    description: "completed three day PK with ADS123",
                    completed: true,
                    project_id: project_2.id,
                    due_date: "2017-09-26")
task_6 = Task.create(name: "Presentation slides",
                    description: "Prepare slides with summarized data for project meeting discussion",
                    completed: false,
                    project_id: project_2.id,
                    due_date: "2017-10-30")

task_7 = Task.create(name: "Materials",
                    description: "Request protein",
                    completed: true,
                    project_id: project_3.id,
                    due_date: "2017-09-23")
task_8 = Task.create(name: "Experiment",
                    description: "completed three day PK with ADS124",
                    completed: false,
                    project_id: project_3.id,
                    due_date: "2017-09-26")
task_9 = Task.create(name: "Presentation slides",
                    description: "Prepare slides with summarized data for project meeting discussion",
                    completed: false,
                    project_id: project_3.id,
                    due_date: "2017-10-30")
task_10 = Task.create(name: "Materials",
                    description: "Request protein",
                    completed: false,
                    project_id: project_4.id,
                    due_date: "2017-09-23")
task_11 = Task.create(name: "Experiment",
                    description: "completed three day PK with ADS124",
                    completed: false,
                    project_id: project_4.id,
                    due_date: "2017-09-26")
task_12 = Task.create(name: "Presentation slides",
                    description: "Prepare slides with summarized data for project meeting discussion",
                    completed: false,
                    project_id: project_4.id,
                                        due_date: "2017-10-30")

TaskAssignment.create(user_id: admin_1.id, task_id: task_7.id)
TaskAssignment.create(user_id: 9, task_id: task_8.id)
TaskAssignment.create(user_id: 10, task_id: task_9.id)
TaskAssignment.create(user_id: 10, task_id: task_10.id)
TaskAssignment.create(user_id: admin_1.id, task_id: task_11.id)
TaskAssignment.create(user_id: admin_1.id, task_id: task_12.id)

TaskAssignment.create(user_id: 3, task_id: task_1.id)
TaskAssignment.create(user_id: 4, task_id: task_2.id)
TaskAssignment.create(user_id: 5, task_id: task_3.id)
TaskAssignment.create(user_id: 6, task_id: task_4.id)
TaskAssignment.create(user_id: 7, task_id: task_5.id)
TaskAssignment.create(user_id: 8, task_id: task_6.id)
