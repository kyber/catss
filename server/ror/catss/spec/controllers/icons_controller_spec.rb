require 'spec_helper'

describe IconsController do

  def mock_icon(stubs={})
    @mock_icon ||= mock_model(Icon, stubs).as_null_object
  end

  describe "GET index" do
    it "assigns all icons as @icons" do
      Icon.stub(:all) { [mock_icon] }
      get :index
      assigns(:icons).should eq([mock_icon])
    end
  end

  describe "GET show" do
    it "assigns the requested icon as @icon" do
      Icon.stub(:find).with("37") { mock_icon }
      get :show, :id => "37"
      assigns(:icon).should be(mock_icon)
    end
  end

  describe "GET new" do
    it "assigns a new icon as @icon" do
      Icon.stub(:new) { mock_icon }
      get :new
      assigns(:icon).should be(mock_icon)
    end
  end

  describe "GET edit" do
    it "assigns the requested icon as @icon" do
      Icon.stub(:find).with("37") { mock_icon }
      get :edit, :id => "37"
      assigns(:icon).should be(mock_icon)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created icon as @icon" do
        Icon.stub(:new).with({'these' => 'params'}) { mock_icon(:save => true) }
        post :create, :icon => {'these' => 'params'}
        assigns(:icon).should be(mock_icon)
      end

      it "redirects to the created icon" do
        Icon.stub(:new) { mock_icon(:save => true) }
        post :create, :icon => {}
        response.should redirect_to(icon_url(mock_icon))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved icon as @icon" do
        Icon.stub(:new).with({'these' => 'params'}) { mock_icon(:save => false) }
        post :create, :icon => {'these' => 'params'}
        assigns(:icon).should be(mock_icon)
      end

      it "re-renders the 'new' template" do
        Icon.stub(:new) { mock_icon(:save => false) }
        post :create, :icon => {}
        response.should render_template(:new)
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested icon" do
        Icon.should_receive(:find).with("37") { mock_icon }
        mock_icon.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :icon => {'these' => 'params'}
      end

      it "assigns the requested icon as @icon" do
        Icon.stub(:find) { mock_icon(:update_attributes => true) }
        put :update, :id => "1"
        assigns(:icon).should be(mock_icon)
      end

      it "redirects to the icon" do
        Icon.stub(:find) { mock_icon(:update_attributes => true) }
        put :update, :id => "1"
        response.should redirect_to(icon_url(mock_icon))
      end
    end

    describe "with invalid params" do
      it "assigns the icon as @icon" do
        Icon.stub(:find) { mock_icon(:update_attributes => false) }
        put :update, :id => "1"
        assigns(:icon).should be(mock_icon)
      end

      it "re-renders the 'edit' template" do
        Icon.stub(:find) { mock_icon(:update_attributes => false) }
        put :update, :id => "1"
        response.should render_template(:edit)
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested icon" do
      Icon.should_receive(:find).with("37") { mock_icon }
      mock_icon.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the icons list" do
      Icon.stub(:find) { mock_icon(:destroy => true) }
      delete :destroy, :id => "1"
      response.should redirect_to(icons_url)
    end
  end

end
