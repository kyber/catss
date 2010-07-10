require 'spec_helper'

describe SensorDatasController do

  def mock_sensor_data(stubs={})
    @mock_sensor_data ||= mock_model(SensorData, stubs).as_null_object
  end

  describe "GET index" do
    it "assigns all sensor_datas as @sensor_datas" do
      SensorData.stub(:all) { [mock_sensor_data] }
      get :index
      assigns(:sensor_datas).should eq([mock_sensor_data])
    end
  end

  describe "GET show" do
    it "assigns the requested sensor_data as @sensor_data" do
      SensorData.stub(:find).with("37") { mock_sensor_data }
      get :show, :id => "37"
      assigns(:sensor_data).should be(mock_sensor_data)
    end
  end

  describe "GET new" do
    it "assigns a new sensor_data as @sensor_data" do
      SensorData.stub(:new) { mock_sensor_data }
      get :new
      assigns(:sensor_data).should be(mock_sensor_data)
    end
  end

  describe "GET edit" do
    it "assigns the requested sensor_data as @sensor_data" do
      SensorData.stub(:find).with("37") { mock_sensor_data }
      get :edit, :id => "37"
      assigns(:sensor_data).should be(mock_sensor_data)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created sensor_data as @sensor_data" do
        SensorData.stub(:new).with({'these' => 'params'}) { mock_sensor_data(:save => true) }
        post :create, :sensor_data => {'these' => 'params'}
        assigns(:sensor_data).should be(mock_sensor_data)
      end

      it "redirects to the created sensor_data" do
        SensorData.stub(:new) { mock_sensor_data(:save => true) }
        post :create, :sensor_data => {}
        response.should redirect_to(sensor_data_url(mock_sensor_data))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved sensor_data as @sensor_data" do
        SensorData.stub(:new).with({'these' => 'params'}) { mock_sensor_data(:save => false) }
        post :create, :sensor_data => {'these' => 'params'}
        assigns(:sensor_data).should be(mock_sensor_data)
      end

      it "re-renders the 'new' template" do
        SensorData.stub(:new) { mock_sensor_data(:save => false) }
        post :create, :sensor_data => {}
        response.should render_template(:new)
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested sensor_data" do
        SensorData.should_receive(:find).with("37") { mock_sensor_data }
        mock_sensor_data.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :sensor_data => {'these' => 'params'}
      end

      it "assigns the requested sensor_data as @sensor_data" do
        SensorData.stub(:find) { mock_sensor_data(:update_attributes => true) }
        put :update, :id => "1"
        assigns(:sensor_data).should be(mock_sensor_data)
      end

      it "redirects to the sensor_data" do
        SensorData.stub(:find) { mock_sensor_data(:update_attributes => true) }
        put :update, :id => "1"
        response.should redirect_to(sensor_data_url(mock_sensor_data))
      end
    end

    describe "with invalid params" do
      it "assigns the sensor_data as @sensor_data" do
        SensorData.stub(:find) { mock_sensor_data(:update_attributes => false) }
        put :update, :id => "1"
        assigns(:sensor_data).should be(mock_sensor_data)
      end

      it "re-renders the 'edit' template" do
        SensorData.stub(:find) { mock_sensor_data(:update_attributes => false) }
        put :update, :id => "1"
        response.should render_template(:edit)
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested sensor_data" do
      SensorData.should_receive(:find).with("37") { mock_sensor_data }
      mock_sensor_data.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the sensor_datas list" do
      SensorData.stub(:find) { mock_sensor_data(:destroy => true) }
      delete :destroy, :id => "1"
      response.should redirect_to(sensor_datas_url)
    end
  end

end
