class Api::TasksController < ApplicationController
  before_action :require_logged_in

  def index
    @tasks = Task.all
    render "index.json.jbuilder"
  end

  def user_assigned_tasks
    assigned_tasks = Task.joins(:task_assignments).where("user_id = ?", params[:user_id])
    projects_map_by_id = Hash.new
    assigned_tasks.each do |task|
      project = task.project
      projects_map_by_id[project.id] = project
    end

    @projects = projects_map_by_id.values
    render "index.json.jbuilder"
  end


  def show
    @task = Task.find(params[:id])
    render "show.json.jbuilder"
  end

  def create
    @task = current_user.task.new(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def destroy
    @task = current_user.task.find(params[:id])
    @task.destroy
    render json: @task
  end

  def update
    @task = Task.find(params[:id])
    if @task.update(project_params)
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  private

  def project_params
    params.require(:task).permit(:name, :description, :completed, :project_id, :due_date)
  end
end
