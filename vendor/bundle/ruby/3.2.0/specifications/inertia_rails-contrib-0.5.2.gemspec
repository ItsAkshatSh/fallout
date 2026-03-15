# -*- encoding: utf-8 -*-
# stub: inertia_rails-contrib 0.5.2 ruby lib

Gem::Specification.new do |s|
  s.name = "inertia_rails-contrib".freeze
  s.version = "0.5.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/skryukov/inertia_rails-contrib/issues", "changelog_uri" => "https://github.com/skryukov/inertia_rails-contrib/blob/main/CHANGELOG.md", "documentation_uri" => "https://github.com/skryukov/inertia_rails-contrib/blob/main/README.md", "homepage_uri" => "https://github.com/skryukov/inertia_rails-contrib", "rubygems_mfa_required" => "true", "source_code_uri" => "https://github.com/skryukov/inertia_rails-contrib" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Svyatoslav Kryukov".freeze]
  s.date = "1980-01-02"
  s.description = "A collection of extensions and developer tools for Rails Inertia adapter".freeze
  s.email = ["me@skryukov.dev".freeze]
  s.homepage = "https://github.com/skryukov/inertia_rails-contrib".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7.0".freeze)
  s.rubygems_version = "3.4.20".freeze
  s.summary = "A collection of extensions and developer tools for Rails Inertia adapter".freeze

  s.installed_by_version = "3.4.20" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<inertia_rails>.freeze, [">= 3.5.0"])
end
