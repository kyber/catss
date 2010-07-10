require 'spec_helper'

describe "sensor_datas/index.html.erb" do
  before(:each) do
    assign(:sensor_datas, [
      stub_model(SensorData,
        :sensor_id => 1,
        :meas_type_id => 1,
        :value => 1,
        :sequence => 1,
        :type => 1
      ),
      stub_model(SensorData,
        :sensor_id => 1,
        :meas_type_id => 1,
        :value => 1,
        :sequence => 1,
        :type => 1
      )
    ])
  end

  it "renders a list of sensor_datas" do
    render
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
  end
end
