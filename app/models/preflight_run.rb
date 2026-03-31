# == Schema Information
#
# Table name: preflight_runs
#
#  id          :bigint           not null, primary key
#  all_results :jsonb
#  checks      :jsonb
#  status      :integer          default("running"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  project_id  :bigint           not null
#
# Indexes
#
#  index_preflight_runs_on_project_id  (project_id)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#
class PreflightRun < ApplicationRecord
  belongs_to :project
  has_one :ship, dependent: :nullify

  enum :status, { running: 0, passed: 1, failed: 2 }

  validates :status, presence: true
end
