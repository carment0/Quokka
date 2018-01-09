Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#home'
  namespace :api, defaults: { format: :json } do

    post :task_assignments, to:'task_assignments#create'
    delete 'task_assignments', to: 'task_assignments#delete'

    resources :users, only: [:create] do
      # get => only GET request
      get 'projects/administrated', to: 'projects#user_administrated_projects'
      get 'projects/assigned', to: 'projects#user_assigned_projects'
      get 'tasks/assigned', to: 'tasks#user_assigned_tasks'
    end

    get 'users/by_company', to: 'users#list_by_company'
    resource :session, only: [:create, :destroy, :show]
    resources :projects, only: [:create, :destroy, :show, :index, :update] do
      resources :tasks, only: [:create, :destroy, :show, :index, :update]
    end
  end
end
