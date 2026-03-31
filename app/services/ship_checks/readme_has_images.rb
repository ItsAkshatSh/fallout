# frozen_string_literal: true

module ShipChecks
  module ReadmeHasImages
    DEFINITION = { key: :readme_has_images, label: "README has images", deps: [ :repo_tree, :readme_content ], visibility: :user }.freeze

    def self.call(ctx)
      tree = ctx.repo_tree
      content = ctx.readme_content
      if content.nil? && tree.nil?
        return ShipCheckService::CheckResult.new(
          key: "readme_has_images", label: DEFINITION[:label],
          status: :skipped, message: "No README found", visibility: :user
        )
      end

      readme_images = content&.scan(/!\[.*?\]\(.*?\)|<img[\s>]/i)&.size || 0
      tree_images = tree&.count { |p| p.match?(/\.(png|jpe?g|gif|webp|svg|bmp|ico)$/i) } || 0
      passed = readme_images >= 2 || tree_images >= 2
      ShipCheckService::CheckResult.new(
        key: "readme_has_images",
        label: DEFINITION[:label],
        status: passed ? :passed : :warn,
        message: passed ? nil : "Add images to your README as per the submission requirements",
        visibility: :user
      )
    end
  end
end
