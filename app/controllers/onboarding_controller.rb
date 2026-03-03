# frozen_string_literal: true

class OnboardingController < ApplicationController
  allow_trial_access
  skip_before_action :redirect_to_onboarding!

  def show
    return redirect_to dashboard_path if current_user.onboarded?

    step = current_step
    return complete_onboarding if step.nil?

    step_index = OnboardingConfig.step_keys.index(step["key"])
    existing = current_user.onboarding_responses.find_by(question_key: step["key"])

    render inertia: {
      step: step,
      step_index: step_index,
      total_steps: OnboardingConfig.step_count,
      existing_answer: existing&.then { |r| { answer_text: r.answer_text, is_other: r.is_other } }
    }
  end

  def update
    return redirect_to dashboard_path if current_user.onboarded?

    step = OnboardingConfig.find_step(params[:question_key])
    unless step
      redirect_to onboarding_path, alert: "Invalid step."
      return
    end

    unless step["type"] == "dialogue"
      response = current_user.onboarding_responses.find_or_initialize_by(question_key: step["key"])
      response.answer_text = params[:answer_text].to_s
      response.is_other = params[:is_other] == true || params[:is_other] == "true"

      unless response.save
        redirect_to onboarding_path, inertia: { errors: response.errors.messages }
        return
      end
    else
      current_user.onboarding_responses.find_or_create_by!(question_key: step["key"])
    end

    if last_step?(step["key"])
      complete_onboarding
    else
      redirect_to onboarding_path
    end
  end

  private

  def current_step
    answered_keys = current_user.onboarding_responses.pluck(:question_key)
    OnboardingConfig.steps.find { |s| answered_keys.exclude?(s["key"]) }
  end

  def last_step?(key)
    OnboardingConfig.step_keys.last == key
  end

  def complete_onboarding
    current_user.update!(onboarded: true)
    redirect_to dashboard_path, notice: "You're all set!"
  end
end
