require 'spec_helper'

describe "devices/new.html.erb" do
  before(:each) do
    assign(:device, stub_model(Device,
      :new_record? => true,
      :name => "MyString",
      :imei => "MyText"
    ))
  end

  it "renders new device form" do
    render

    response.should have_selector("form", :action => devices_path, :method => "post") do |form|
      form.should have_selector("input#device_name", :name => "device[name]")
      form.should have_selector("textarea#device_imei", :name => "device[imei]")
    end
  end
end
