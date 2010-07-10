require 'spec_helper'

describe "types/new.html.erb" do
  before(:each) do
    assign(:type, stub_model(Type,
      :new_record? => true,
      :id => 1,
      :type => "MyString"
    ))
  end

  it "renders new type form" do
    render

    response.should have_selector("form", :action => types_path, :method => "post") do |form|
      form.should have_selector("input#type_id", :name => "type[id]")
      form.should have_selector("input#type_type", :name => "type[type]")
    end
  end
end
