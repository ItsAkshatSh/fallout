class Admin::Reviews::RequirementsChecksController < Admin::Reviews::BaseController
  def index
    reviews = policy_scope(RequirementsCheckReview)
      .includes(ship: [ :project, project: :user ], reviewer: [])
      .order(created_at: :asc)
    @pagy, @reviews = pagy(reviews)

    render inertia: {
      reviews: @reviews.map { |r| serialize_review_row(r) },
      pagy: pagy_props(@pagy)
    }
  end

  def show
    authorize @review

    render inertia: {
      review: serialize_review_detail(@review),
      can: { update: policy(@review).update? }
    }
  end

  def update
    authorize @review

    if @review.update(review_params)
      redirect_to admin_reviews_requirements_check_path(@review), notice: "Requirements check updated."
    else
      redirect_back fallback_location: admin_reviews_requirements_check_path(@review),
                    inertia: { errors: @review.errors.messages }
    end
  end

  private

  def review_model
    RequirementsCheckReview
  end

  def review_params
    params.expect(requirements_check_review: [ :status, :feedback, :internal_reason ])
  end

  def serialize_review_detail(review)
    ship = review.ship
    {
      id: review.id,
      ship_id: ship.id,
      status: review.status,
      feedback: review.feedback,
      internal_reason: review.internal_reason,
      reviewer_display_name: review.reviewer&.display_name,
      project_name: ship.project.name,
      user_display_name: ship.project.user.display_name,
      preflight_results: ship.preflight_results,
      created_at: review.created_at.strftime("%B %d, %Y")
    }
  end
end
