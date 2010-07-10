require 'spec_helper'

describe "meas_types/edit.html.erb" do
  before(:each) do
    assign(:meas_type, @meas_type = stub_model(MeasType,
      :new_record? => false,
      :name => "MyString",
      :default_meas_unit => "MyString",
      :default_interval_unit => 1,
      :multiplier => 1
    ))
  end

  it "renders the edit meas_type form" do
    render

    response.should have_selector("form", :action => meas_type_path(@meas_type), :method => "post") do |form|
      form.should have_selector("input#meas_type_name", :name => "meas_type[name]")
      form.should have_selector("input#meas_type_default_meas_unit", :name => "meas_type[default_meas_unit]")
      form.should have_selector("input#meas_type_default_interval_unit", :name => "meas_type[default_interval_unit]")
      form.should have_selector("input#meas_type_multiplier", :name => "meas_type[multiplier]")
    end
  end
end
