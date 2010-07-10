require 'spec_helper'

describe "group_lists/show.html.erb" do
  before(:each) do
    assign(:group_list, @group_list = stub_model(GroupList,
      :group_id => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    response.should contain(1)
  end
end
