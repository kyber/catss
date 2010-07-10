require 'spec_helper'

describe IconsetsController do

  def mock_iconset(stubs={})
    @mock_iconset ||= mock_model(Iconset, stubs).as_null_object
  end

  describe "GET index" do
    it "assigns all iconsets as @iconsets" do
      Iconset.stub(:all) { [mock_iconset] }
      get :index
      assigns(:iconsets).should eq([mock_iconset])
    end
  end

  describe "GET show" do
    it "assigns the requested iconset as @iconset" do
      Iconset.stub(:find).with("37") { mock_iconset }
      get :show, :id => "37"
      assigns(:iconset).should be(mock_iconset)
    end
  end

  describe "GET new" do
    it "assigns a new iconset as @iconset" do
      Iconset.stub(:new) { mock_iconset }
      get :new
      assigns(:iconset).should be(mock_iconset)
    end
  end

  describe "GET edit" do
    it "assigns the requested iconset as @iconset" do
      Iconset.stub(:find).with("37") { mock_iconset }
      get :edit, :id => "37"
      assigns(:iconset).should be(mock_iconset)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created iconset as @iconset" do
        Iconset.stub(:new).with({'these' => 'params'}) { mock_iconset(:save => true) }
        post :create, :iconset => {'these' => 'params'}
        assigns(:iconset).should be(mock_iconset)
      end

      it "redirects to the created iconset" do
        Iconset.stub(:new) { mock_iconset(:save => true) }
        post :create, :iconset => {}
        response.should redirect_to(iconset_url(mock_iconset))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved iconset as @iconset" do
        Iconset.stub(:new).with({'these' => 'params'}) { mock_iconset(:save => false) }
        post :create, :iconset => {'these' => 'params'}
        assigns(:iconset).should be(mock_iconset)
      end

      it "re-renders the 'new' template" do
        Iconset.stub(:new) { mock_iconset(:save => false) }
        post :create, :iconset => {}
        response.should render_template(:new)
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested iconset" do
        Iconset.should_receive(:find).with("37") { mock_iconset }
        mock_iconset.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :iconset => {'these' => 'params'}
      end

      it "assigns the requested iconset as @iconset" do
        Iconset.stub(:find) { mock_iconset(:update_attributes => true) }
        put :update, :id => "1"
        assigns(:iconset).should be(mock_iconset)
      end

      it "redirects to the iconset" do
        Iconset.stub(:find) { mock_iconset(:update_attributes => true) }
        put :update, :id => "1"
        response.should redirect_to(iconset_url(mock_iconset))
      end
    end

    describe "with invalid params" do
      it "assigns the iconset as @iconset" do
        Iconset.stub(:find) { mock_iconset(:update_attributes => false) }
        put :update, :id => "1"
        assigns(:iconset).should be(mock_iconset)
      end

      it "re-renders the 'edit' template" do
        Iconset.stub(:find) { mock_iconset(:update_attributes => false) }
        put :update, :id => "1"
        response.should render_template(:edit)
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested iconset" do
      Iconset.should_receive(:find).with("37") { mock_iconset }
      mock_iconset.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the iconsets list" do
      Iconset.stub(:find) { mock_iconset(:destroy => true) }
      delete :destroy, :id => "1"
      response.should redirect_to(iconsets_url)
    end
  end

end
