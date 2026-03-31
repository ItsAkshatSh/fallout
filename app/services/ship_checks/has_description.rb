# frozen_string_literal: true

module ShipChecks
  module HasDescription
    DEFINITION = { key: :has_description, label: "Project has a description", deps: [], visibility: :user }.freeze

    def self.call(ctx)
      passed = ctx.project.description.present?
      ShipCheckService::CheckResult.new(
        key: "has_description",
        label: DEFINITION[:label],
        status: passed ? :passed : :failed,
        message: passed ? nil : "Add a description to your project on Fallout",
        visibility: :user
      )
    end
  end
end
