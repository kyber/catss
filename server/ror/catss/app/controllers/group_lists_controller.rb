class GroupListsController < ApplicationController
  # GET /group_lists
  # GET /group_lists.xml
  def index
    @group_lists = GroupList.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @group_lists }
    end
  end

  # GET /group_lists/1
  # GET /group_lists/1.xml
  def show
    @group_list = GroupList.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @group_list }
    end
  end

  # GET /group_lists/new
  # GET /group_lists/new.xml
  def new
    @group_list = GroupList.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @group_list }
    end
  end

  # GET /group_lists/1/edit
  def edit
    @group_list = GroupList.find(params[:id])
  end

  # POST /group_lists
  # POST /group_lists.xml
  def create
    @group_list = GroupList.new(params[:group_list])

    respond_to do |format|
      if @group_list.save
        format.html { redirect_to(@group_list, :notice => 'Group list was successfully created.') }
        format.xml  { render :xml => @group_list, :status => :created, :location => @group_list }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @group_list.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /group_lists/1
  # PUT /group_lists/1.xml
  def update
    @group_list = GroupList.find(params[:id])

    respond_to do |format|
      if @group_list.update_attributes(params[:group_list])
        format.html { redirect_to(@group_list, :notice => 'Group list was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @group_list.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /group_lists/1
  # DELETE /group_lists/1.xml
  def destroy
    @group_list = GroupList.find(params[:id])
    @group_list.destroy

    respond_to do |format|
      format.html { redirect_to(group_lists_url) }
      format.xml  { head :ok }
    end
  end
end
