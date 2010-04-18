require 'spec_helper'

describe "events/index.html.erb" do
  before(:each) do
    assign(:events, [
      stub_model(Event,
        :imei => "MyString",
        :coordinates => "MyString",
        :altitude => "MyString",
        :speed => "MyString"
      ),
      stub_model(Event,
        :imei => "MyString",
        :coordinates => "MyString",
        :altitude => "MyString",
        :speed => "MyString"
      )
    ])
  end

  it "renders a list of events" do
    render
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
  end
end
