class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch("MAILER_FROM", "fallout@hackclub.com")
  layout "mailer"
end
