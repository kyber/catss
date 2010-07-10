require 'spec_helper'

describe "iconsets/edit.html.erb" do
  before(:each) do
    assign(:iconset, @iconset = stub_model(Iconset,
      :new_record? => false,
      :id => 1,
      :name => "MyString",
      :file_path => "MyString"
    ))
  end

  it "renders the edit iconset form" do
    render

    response.should have_selector("form", :action => iconset_path(@iconset), :method => "post") do |form|
      form.should have_selector("input#iconset_id", :name => "iconset[id]")
      form.should have_selector("input#iconset_name", :name => "iconset[name]")
      form.should have_selector("input#iconset_file_path", :name => "iconset[file_path]")
    end
  end
end
