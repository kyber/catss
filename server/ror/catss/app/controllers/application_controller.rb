class ApplicationController < ActionController::Base
  protect_from_forgery
 def 
   available_locales; AVAILABLE_LOCALES; 
 end

 def default_url_options(options={})
  logger.debug "default_url_options is passed options: #{options.inspect}\n"
  { :locale => I18n.locale }
 end

 before_filter :set_locale
 def set_locale
   # if params[:locale] is nil then I18n.default_locale will be used
   I18n.locale = params[:locale]
 
    #if params[:locale] && I18n.available_locales.include?(params[:locale].to_sym)
 #  cookies[:locale] = { :value => params[:locale], :expires => 1.year.from_now }
    #  I18n.locale = params[:locale].to_sym
    #elsif cookies['locale'] && I18n.available_locales.include?(cookies['locale'].to_sym)
    #  I18n.locale = cookies['locale'].to_sym
    #end
 end

end
