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
class Critter < ApplicationRecord
  VARIANTS = %w[b2b-sales bloo bush chocolate elk grass gren-frog jellycat orange riptide rosey skeelton sungod the-goat the-red trashcan worm yelo].freeze

  belongs_to :user
  belongs_to :journal_entry

  validates :variant, presence: true, inclusion: { in: VARIANTS }

  scope :spun, -> { where(spun: true) }
  scope :unspun, -> { where(spun: false) }

  def image_path
    "/critters/#{variant}.webp"
  end

  def mark_spun!
    update!(spun: true)
  end
end
