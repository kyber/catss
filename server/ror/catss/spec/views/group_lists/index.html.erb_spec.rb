require 'spec_helper'

describe "group_lists/index.html.erb" do
  before(:each) do
    assign(:group_lists, [
      stub_model(GroupList,
        :group_id => 1
      ),
      stub_model(GroupList,
        :group_id => 1
      )
    ])
  end

  it "renders a list of group_lists" do
    render
    response.should have_selector("tr>td", :content => 1.to_s, :count => 2)
  end
end
