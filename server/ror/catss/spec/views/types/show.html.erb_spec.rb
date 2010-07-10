require 'spec_helper'

describe "types/show.html.erb" do
  before(:each) do
    assign(:type, @type = stub_model(Type,
      :id => 1,
      :type => "MyString"
    ))
  end

  it "renders attributes in <p>" do
    render
    response.should contain(1)
    response.should contain("MyString")
  end
end
