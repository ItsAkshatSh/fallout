# Minimal base controller for mounted engines (e.g., Mission Control Jobs).
# Skips Inertia default rendering and Pundit — engines render their own HTML views.
# Access is gated by route constraints (AdminConstraint), not controller-level auth.
class Admin::EngineController < ApplicationController
  skip_after_action :verify_authorized # Engines don't use Pundit
  skip_after_action :verify_policy_scoped # Engines don't use Pundit

  # Prevent Inertia from intercepting engine HTML responses
  inertia_config(default_render: false)
end
