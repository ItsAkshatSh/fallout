class Admin::Reviews::DesignReviewsController < Admin::Reviews::BaseController
  def index
    reviews = policy_scope(DesignReview)
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
      redirect_to admin_reviews_design_review_path(@review), notice: "Design review updated."
    else
      redirect_back fallback_location: admin_reviews_design_review_path(@review),
                    inertia: { errors: @review.errors.messages }
    end
  end

  private

  def review_model
    DesignReview
  end

  def review_params
    params.expect(design_review: [ :status, :feedback, :internal_reason, :annotations ])
  end

  def serialize_review_detail(review)
    ship = review.ship
    {
      id: review.id,
      ship_id: ship.id,
      status: review.status,
      feedback: review.feedback,
      internal_reason: review.internal_reason,
      annotations: review.annotations,
      reviewer_display_name: review.reviewer&.display_name,
      project_name: ship.project.name,
      user_display_name: ship.project.user.display_name,
      created_at: review.created_at.strftime("%B %d, %Y")
    }
  end
end
