require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

require_relative "../packages/auth/lib/auth"
require_relative "../packages/blog/lib/blog"
require_relative "../packages/diary/lib/diary"
module Ocean
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"

    # NOTE: Logidze uses DB functions and triggers,
    # hence you need to use SQL format for a schema dump
    # https://blog.appsignal.com/2020/01/15/the-pros-and-cons-of-using-structure-sql-in-your-ruby-on-rails-application.html
    config.active_record.schema_format = :sql
  end
end
