# frozen_string_literal: true

module ShipChecks
  module HasRepoLink
    DEFINITION = { key: :has_repo_link, label: "Project has a repository", deps: [], visibility: :user }.freeze

    def self.call(ctx)
      passed = ctx.project.repo_link.present?
      ShipCheckService::CheckResult.new(
        key: "has_repo_link",
        label: DEFINITION[:label],
        status: passed ? :passed : :failed,
        message: passed ? nil : "Link a repository to your project on Fallout",
        visibility: :user
      )
    end
  end
end
