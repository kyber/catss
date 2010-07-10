require 'spec_helper'

describe "icons/new.html.erb" do
  before(:each) do
    assign(:icon, stub_model(Icon,
      :new_record? => true,
      :iconset_id => 1,
      :icon_nro => 1,
      :device_id => 1
    ))
  end

  it "renders new icon form" do
    render

    response.should have_selector("form", :action => icons_path, :method => "post") do |form|
      form.should have_selector("input#icon_iconset_id", :name => "icon[iconset_id]")
      form.should have_selector("input#icon_icon_nro", :name => "icon[icon_nro]")
      form.should have_selector("input#icon_device_id", :name => "icon[device_id]")
    end
  end
end
