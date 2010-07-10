require 'spec_helper'

describe "iconsets/new.html.erb" do
  before(:each) do
    assign(:iconset, stub_model(Iconset,
      :new_record? => true,
      :id => 1,
      :name => "MyString",
      :file_path => "MyString"
    ))
  end

  it "renders new iconset form" do
    render

    response.should have_selector("form", :action => iconsets_path, :method => "post") do |form|
      form.should have_selector("input#iconset_id", :name => "iconset[id]")
      form.should have_selector("input#iconset_name", :name => "iconset[name]")
      form.should have_selector("input#iconset_file_path", :name => "iconset[file_path]")
    end
  end
end
