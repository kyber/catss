require 'spec_helper'

describe "group_lists/new.html.erb" do
  before(:each) do
    assign(:group_list, stub_model(GroupList,
      :new_record? => true,
      :group_id => 1
    ))
  end

  it "renders new group_list form" do
    render

    response.should have_selector("form", :action => group_lists_path, :method => "post") do |form|
      form.should have_selector("input#group_list_group_id", :name => "group_list[group_id]")
    end
  end
end
