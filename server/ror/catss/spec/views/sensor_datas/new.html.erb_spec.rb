require 'spec_helper'

describe "sensor_datas/new.html.erb" do
  before(:each) do
    assign(:sensor_data, stub_model(SensorData,
      :new_record? => true,
      :sensor_id => 1,
      :meas_type_id => 1,
      :value => 1,
      :sequence => 1,
      :type => 1
    ))
  end

  it "renders new sensor_data form" do
    render

    response.should have_selector("form", :action => sensor_datas_path, :method => "post") do |form|
      form.should have_selector("input#sensor_data_sensor_id", :name => "sensor_data[sensor_id]")
      form.should have_selector("input#sensor_data_meas_type_id", :name => "sensor_data[meas_type_id]")
      form.should have_selector("input#sensor_data_value", :name => "sensor_data[value]")
      form.should have_selector("input#sensor_data_sequence", :name => "sensor_data[sequence]")
      form.should have_selector("input#sensor_data_type", :name => "sensor_data[type]")
    end
  end
end
