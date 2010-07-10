require 'spec_helper'

describe "icons/show.html.erb" do
  before(:each) do
    assign(:icon, @icon = stub_model(Icon,
      :iconset_id => 1,
      :icon_nro => 1,
      :device_id => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    response.should contain(1)
    response.should contain(1)
    response.should contain(1)
  end
end
