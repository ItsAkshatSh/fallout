# frozen_string_literal: true

module ShipChecks
  module HasJournalEntry
    DEFINITION = { key: :has_journal_entry, label: "Has journaled", deps: [], visibility: :user }.freeze

    def self.call(ctx)
      project = ctx.project
      has_entries = project.kept_journal_entries.size > 0
      has_time = project.time_logged.to_i > 300
      passed = has_entries && has_time
      ShipCheckService::CheckResult.new(
        key: "has_journal_entry",
        label: DEFINITION[:label],
        status: passed ? :passed : :failed,
        message: passed ? nil : "Journal your progress with time-lapse recordings",
        visibility: :user
      )
    end
  end
end
