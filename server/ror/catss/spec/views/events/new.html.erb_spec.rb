require 'spec_helper'

describe "events/new.html.erb" do
  before(:each) do
    assign(:event, stub_model(Event,
      :new_record? => true,
      :imei => "MyString",
      :coordinates => "MyString",
      :altitude => "MyString",
      :speed => "MyString"
    ))
  end

  it "renders new event form" do
    render

    response.should have_selector("form", :action => events_path, :method => "post") do |form|
      form.should have_selector("input#event_imei", :name => "event[imei]")
      form.should have_selector("input#event_coordinates", :name => "event[coordinates]")
      form.should have_selector("input#event_altitude", :name => "event[altitude]")
      form.should have_selector("input#event_speed", :name => "event[speed]")
    end
  end
end
