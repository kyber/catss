require 'spec_helper'

describe "sensors/show.html.erb" do
  before(:each) do
    assign(:sensor, @sensor = stub_model(Sensor,
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

  it "renders attributes in <p>" do
    render
    response.should contain(1)
    response.should contain(1)
    response.should contain("MyString")
    response.should contain("MyString")
    response.should contain("MyString")
    response.should contain(1)
    response.should contain(1)
    response.should contain(1)
    response.should contain(1)
    response.should contain("MyString")
  end
end
