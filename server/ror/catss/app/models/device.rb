class Device < ActiveRecord::Base

 # scopes
 scope :private, where(:display => 'private')
 scope :public, where(:display => 'public')

 # validations
 validates_length_of :name, :within => 6..20, :too_long => "pick a shorter name", :too_short => "pick a longer name"
 validates_uniqueness_of :imei
 validates_numericality_of :imei, :on => :create 
end
