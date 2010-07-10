require 'spec_helper'

describe "iconsets/show.html.erb" do
  before(:each) do
    assign(:iconset, @iconset = stub_model(Iconset,
      :id => 1,
      :name => "MyString",
      :file_path => "MyString"
    ))
  end

  it "renders attributes in <p>" do
    render
    response.should contain(1)
    response.should contain("MyString")
    response.should contain("MyString")
  end
end
