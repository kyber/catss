require 'spec_helper'

describe SensorsController do

  def mock_sensor(stubs={})
    @mock_sensor ||= mock_model(Sensor, stubs).as_null_object
  end

  describe "GET index" do
    it "assigns all sensors as @sensors" do
      Sensor.stub(:all) { [mock_sensor] }
      get :index
      assigns(:sensors).should eq([mock_sensor])
    end
  end

  describe "GET show" do
    it "assigns the requested sensor as @sensor" do
      Sensor.stub(:find).with("37") { mock_sensor }
      get :show, :id => "37"
      assigns(:sensor).should be(mock_sensor)
    end
  end

  describe "GET new" do
    it "assigns a new sensor as @sensor" do
      Sensor.stub(:new) { mock_sensor }
      get :new
      assigns(:sensor).should be(mock_sensor)
    end
  end

  describe "GET edit" do
    it "assigns the requested sensor as @sensor" do
      Sensor.stub(:find).with("37") { mock_sensor }
      get :edit, :id => "37"
      assigns(:sensor).should be(mock_sensor)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created sensor as @sensor" do
        Sensor.stub(:new).with({'these' => 'params'}) { mock_sensor(:save => true) }
        post :create, :sensor => {'these' => 'params'}
        assigns(:sensor).should be(mock_sensor)
      end

      it "redirects to the created sensor" do
        Sensor.stub(:new) { mock_sensor(:save => true) }
        post :create, :sensor => {}
        response.should redirect_to(sensor_url(mock_sensor))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved sensor as @sensor" do
        Sensor.stub(:new).with({'these' => 'params'}) { mock_sensor(:save => false) }
        post :create, :sensor => {'these' => 'params'}
        assigns(:sensor).should be(mock_sensor)
      end

      it "re-renders the 'new' template" do
        Sensor.stub(:new) { mock_sensor(:save => false) }
        post :create, :sensor => {}
        response.should render_template(:new)
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested sensor" do
        Sensor.should_receive(:find).with("37") { mock_sensor }
        mock_sensor.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :sensor => {'these' => 'params'}
      end

      it "assigns the requested sensor as @sensor" do
        Sensor.stub(:find) { mock_sensor(:update_attributes => true) }
        put :update, :id => "1"
        assigns(:sensor).should be(mock_sensor)
      end

      it "redirects to the sensor" do
        Sensor.stub(:find) { mock_sensor(:update_attributes => true) }
        put :update, :id => "1"
        response.should redirect_to(sensor_url(mock_sensor))
      end
    end

    describe "with invalid params" do
      it "assigns the sensor as @sensor" do
        Sensor.stub(:find) { mock_sensor(:update_attributes => false) }
        put :update, :id => "1"
        assigns(:sensor).should be(mock_sensor)
      end

      it "re-renders the 'edit' template" do
        Sensor.stub(:find) { mock_sensor(:update_attributes => false) }
        put :update, :id => "1"
        response.should render_template(:edit)
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested sensor" do
      Sensor.should_receive(:find).with("37") { mock_sensor }
      mock_sensor.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the sensors list" do
      Sensor.stub(:find) { mock_sensor(:destroy => true) }
      delete :destroy, :id => "1"
      response.should redirect_to(sensors_url)
    end
  end

end
