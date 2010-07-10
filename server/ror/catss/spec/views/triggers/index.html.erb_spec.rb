require 'spec_helper'

describe "triggers/index.html.erb" do
  before(:each) do
    assign(:triggers, [
      stub_model(Trigger,
        :device_id => 1,
        :meas_type_id => 1,
        :above_below => false,
        :value => 1
      ),
      stub_model(Trigger,
        :device_id => 1,
        :meas_type_id => 1,
        :above_below => false,
        :value => 1
      )
    ])
  end

  it "renders a list of triggers" do
    render
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => false.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
  end
end
