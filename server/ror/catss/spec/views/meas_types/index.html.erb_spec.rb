require 'spec_helper'

describe "meas_types/index.html.erb" do
  before(:each) do
    assign(:meas_types, [
      stub_model(MeasType,
        :name => "MyString",
        :default_meas_unit => "MyString",
        :default_interval_unit => 1,
        :multiplier => 1
      ),
      stub_model(MeasType,
        :name => "MyString",
        :default_meas_unit => "MyString",
        :default_interval_unit => 1,
        :multiplier => 1
      )
    ])
  end

  it "renders a list of meas_types" do
    render
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
  end
end
