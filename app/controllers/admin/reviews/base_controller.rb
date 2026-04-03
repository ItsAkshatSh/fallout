class Admin::Reviews::BaseController < Admin::ApplicationController
  # No index action — override verify_authorized/verify_policy_scoped to avoid ActionNotFound
  skip_after_action :verify_authorized
  skip_after_action :verify_policy_scoped

  before_action :set_review, only: %i[show update]

  private

  def review_model
    raise NotImplementedError
  end

  def set_review
    @review = review_model.find(params[:id])
  end

  def serialize_review_row(review)
    ship = review.ship
    {
      id: review.id,
      ship_id: ship.id,
      project_name: ship.project.name,
      user_display_name: ship.project.user.display_name,
      status: review.status,
      reviewer_display_name: review.reviewer&.display_name,
      created_at: review.created_at.strftime("%b %d, %Y")
    }
  end
end
