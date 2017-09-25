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

  def create
    @project = current_user.project.new(project_params)
    if @project.save
      render json: @project
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def destroy
    @project = current_user.project.find(params[:id])
    @project.destroy
    render json: @project
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
