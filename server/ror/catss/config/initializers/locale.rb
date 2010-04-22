# in config/initializer/locale.rb

# tell the I18n library where to find your translations
 I18n.load_path << Dir[ File.join(RAILS_ROOT, 'lib', 'locale', '*.{rb,yml}') ]
# Above does not look in subdirs, add the line below
I18n.load_path += Dir.glob(File.join(RAILS_ROOT, 'config', 'locales', '**', '*.{rb,yml}'))

# set default locale to something other than :en
I18n.default_locale = :fi
