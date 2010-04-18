class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.integer :imei, :limit => 16
      t.string :coordinates
      t.string :altitude
      t.string :speed
      t.string :bearing

      t.timestamps
    end
  end

  def self.down
    drop_table :events
  end
end
