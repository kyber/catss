class CreateDevices < ActiveRecord::Migration
  def self.up
    create_table :devices do |t|
      t.integer :imei
      t.string :name
      t.integer :type_id
      t.integer :owner_id
      t.string :swrel
      t.string :hwrel
      t.integer :device_type 
      t.timestamp :public_start
      t.timestamp :public_stop
      t.text :description

      t.timestamps
    end
  end

  def self.down
    drop_table :devices
  end
end
