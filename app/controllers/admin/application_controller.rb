class Admin::ApplicationController < ApplicationController
  before_action :require_staff!

  private

  def require_staff!
    redirect_to main_app.root_path, alert: "You are not authorized to access this page." unless current_user&.staff?
  end

  def require_admin!
    redirect_to main_app.root_path, alert: "You are not authorized to access this page." unless current_user&.admin?
  end
end
