# == Schema Information
#
# Table name: requirements_check_reviews
#
#  id              :bigint           not null, primary key
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
#  index_requirements_check_reviews_on_reviewer_id  (reviewer_id)
#  index_requirements_check_reviews_on_ship_id      (ship_id) UNIQUE
#  index_requirements_check_reviews_on_status       (status)
#
# Foreign Keys
#
#  fk_rails_...  (reviewer_id => users.id)
#  fk_rails_...  (ship_id => ships.id)
#
class RequirementsCheckReview < ApplicationRecord
  include Reviewable
end
