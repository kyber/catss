require 'spec_helper'

describe "devices/index.html.erb" do
  before(:each) do
    assign(:devices, [
      stub_model(Device,
        :name => "MyString",
        :imei => "MyText"
      ),
      stub_model(Device,
        :name => "MyString",
        :imei => "MyText"
      )
    ])
  end

  it "renders a list of devices" do
    render
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyText".to_s, :count => 2)
  end
end
