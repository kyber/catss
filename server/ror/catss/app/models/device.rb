class Device < ActiveRecord::Base
 scope :private, where(:display => 'private')
 scope :public, where(:display => 'public')
end
