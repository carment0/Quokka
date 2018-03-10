# Quokka
https://quokka-cloud.herokuapp.com

A project management software for real time collaboration. Quokka allows for team members to collaboratively track project and task completion.

## Installing
Clone this project into your local computer:

`git clone https://github.com/carment0/Quokka.git`

In the project directory run the following command to install all dependencies:

`bundle install`

`npm install`

Next run the server:

`rails s`

Open http://localhost:3000 to view the project in the browser


### Screenshots
##### Landing Page
![landing_page]
##### Registration Page
![registration_page]
##### Dashboard
![project_dashboard]
##### Your Assigned Tasks
![task_list]
##### Project Details
![project_details]
##### Calendar
![calendar]
##### Create A Project
![create_project]
##### Your Team
![team]

[landing_page]: ./docs/screenshots/0.png
[registration_page]: ./docs/screenshots/1.png
[project_dashboard]: ./docs/screenshots/2.png
[task_list]: ./docs/screenshots/3.png
[project_details]: ./docs/screenshots/4.png
[calendar]: ./docs/screenshots/5.png
[create_project]: ./docs/screenshots/6.png
[team]: ./docs/screenshots/7.png

### Technologies Used
* React.js
* Redux
* Ruby on Rails
* JSON API
* PostgreSQL
* Heroku
* Websocket
* Recharts
* React Big Calendar
* React Quill

### Features
* User accounts with secure authentication
* Project Dashboard allowing easy management between projects and tasks
* Add / delete / complete projects
* Add / delete / complete tasks
* Assign tasks and set project deadlines
* Invite other users to join your "team"
* See new assigned tasks and updated task in realtime

## Future Implementations
Currently Quokka is still a skeleton application. More planned features will be implemented in the future.
* Uploading of profile pictures
* Comment on tasks/project
* Messaging/Notifications bar
* Calendar updates with project and task due
