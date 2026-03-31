class CreatePreflightRuns < ActiveRecord::Migration[8.1]
  def change
    create_table :preflight_runs do |t|
      t.references :project, null: false, foreign_key: true
      t.integer :status, default: 0, null: false
      t.jsonb :checks, default: []
      t.jsonb :all_results, default: []

      t.timestamps
    end
  end
end
