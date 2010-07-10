require 'spec_helper'

describe "groups/index.html.erb" do
  before(:each) do
    assign(:groups, [
      stub_model(Group,
        :device_id => 1,
        :user_id => 1,
        :name => "MyString"
      ),
      stub_model(Group,
        :device_id => 1,
        :user_id => 1,
        :name => "MyString"
      )
    ])
  end

  it "renders a list of groups" do
    render
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
    response.should have_selector("tr>td", :content => "MyString".to_s, :count => 2)
  end
end
