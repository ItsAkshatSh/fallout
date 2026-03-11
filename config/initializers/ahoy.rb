class Ahoy::Store < Ahoy::DatabaseStore
  def track_visit(data)
    data[:ip] = request.headers["CF-Connecting-IP"] || request.remote_ip
    data[:utm_source] ||= request.params["ref"] if request.params["ref"].present?
    super(data)
  end
end

Ahoy.api = false
Ahoy.geocode = true
Ahoy.job_queue = :background

# Disable tracking in development
if Rails.env.development?
  class Ahoy::Store
    def exclude? = true
  end
end
