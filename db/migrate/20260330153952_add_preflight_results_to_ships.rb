class AddPreflightResultsToShips < ActiveRecord::Migration[8.1]
  def change
    add_column :ships, :preflight_results, :jsonb
  end
end
