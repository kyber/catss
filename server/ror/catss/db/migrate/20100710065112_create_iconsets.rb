class CreateIconsets < ActiveRecord::Migration
  def self.up
    create_table :iconsets do |t|
      t.string :name
      t.string :file_path

      t.timestamps
    end
  end

  def self.down
    drop_table :iconsets
  end
end
