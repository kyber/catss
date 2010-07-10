require 'spec_helper'

describe "iconsets/index.html.erb" do
  before(:each) do
    assign(:iconsets, [
      stub_model(Iconset,
        :id => 1,
        :name => "MyString",
        :file_path => "MyString"
      ),
      stub_model(Iconset,
        :id => 1,
        :name => "MyString",
        :file_path => "MyString"
      )
    ])
  end

  it "renders a list of iconsets" do
    render
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
  end
end
