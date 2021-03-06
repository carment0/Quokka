class Api::ProjectsController < ApplicationController
  before_action :require_logged_in

  def index
    @projects = Project.all
    render "index.json.jbuilder"
  end

  def show
    @project = Project.find(params[:id])
    render "show.json.jbuilder"
  end

  # .where, .join => ActiveRecord Query Methods (sql)
  def user_administrated_projects
    @projects = Project.where("admin_id = ?", params[:user_id])
    render "index.json.jbuilder"
  end

  def user_assigned_projects
    assigned_tasks = Task.joins(:task_assignments).where("user_id = ?", params[:user_id])
    projects_map_by_id = Hash.new
    assigned_tasks.each do |task|
      project = task.project
      projects_map_by_id[project.id] = project
    end

    @projects = projects_map_by_id.values
    render "index.json.jbuilder"
  end

  def create
    @project = Project.new(project_params)
    @project.admin_id = current_user.id

    if @project.save
      render json: @project
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def destroy
    @project = Project.find(params[:id])

    if @project.admin_id == current_user.id
      @project.destroy
      render "show.json.jbuilder"
    else
      render json: "Unauthorized action", status: 401
    end
  end

  def update
    @project = Project.find(params[:id])
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :description, :completed, :admin_id, :deadline)
  end
end
