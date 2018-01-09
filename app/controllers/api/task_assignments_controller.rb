class Api::TaskAssignmentsController < ApplicationController
  def create
    @new_assignment = TaskAssignment.new(task_assignment_params)
    if @new_assignment.save
      render json: @new_assignment, status: 200
    else
      render json: @new_assignment.errors.full_messages, status: 400
    end
  end

  def delete
    @assignment = TaskAssignment.where('user_id = ? and task_id = ?',
                                      task_assignment_params[:user_id],
                                      task_assignment_params[:task_id]).first
    if @assignment.destroy
      render json: @assignment
    else
      render json: @assignment.errors.full_messages, status: 422
    end
  end

  private
  def task_assignment_params
    params.require(:task_assignment).permit(:user_id, :task_id)
  end
end
