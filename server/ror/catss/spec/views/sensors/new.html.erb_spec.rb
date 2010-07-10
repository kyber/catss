require 'spec_helper'

describe "sensors/new.html.erb" do
  before(:each) do
    assign(:sensor, stub_model(Sensor,
      :new_record? => true,
      :device_id => 1,
      :sensor_id => 1,
      :name => "MyString",
      :manufacturer => "MyString",
      :sensor_type => "MyString",
      :meas_min => 1,
      :meas_max => 1,
      :accuracy => 1,
      :resolution => 1,
      :serial => "MyString"
    ))
  end

  it "renders new sensor form" do
    render

    response.should have_selector("form", :action => sensors_path, :method => "post") do |form|
      form.should have_selector("input#sensor_device_id", :name => "sensor[device_id]")
      form.should have_selector("input#sensor_sensor_id", :name => "sensor[sensor_id]")
      form.should have_selector("input#sensor_name", :name => "sensor[name]")
      form.should have_selector("input#sensor_manufacturer", :name => "sensor[manufacturer]")
      form.should have_selector("input#sensor_sensor_type", :name => "sensor[sensor_type]")
      form.should have_selector("input#sensor_meas_min", :name => "sensor[meas_min]")
      form.should have_selector("input#sensor_meas_max", :name => "sensor[meas_max]")
      form.should have_selector("input#sensor_accuracy", :name => "sensor[accuracy]")
      form.should have_selector("input#sensor_resolution", :name => "sensor[resolution]")
      form.should have_selector("input#sensor_serial", :name => "sensor[serial]")
    end
  end
end
