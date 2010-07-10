require 'spec_helper'

describe "triggers/edit.html.erb" do
  before(:each) do
    assign(:trigger, @trigger = stub_model(Trigger,
      :new_record? => false,
      :device_id => 1,
      :meas_type_id => 1,
      :above_below => false,
      :value => 1
    ))
  end

  it "renders the edit trigger form" do
    render

    response.should have_selector("form", :action => trigger_path(@trigger), :method => "post") do |form|
      form.should have_selector("input#trigger_device_id", :name => "trigger[device_id]")
      form.should have_selector("input#trigger_meas_type_id", :name => "trigger[meas_type_id]")
      form.should have_selector("input#trigger_above_below", :name => "trigger[above_below]")
      form.should have_selector("input#trigger_value", :name => "trigger[value]")
    end
  end
end
