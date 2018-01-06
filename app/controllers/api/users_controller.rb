class Api::UsersController < ApplicationController
  def list_by_company
    company = params[:company]
    @users = User.where("company = ?", company)
    render "list_by_company.json.jbuilder"
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render "show.json.jbuilder"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :first_name, :last_name, :position, :company, :email)
  end
end
