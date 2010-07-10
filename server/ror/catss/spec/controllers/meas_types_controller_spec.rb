require 'spec_helper'

describe MeasTypesController do

  def mock_meas_type(stubs={})
    @mock_meas_type ||= mock_model(MeasType, stubs).as_null_object
  end

  describe "GET index" do
    it "assigns all meas_types as @meas_types" do
      MeasType.stub(:all) { [mock_meas_type] }
      get :index
      assigns(:meas_types).should eq([mock_meas_type])
    end
  end

  describe "GET show" do
    it "assigns the requested meas_type as @meas_type" do
      MeasType.stub(:find).with("37") { mock_meas_type }
      get :show, :id => "37"
      assigns(:meas_type).should be(mock_meas_type)
    end
  end

  describe "GET new" do
    it "assigns a new meas_type as @meas_type" do
      MeasType.stub(:new) { mock_meas_type }
      get :new
      assigns(:meas_type).should be(mock_meas_type)
    end
  end

  describe "GET edit" do
    it "assigns the requested meas_type as @meas_type" do
      MeasType.stub(:find).with("37") { mock_meas_type }
      get :edit, :id => "37"
      assigns(:meas_type).should be(mock_meas_type)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created meas_type as @meas_type" do
        MeasType.stub(:new).with({'these' => 'params'}) { mock_meas_type(:save => true) }
        post :create, :meas_type => {'these' => 'params'}
        assigns(:meas_type).should be(mock_meas_type)
      end

      it "redirects to the created meas_type" do
        MeasType.stub(:new) { mock_meas_type(:save => true) }
        post :create, :meas_type => {}
        response.should redirect_to(meas_type_url(mock_meas_type))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved meas_type as @meas_type" do
        MeasType.stub(:new).with({'these' => 'params'}) { mock_meas_type(:save => false) }
        post :create, :meas_type => {'these' => 'params'}
        assigns(:meas_type).should be(mock_meas_type)
      end

      it "re-renders the 'new' template" do
        MeasType.stub(:new) { mock_meas_type(:save => false) }
        post :create, :meas_type => {}
        response.should render_template(:new)
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested meas_type" do
        MeasType.should_receive(:find).with("37") { mock_meas_type }
        mock_meas_type.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :meas_type => {'these' => 'params'}
      end

      it "assigns the requested meas_type as @meas_type" do
        MeasType.stub(:find) { mock_meas_type(:update_attributes => true) }
        put :update, :id => "1"
        assigns(:meas_type).should be(mock_meas_type)
      end

      it "redirects to the meas_type" do
        MeasType.stub(:find) { mock_meas_type(:update_attributes => true) }
        put :update, :id => "1"
        response.should redirect_to(meas_type_url(mock_meas_type))
      end
    end

    describe "with invalid params" do
      it "assigns the meas_type as @meas_type" do
        MeasType.stub(:find) { mock_meas_type(:update_attributes => false) }
        put :update, :id => "1"
        assigns(:meas_type).should be(mock_meas_type)
      end

      it "re-renders the 'edit' template" do
        MeasType.stub(:find) { mock_meas_type(:update_attributes => false) }
        put :update, :id => "1"
        response.should render_template(:edit)
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested meas_type" do
      MeasType.should_receive(:find).with("37") { mock_meas_type }
      mock_meas_type.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the meas_types list" do
      MeasType.stub(:find) { mock_meas_type(:destroy => true) }
      delete :destroy, :id => "1"
      response.should redirect_to(meas_types_url)
    end
  end

end
