require 'spec_helper'

describe "icons/index.html.erb" do
  before(:each) do
    assign(:icons, [
      stub_model(Icon,
        :iconset_id => 1,
        :icon_nro => 1,
        :device_id => 1
      ),
      stub_model(Icon,
        :iconset_id => 1,
        :icon_nro => 1,
        :device_id => 1
      )
    ])
  end

  it "renders a list of icons" do
    render
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
  end
end
