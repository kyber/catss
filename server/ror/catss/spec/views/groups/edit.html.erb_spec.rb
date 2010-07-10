require 'spec_helper'

describe "groups/edit.html.erb" do
  before(:each) do
    assign(:group, @group = stub_model(Group,
      :new_record? => false,
      :device_id => 1,
      :user_id => 1,
      :name => "MyString"
    ))
  end

  it "renders the edit group form" do
    render

    response.should have_selector("form", :action => group_path(@group), :method => "post") do |form|
      form.should have_selector("input#group_device_id", :name => "group[device_id]")
      form.should have_selector("input#group_user_id", :name => "group[user_id]")
      form.should have_selector("input#group_name", :name => "group[name]")
    end
  end
end
