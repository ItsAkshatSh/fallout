# frozen_string_literal: true

module ShipChecks
  module ReadmeHasHeadings
    DEFINITION = { key: :readme_has_headings, label: "Formatted README", deps: [ :readme_content ], visibility: :user }.freeze

    def self.call(ctx)
      content = ctx.readme_content
      if content.nil?
        return ShipCheckService::CheckResult.new(
          key: "readme_has_headings", label: DEFINITION[:label],
          status: :skipped, message: "No README found", visibility: :user
        )
      end

      has_headings = content.match?(/^\#{1,6}\s/m)
      ShipCheckService::CheckResult.new(
        key: "readme_has_headings",
        label: DEFINITION[:label],
        status: has_headings ? :passed : :warn,
        message: has_headings ? nil : "Clearly format your README content",
        visibility: :user
      )
    end
  end
end
