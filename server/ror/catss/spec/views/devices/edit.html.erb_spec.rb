require 'spec_helper'

describe "devices/edit.html.erb" do
  before(:each) do
    assign(:device, @device = stub_model(Device,
      :new_record? => false,
      :name => "MyString",
      :imei => "MyText"
    ))
  end

  it "renders the edit device form" do
    render

    response.should have_selector("form", :action => device_path(@device), :method => "post") do |form|
      form.should have_selector("input#device_name", :name => "device[name]")
      form.should have_selector("textarea#device_imei", :name => "device[imei]")
    end
  end
end
