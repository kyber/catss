require 'spec_helper'

describe "group_lists/edit.html.erb" do
  before(:each) do
    assign(:group_list, @group_list = stub_model(GroupList,
      :new_record? => false,
      :group_id => 1
    ))
  end

  it "renders the edit group_list form" do
    render

    response.should have_selector("form", :action => group_list_path(@group_list), :method => "post") do |form|
      form.should have_selector("input#group_list_group_id", :name => "group_list[group_id]")
    end
  end
end
