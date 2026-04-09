class CreatePendingCollaborationInvites < ActiveRecord::Migration[8.1]
  def change
    create_table :pending_collaboration_invites do |t|
      t.string :token, null: false
      t.string :invitee_email, null: false
      t.references :inviter, null: false, foreign_key: { to_table: :users }
      t.references :project, null: false, foreign_key: true
      t.references :collaboration_invite, null: true, foreign_key: true
      t.integer :status, null: false, default: 0
      t.datetime :discarded_at

      t.timestamps
    end

    add_index :pending_collaboration_invites, :token, unique: true
    add_index :pending_collaboration_invites, [ :project_id, :invitee_email, :status ],
              name: "idx_pending_collab_invites_on_project_email_status"
    add_index :pending_collaboration_invites, :discarded_at
  end
end
