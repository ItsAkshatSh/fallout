module Reviewable
  extend ActiveSupport::Concern

  included do
    has_paper_trail

    belongs_to :ship
    belongs_to :reviewer, class_name: "User", optional: true

    enum :status, { pending: 0, approved: 1, returned: 2, rejected: 3, cancelled: 4 }

    validates :status, presence: true
    validates :ship_id, uniqueness: true

    # Update Ship's cached status in the SAME transaction (not after_commit) to prevent drift
    after_save :recompute_ship_status!, if: :saved_change_to_status?
  end

  private

  def recompute_ship_status!
    ship.with_lock do
      ship.ensure_phase_two_review!
      ship.recompute_status!
    end
  end
end
