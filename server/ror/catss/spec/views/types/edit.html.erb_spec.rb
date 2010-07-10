require 'spec_helper'

describe "types/edit.html.erb" do
  before(:each) do
    assign(:type, @type = stub_model(Type,
      :new_record? => false,
      :id => 1,
      :type => "MyString"
    ))
  end

  it "renders the edit type form" do
    render

    response.should have_selector("form", :action => type_path(@type), :method => "post") do |form|
      form.should have_selector("input#type_id", :name => "type[id]")
      form.should have_selector("input#type_type", :name => "type[type]")
    end
  end
end
