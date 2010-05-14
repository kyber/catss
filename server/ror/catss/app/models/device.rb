class Device < ActiveRecord::Base

 # scopes
 scope :private, where(:display => 'private')
 scope :public, where(:display => 'public')

 # validations
 # VALIDATE HASH INPUTS

 validates_length_of :name, :within => 3..20, :too_long => I18n.t(:too_long), :too_short => I18n.t(:too_short)
 validates_uniqueness_of :imei, :message => I18n.t(:taken)
 validates_length_of :imei, :is => 15, :message => I18n.t(:wrong_length)
 # MASS_ASSIGNMENTS
 # By default mass-assignments are prohibited in 
 #   config/initializers/protect_models_from_mass_assignment.rb
 #
 # The problem with mass assignment is that some malicious [cr|h]acker might write a script to 
 # PUT something like name=New+Name&admin=1, thereby adding himself as an administrative user! 
 # This would be a Bad Thing™. The standard solution to this problem is to use attr_accessible 
 # in the model to declare explicitly the attributes that can be modified by mass assignment. 
 # see more: http://blog.mhartl.com/2008/09/21/mass-assignment-in-rails-applications/
 # 
 attr_accessible :imei, :name, :display
 #

end
