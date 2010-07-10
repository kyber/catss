require 'spec_helper'

describe "sensors/index.html.erb" do
  before(:each) do
    assign(:sensors, [
      stub_model(Sensor,
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
      ),
      stub_model(Sensor,
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
      )
    ])
  end

  it "renders a list of sensors" do
    render
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
  end
end
