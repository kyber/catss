require 'spec_helper'

describe "events/edit.html.erb" do
  before(:each) do
    assign(:event, @event = stub_model(Event,
      :new_record? => false,
      :imei => "MyString",
      :coordinates => "MyString",
      :altitude => "MyString",
      :speed => "MyString"
    ))
  end

  it "renders the edit event form" do
    render

    response.should have_selector("form", :action => event_path(@event), :method => "post") do |form|
      form.should have_selector("input#event_imei", :name => "event[imei]")
      form.should have_selector("input#event_coordinates", :name => "event[coordinates]")
      form.should have_selector("input#event_altitude", :name => "event[altitude]")
      form.should have_selector("input#event_speed", :name => "event[speed]")
    end
  end
end
