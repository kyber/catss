class CreateSensorDatas < ActiveRecord::Migration
  def self.up
    create_table :sensor_datas do |t|
      t.integer :sensor_id
      t.integer :meas_type_id
      t.integer :value
      t.integer :sequence
      t.integer :type
      t.timestamp :measured_at

      t.timestamps
    end
  end

  def self.down
    drop_table :sensor_datas
  end
end
