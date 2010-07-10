require 'spec_helper'

describe "triggers/show.html.erb" do
  before(:each) do
    assign(:trigger, @trigger = stub_model(Trigger,
      :device_id => 1,
      :meas_type_id => 1,
      :above_below => false,
      :value => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    response.should contain(1)
    response.should contain(1)
    response.should contain(false)
    response.should contain(1)
  end
end
