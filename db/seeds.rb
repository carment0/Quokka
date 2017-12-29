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
  Under homeostatic conditions, animals use well-defined hypothalamic neural circuits to help maintain stable body weight, by integrating metabolic and hormonal signals from the periphery to balance food consumption and energy expenditure. In stressed or disease conditions, however, animals use alternative neuronal pathways to adapt to the metabolic challenges of altered energy demand. Recent studies have identified brain areas outside the hypothalamus that are activated under these ‘non-homeostatic’ conditions but the molecular nature of the peripheral signals and brain-localized receptors that activate these circuits remains elusive. The goal of this project is to identify if glial cell-derived neurotrophic factor (GDNF) receptor alpha-like (GFRAL) as a brainstem-restricted receptor for growth and differentiation factor 15 (GDF15).
)
description_2 = %Q(
  Apelin-36 was discovered as the endogenous ligand for the previously orphan receptor APJ. Apelin-36 has been linked to two major types of biological activities: cardiovascular (stimulation of cardiac contractility and suppression of blood pressure) and metabolic (improving glucose homeostasis and lowering body weight). It has been assumed that both of these activities are modulated through APJ. The goal of this project is to demonstrate that the metabolic activity of apelin-36 can be separated from canonical APJ activation.
)
description_3 = %Q(
  Hepatic accumulation of bile acids is central to the pathogenesis of cholestatic liver diseases. Endocrine hormone fibroblast growth factor 19 (FGF19) may reduce hepatic bile acid levels through modulation of bile acid synthesis and prevent subsequent liver damage. However, FGF19 has also been implicated in hepatocellular carcinogenesis, and consequently, the potential risk from prolonged exposure to supraphysiological levels of the hormone represents a major hurdle for developing an FGF19-based therapy. The goal of this project is to test a nontumorigenic FGF19 variant, M70, which regulates bile acid metabolism and, through inhibition of bile acid synthesis and reduction of excess hepatic bile acid accumulation, protects mice from liver injury induced by either extrahepatic or intrahepatic cholestasis.
)
description_4 = %Q(
  Bile acid nuclear receptor farnesoid X receptor (FXR) is a key molecular mediator of many metabolic processes, including the regulation of bile acid, lipid and glucose homeostasis. A significant component of FXR-mediated events essential to its biological activity is attributed to induction of the enteric endocrine hormone fibroblast growth factor (FGF)19 or its rodent ortholog, FGF15. The goal of this project is to compare the properties of human FGF19 and murine FGF15 in the regulation of hepatocarcinogenesis and metabolism in various mouse models of disease.
)

project_1 = Project.create(name: "GDF15: Non-homeostatic body weight regulation",
                           description: description_1,
                           completed: true,
                           admin_id: admin_1.id,
                           deadline: "2017-12-01")

project_2 = Project.create(name: "Apelin-36: Canonical APJ Receptor Signaling",
                          description: description_2,
                          completed: false,
                          admin_id: admin_1.id,
                          deadline: "2018-01-05")

project_3 = Project.create(name: "FGF19: Cholestatic liver diseases",
                          description: description_3,
                          completed: false,
                          admin_id: admin_1.id,
                          deadline: "2018-03-08")

project_4 = Project.create(name: "FGF19: Hepatocarcinogenesis",
                          description: description_4,
                          completed: false,
                          admin_id: admin_2.id,
                          deadline: "2018-04-12")

task_1 = Task.create(name: "Materials",
                     description: "Order 200 Gfral knockout mice",
                     completed: true,
                     project_id: project_1.id,
                     due_date: "2017-11-23")
task_2 = Task.create(name: "Experiment1",
                     description: "Complete In-Life GDF15 chemotherapy resistance study",
                     completed: true,
                     project_id: project_1.id,
                     due_date: "2017-11-26")
task_3 = Task.create(name: "Experiment2",
                    description: "Complete data analysis for neuron activations in the parabrachial nucleus and central amygdala",
                    completed: true,
                    project_id: project_1.id,
                    due_date: "2017-11-26")
task_4 = Task.create(name: "Presentation",
                     description: "Prepare slides with summarized data for project meeting discussion",
                     completed: true,
                     project_id: project_1.id,
                     due_date: "2017-11-30")

task_5 = Task.create(name: "Materials",
                    description: "Recieve apelin-36 vaiants from protein department",
                    completed: true,
                    project_id: project_2.id,
                    due_date: "2017-12-27")
task_6 = Task.create(name: "Experiment",
                    description: "Complete In-Life apelin-36 vaiants metabolic study",
                    completed: true,
                    project_id: project_2.id,
                    due_date: "2017-12-30")
task_7 = Task.create(name: "Presentation",
                    description: "Prepare slides with summarized data for how apelin-36 can be used as the starting point for the development of diabetes therapeutics that are devoid of the blood pressure effects associated with canonical APJ activation.",
                    completed: false,
                    project_id: project_2.id,
                    due_date: "2018-01-02")

task_8 = Task.create(name: "Materials",
                    description: "Request nontumorigenic FGF19 variant, M70",
                    completed: true,
                    project_id: project_3.id,
                    due_date: "2018-02-23")
task_9 = Task.create(name: "Experiment",
                    description: "Complete In-Life M70 cholestasis study",
                    completed: false,
                    project_id: project_3.id,
                    due_date: "2018-02-26")
task_10 = Task.create(name: "Presentation slides",
                    description: "Prepare slides with summarizing how FGF19 variants are capable of modulating CYP7A1 expression",
                    completed: false,
                    project_id: project_3.id,
                    due_date: "2018-02-30")

task_11 = Task.create(name: "Materials",
                    description: "Develop mouse models for db/db, diet-induced obese, and multi-drug resistance 2 [Mdr2]-deficient",
                    completed: false,
                    project_id: project_4.id,
                    due_date: "2018-03-23")
task_12 = Task.create(name: "Experiment",
                    description: "Complete In-Life hepatocarcinogenesis and metabolism study",
                    completed: false,
                    project_id: project_4.id,
                    due_date: "2018-03-26")


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
