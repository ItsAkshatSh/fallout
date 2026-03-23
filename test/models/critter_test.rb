# == Schema Information
#
# Table name: critters
#
#  id               :bigint           not null, primary key
#  spun             :boolean          default(FALSE), not null
#  variant          :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  journal_entry_id :bigint           not null
#  user_id          :bigint           not null
#
# Indexes
#
#  index_critters_on_journal_entry_id        (journal_entry_id)
#  index_critters_on_user_id                 (user_id)
#  index_critters_on_user_id_and_created_at  (user_id,created_at)
#
# Foreign Keys
#
#  fk_rails_...  (journal_entry_id => journal_entries.id)
#  fk_rails_...  (user_id => users.id)
#
require "test_helper"

class CritterTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
