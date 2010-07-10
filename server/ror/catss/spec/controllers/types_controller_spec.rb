require 'spec_helper'

describe TypesController do

  def mock_type(stubs={})
    @mock_type ||= mock_model(Type, stubs).as_null_object
  end

  describe "GET index" do
    it "assigns all types as @types" do
      Type.stub(:all) { [mock_type] }
      get :index
      assigns(:types).should eq([mock_type])
    end
  end

  describe "GET show" do
    it "assigns the requested type as @type" do
      Type.stub(:find).with("37") { mock_type }
      get :show, :id => "37"
      assigns(:type).should be(mock_type)
    end
  end

  describe "GET new" do
    it "assigns a new type as @type" do
      Type.stub(:new) { mock_type }
      get :new
      assigns(:type).should be(mock_type)
    end
  end

  describe "GET edit" do
    it "assigns the requested type as @type" do
      Type.stub(:find).with("37") { mock_type }
      get :edit, :id => "37"
      assigns(:type).should be(mock_type)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created type as @type" do
        Type.stub(:new).with({'these' => 'params'}) { mock_type(:save => true) }
        post :create, :type => {'these' => 'params'}
        assigns(:type).should be(mock_type)
      end

      it "redirects to the created type" do
        Type.stub(:new) { mock_type(:save => true) }
        post :create, :type => {}
        response.should redirect_to(type_url(mock_type))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved type as @type" do
        Type.stub(:new).with({'these' => 'params'}) { mock_type(:save => false) }
        post :create, :type => {'these' => 'params'}
        assigns(:type).should be(mock_type)
      end

      it "re-renders the 'new' template" do
        Type.stub(:new) { mock_type(:save => false) }
        post :create, :type => {}
        response.should render_template(:new)
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested type" do
        Type.should_receive(:find).with("37") { mock_type }
        mock_type.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :type => {'these' => 'params'}
      end

      it "assigns the requested type as @type" do
        Type.stub(:find) { mock_type(:update_attributes => true) }
        put :update, :id => "1"
        assigns(:type).should be(mock_type)
      end

      it "redirects to the type" do
        Type.stub(:find) { mock_type(:update_attributes => true) }
        put :update, :id => "1"
        response.should redirect_to(type_url(mock_type))
      end
    end

    describe "with invalid params" do
      it "assigns the type as @type" do
        Type.stub(:find) { mock_type(:update_attributes => false) }
        put :update, :id => "1"
        assigns(:type).should be(mock_type)
      end

      it "re-renders the 'edit' template" do
        Type.stub(:find) { mock_type(:update_attributes => false) }
        put :update, :id => "1"
        response.should render_template(:edit)
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested type" do
      Type.should_receive(:find).with("37") { mock_type }
      mock_type.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the types list" do
      Type.stub(:find) { mock_type(:destroy => true) }
      delete :destroy, :id => "1"
      response.should redirect_to(types_url)
    end
  end

end
