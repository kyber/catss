class CreateIcons < ActiveRecord::Migration
  def self.up
    create_table :icons do |t|
      t.integer :iconset_id
      t.integer :icon_nro
      t.integer :device_id

      t.timestamps
    end
  end

  def self.down
    drop_table :icons
  end
end
