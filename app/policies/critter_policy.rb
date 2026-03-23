# frozen_string_literal: true

class CritterPolicy < ApplicationPolicy
  def show?
    owner?
  end

  def update?
    owner? # Only the owner can mark their critter as spun
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      scope.where(user: user)
    end
  end
end
