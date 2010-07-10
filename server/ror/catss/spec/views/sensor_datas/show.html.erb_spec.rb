require 'spec_helper'

describe "sensor_datas/show.html.erb" do
  before(:each) do
    assign(:sensor_data, @sensor_data = stub_model(SensorData,
      :sensor_id => 1,
      :meas_type_id => 1,
      :value => 1,
      :sequence => 1,
      :type => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    response.should contain(1)
    response.should contain(1)
    response.should contain(1)
    response.should contain(1)
    response.should contain(1)
  end
end
