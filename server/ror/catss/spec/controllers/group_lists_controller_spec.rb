require 'spec_helper'

describe GroupListsController do

  def mock_group_list(stubs={})
    @mock_group_list ||= mock_model(GroupList, stubs).as_null_object
  end

  describe "GET index" do
    it "assigns all group_lists as @group_lists" do
      GroupList.stub(:all) { [mock_group_list] }
      get :index
      assigns(:group_lists).should eq([mock_group_list])
    end
  end

  describe "GET show" do
    it "assigns the requested group_list as @group_list" do
      GroupList.stub(:find).with("37") { mock_group_list }
      get :show, :id => "37"
      assigns(:group_list).should be(mock_group_list)
    end
  end

  describe "GET new" do
    it "assigns a new group_list as @group_list" do
      GroupList.stub(:new) { mock_group_list }
      get :new
      assigns(:group_list).should be(mock_group_list)
    end
  end

  describe "GET edit" do
    it "assigns the requested group_list as @group_list" do
      GroupList.stub(:find).with("37") { mock_group_list }
      get :edit, :id => "37"
      assigns(:group_list).should be(mock_group_list)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created group_list as @group_list" do
        GroupList.stub(:new).with({'these' => 'params'}) { mock_group_list(:save => true) }
        post :create, :group_list => {'these' => 'params'}
        assigns(:group_list).should be(mock_group_list)
      end

      it "redirects to the created group_list" do
        GroupList.stub(:new) { mock_group_list(:save => true) }
        post :create, :group_list => {}
        response.should redirect_to(group_list_url(mock_group_list))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved group_list as @group_list" do
        GroupList.stub(:new).with({'these' => 'params'}) { mock_group_list(:save => false) }
        post :create, :group_list => {'these' => 'params'}
        assigns(:group_list).should be(mock_group_list)
      end

      it "re-renders the 'new' template" do
        GroupList.stub(:new) { mock_group_list(:save => false) }
        post :create, :group_list => {}
        response.should render_template(:new)
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested group_list" do
        GroupList.should_receive(:find).with("37") { mock_group_list }
        mock_group_list.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :group_list => {'these' => 'params'}
      end

      it "assigns the requested group_list as @group_list" do
        GroupList.stub(:find) { mock_group_list(:update_attributes => true) }
        put :update, :id => "1"
        assigns(:group_list).should be(mock_group_list)
      end

      it "redirects to the group_list" do
        GroupList.stub(:find) { mock_group_list(:update_attributes => true) }
        put :update, :id => "1"
        response.should redirect_to(group_list_url(mock_group_list))
      end
    end

    describe "with invalid params" do
      it "assigns the group_list as @group_list" do
        GroupList.stub(:find) { mock_group_list(:update_attributes => false) }
        put :update, :id => "1"
        assigns(:group_list).should be(mock_group_list)
      end

      it "re-renders the 'edit' template" do
        GroupList.stub(:find) { mock_group_list(:update_attributes => false) }
        put :update, :id => "1"
        response.should render_template(:edit)
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested group_list" do
      GroupList.should_receive(:find).with("37") { mock_group_list }
      mock_group_list.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the group_lists list" do
      GroupList.stub(:find) { mock_group_list(:destroy => true) }
      delete :destroy, :id => "1"
      response.should redirect_to(group_lists_url)
    end
  end

end
