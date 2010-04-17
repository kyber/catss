require 'spec_helper'

describe "devices/show.html.erb" do
  before(:each) do
    assign(:device, @device = stub_model(Device,
      :name => "MyString",
      :imei => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    response.should contain("MyString")
    response.should contain("MyText")
  end
end
