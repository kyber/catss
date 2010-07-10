class CreateSensors < ActiveRecord::Migration
  def self.up
    create_table :sensors do |t|
      t.integer :device_id
      t.integer :sensor_id
      t.string :name
      t.string :manufacturer
      t.string :sensor_type
      t.integer :meas_min
      t.integer :meas_max
      t.integer :accuracy
      t.integer :resolution
      t.string :serial
      t.timestamp :manufactured_at
      t.timestamp :calibrated_at

      t.timestamps
    end
  end

  def self.down
    drop_table :sensors
  end
end
