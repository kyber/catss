class CreateMeasTypes < ActiveRecord::Migration
  def self.up
    create_table :meas_types do |t|
      t.string :name
      t.string :default_meas_unit
      t.integer :default_interval_unit
      t.integer :multiplier

      t.timestamps
    end
  end

  def self.down
    drop_table :meas_types
  end
end
