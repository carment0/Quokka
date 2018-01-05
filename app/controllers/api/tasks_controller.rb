class Api::TasksController < ApplicationController
  before_action :require_logged_in

  def index
    project_id = params[:project_id]
    @tasks = Task.where("project_id = ?", project_id)
    render "index.json.jbuilder"
  end

  def user_assigned_tasks
    @tasks = Task.joins(:task_assignments).where("user_id = ?", params[:user_id])
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
