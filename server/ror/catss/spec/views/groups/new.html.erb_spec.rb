require 'spec_helper'

describe "groups/new.html.erb" do
  before(:each) do
    assign(:group, stub_model(Group,
      :new_record? => true,
      :device_id => 1,
      :user_id => 1,
      :name => "MyString"
    ))
  end

  it "renders new group form" do
    render

    response.should have_selector("form", :action => groups_path, :method => "post") do |form|
      form.should have_selector("input#group_device_id", :name => "group[device_id]")
      form.should have_selector("input#group_user_id", :name => "group[user_id]")
      form.should have_selector("input#group_name", :name => "group[name]")
    end
  end
end
