require 'spec_helper'

describe "types/index.html.erb" do
  before(:each) do
    assign(:types, [
      stub_model(Type,
        :id => 1,
        :type => "MyString"
      ),
      stub_model(Type,
        :id => 1,
        :type => "MyString"
      )
    ])
  end

  it "renders a list of types" do
    render
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
  end
end
