require 'spec_helper'

describe TriggersController do

  def mock_trigger(stubs={})
    @mock_trigger ||= mock_model(Trigger, stubs).as_null_object
  end

  describe "GET index" do
    it "assigns all triggers as @triggers" do
      Trigger.stub(:all) { [mock_trigger] }
      get :index
      assigns(:triggers).should eq([mock_trigger])
    end
  end

  describe "GET show" do
    it "assigns the requested trigger as @trigger" do
      Trigger.stub(:find).with("37") { mock_trigger }
      get :show, :id => "37"
      assigns(:trigger).should be(mock_trigger)
    end
  end

  describe "GET new" do
    it "assigns a new trigger as @trigger" do
      Trigger.stub(:new) { mock_trigger }
      get :new
      assigns(:trigger).should be(mock_trigger)
    end
  end

  describe "GET edit" do
    it "assigns the requested trigger as @trigger" do
      Trigger.stub(:find).with("37") { mock_trigger }
      get :edit, :id => "37"
      assigns(:trigger).should be(mock_trigger)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created trigger as @trigger" do
        Trigger.stub(:new).with({'these' => 'params'}) { mock_trigger(:save => true) }
        post :create, :trigger => {'these' => 'params'}
        assigns(:trigger).should be(mock_trigger)
      end

      it "redirects to the created trigger" do
        Trigger.stub(:new) { mock_trigger(:save => true) }
        post :create, :trigger => {}
        response.should redirect_to(trigger_url(mock_trigger))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved trigger as @trigger" do
        Trigger.stub(:new).with({'these' => 'params'}) { mock_trigger(:save => false) }
        post :create, :trigger => {'these' => 'params'}
        assigns(:trigger).should be(mock_trigger)
      end

      it "re-renders the 'new' template" do
        Trigger.stub(:new) { mock_trigger(:save => false) }
        post :create, :trigger => {}
        response.should render_template(:new)
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested trigger" do
        Trigger.should_receive(:find).with("37") { mock_trigger }
        mock_trigger.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :trigger => {'these' => 'params'}
      end

      it "assigns the requested trigger as @trigger" do
        Trigger.stub(:find) { mock_trigger(:update_attributes => true) }
        put :update, :id => "1"
        assigns(:trigger).should be(mock_trigger)
      end

      it "redirects to the trigger" do
        Trigger.stub(:find) { mock_trigger(:update_attributes => true) }
        put :update, :id => "1"
        response.should redirect_to(trigger_url(mock_trigger))
      end
    end

    describe "with invalid params" do
      it "assigns the trigger as @trigger" do
        Trigger.stub(:find) { mock_trigger(:update_attributes => false) }
        put :update, :id => "1"
        assigns(:trigger).should be(mock_trigger)
      end

      it "re-renders the 'edit' template" do
        Trigger.stub(:find) { mock_trigger(:update_attributes => false) }
        put :update, :id => "1"
        response.should render_template(:edit)
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested trigger" do
      Trigger.should_receive(:find).with("37") { mock_trigger }
      mock_trigger.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the triggers list" do
      Trigger.stub(:find) { mock_trigger(:destroy => true) }
      delete :destroy, :id => "1"
      response.should redirect_to(triggers_url)
    end
  end

end
