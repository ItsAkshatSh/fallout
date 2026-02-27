class DashboardController < ApplicationController
  allow_trial_access
  def index
    render inertia: {
      user: {
        display_name: current_user.display_name,
        email: current_user.email,
        koi: current_user.koi,
        avatar: current_user.avatar
      }
    }
  end
end
