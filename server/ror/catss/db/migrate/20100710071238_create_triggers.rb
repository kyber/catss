class CreateTriggers < ActiveRecord::Migration
  def self.up
    create_table :triggers do |t|
      t.integer :device_id
      t.integer :meas_type_id
      t.boolean :above_below
      t.integer :value

      t.timestamps
    end
  end

  def self.down
    drop_table :triggers
  end
end
