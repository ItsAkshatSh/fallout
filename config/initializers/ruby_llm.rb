# frozen_string_literal: true

RubyLLM.configure do |config|
  config.openrouter_api_key = ENV.fetch("OPENROUTER_API_KEY", nil)
  config.default_model = "openai/gpt-5-nano"
end

# Force low-detail vision to cap image token cost (~85 tokens per image regardless of resolution)
RubyLLM::Providers::OpenAI::Media.define_method(:format_image) do |image|
  {
    type: "image_url",
    image_url: {
      url: image.url? ? image.source.to_s : image.for_llm,
      detail: "low"
    }
  }
end
