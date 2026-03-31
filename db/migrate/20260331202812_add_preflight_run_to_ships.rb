class AddPreflightRunToShips < ActiveRecord::Migration[8.1]
  def change
    add_reference :ships, :preflight_run, null: true, foreign_key: true
  end
end
