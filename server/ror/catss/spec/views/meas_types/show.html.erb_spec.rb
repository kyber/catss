require 'spec_helper'

describe "meas_types/show.html.erb" do
  before(:each) do
    assign(:meas_type, @meas_type = stub_model(MeasType,
      :name => "MyString",
      :default_meas_unit => "MyString",
      :default_interval_unit => 1,
      :multiplier => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    response.should contain("MyString")
    response.should contain("MyString")
    response.should contain(1)
    response.should contain(1)
  end
end
