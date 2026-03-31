# frozen_string_literal: true

module ShipChecks
  module BomExists
    DEFINITION = { key: :bom_exists, label: "Bill of Materials in repository", deps: [ :repo_tree ], visibility: :user }.freeze

    def self.call(ctx)
      tree = ctx.repo_tree
      if tree.nil?
        return ShipCheckService::CheckResult.new(
          key: "bom_exists", label: DEFINITION[:label],
          status: :skipped, message: "Repository not accessible", visibility: :user
        )
      end

      found = tree.any? do |path|
        name = File.basename(path).downcase
        name.end_with?(".csv", ".xlsx") && name.match?(/bom|bill.of.material/)
      end

      ShipCheckService::CheckResult.new(
        key: "bom_exists",
        label: DEFINITION[:label],
        status: found ? :passed : :failed,
        message: found ? nil : "Add a Bill of Materials (BOM.csv) to your repository",
        visibility: :user
      )
    end
  end
end
