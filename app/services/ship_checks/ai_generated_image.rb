# frozen_string_literal: true

require "net/http"
require "json"

module ShipChecks
  module AiGeneratedImage
    DEFINITION = { key: :ai_generated_image, label: "Images are original (not AI-generated)", deps: [ :readme_content ], visibility: :internal }.freeze
    THRESHOLD = 0.80
    MAX_IMAGES = 10

    ApiError = Class.new(StandardError)

    def self.call(ctx)
      urls = pick_main_images(ctx)
      return skip("No README images found") if urls.empty?

      api_user = ENV["SIGHTENGINE_API_USER"]
      api_secret = ENV["SIGHTENGINE_API_SECRET"]
      return skip("Sightengine not configured") unless api_user && api_secret

      tempfiles = ShipChecks::ReadmeImageDescriptions.download_images(urls)
      return skip("Could not download images") if tempfiles.empty?

      tempfiles.each_with_index do |tempfile, i|
        score = check_sightengine(tempfile, api_user, api_secret)
        next if score < THRESHOLD

        # Early exit — first flagged image is enough
        return ShipCheckService::CheckResult.new(
          key: "ai_generated_image", label: DEFINITION[:label],
          status: :warn, message: "Image #{i + 1} potentially AI-generated (#{(score * 100).round}% confidence)", visibility: :internal
        )
      end

      ShipCheckService::CheckResult.new(
        key: "ai_generated_image", label: DEFINITION[:label],
        status: :passed, message: nil, visibility: :internal
      )
    rescue ApiError => e
      skip(e.message)
    rescue StandardError
      skip("Sightengine analysis unavailable")
    ensure
      tempfiles&.each { |f| f.close! rescue nil } # rubocop:disable Style/RescueModifier
    end

    def self.pick_main_images(ctx)
      (ctx.readme_image_urls || []).reject { |u| u.match?(/\.svg$/i) }.first(MAX_IMAGES)
    end

    def self.check_sightengine(tempfile, api_user, api_secret)
      uri = URI("https://api.sightengine.com/1.0/check.json")
      boundary = SecureRandom.hex(16)

      body = build_multipart(tempfile, api_user, api_secret, boundary)
      request = Net::HTTP::Post.new(uri)
      request["Content-Type"] = "multipart/form-data; boundary=#{boundary}"
      request.body = body

      response = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 10, read_timeout: 10) do |http|
        http.request(request)
      end

      raise ApiError, "Sightengine API error (#{response.code})" unless response.is_a?(Net::HTTPSuccess)

      data = JSON.parse(response.body)
      data.dig("type_detail", "ai_generated")&.to_f || 0.0
    end

    def self.build_multipart(tempfile, api_user, api_secret, boundary)
      parts = []
      { "models" => "genai", "api_user" => api_user, "api_secret" => api_secret }.each do |key, value|
        parts << "--#{boundary}\r\nContent-Disposition: form-data; name=\"#{key}\"\r\n\r\n#{value}\r\n"
      end

      filename = File.basename(tempfile.path)
      tempfile.rewind
      parts << "--#{boundary}\r\nContent-Disposition: form-data; name=\"media\"; filename=\"#{filename}\"\r\nContent-Type: application/octet-stream\r\n\r\n#{tempfile.read}\r\n"
      parts << "--#{boundary}--\r\n"
      parts.join
    end

    def self.skip(message)
      ShipCheckService::CheckResult.new(
        key: "ai_generated_image", label: DEFINITION[:label],
        status: :skipped, message: message, visibility: :internal
      )
    end
  end
end
