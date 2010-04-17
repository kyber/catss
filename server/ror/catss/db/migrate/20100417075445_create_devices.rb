class CreateDevices < ActiveRecord::Migration
  def self.up
    create_table :devices do |t|
      t.string :name
      t.text :imei
      t.float :tracker
      t.text :display
      t.float :hwrel
      t.string :locationunit 
      t.string :speedunit

      t.timestamps
    end
  end

  def self.down
    drop_table :devices
  end
end
