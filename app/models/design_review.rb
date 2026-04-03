# == Schema Information
#
# Table name: design_reviews
#
#  id              :bigint           not null, primary key
#  annotations     :jsonb
#  feedback        :text
#  internal_reason :text
#  lock_version    :integer          default(0), not null
#  status          :integer          default("pending"), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  reviewer_id     :bigint
#  ship_id         :bigint           not null
#
# Indexes
#
#  index_design_reviews_on_reviewer_id  (reviewer_id)
#  index_design_reviews_on_ship_id      (ship_id) UNIQUE
#  index_design_reviews_on_status       (status)
#
# Foreign Keys
#
#  fk_rails_...  (reviewer_id => users.id)
#  fk_rails_...  (ship_id => ships.id)
#
class DesignReview < ApplicationRecord
  include Reviewable
end
