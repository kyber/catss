require 'spec_helper'

describe "groups/show.html.erb" do
  before(:each) do
    assign(:group, @group = stub_model(Group,
      :device_id => 1,
      :user_id => 1,
      :name => "MyString"
    ))
  end

  it "renders attributes in <p>" do
    render
    response.should contain(1)
    response.should contain(1)
    response.should contain("MyString")
  end
end
