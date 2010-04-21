class DevicesController < ApplicationController

  # GET /devices
  def index
    @devices = Device.scoped
    @devices_pub = Device.scoped(:conditions => { :display => 'public' })
    # navititle[:notice] = t(:navititle) 
  end

  # GET /devices/1
  def show
    @device = Device.find(params[:id])
  end

  # GET /devices/new
  def new
    @device = Device.new
    @devices_pub = Device.scoped(:conditions => { :display => 'public' })
   end

  # GET /devices/1/edit
  def edit
    @device = Device.find(params[:id])
  end

  # POST /devices
  def create
    @device = Device.new(params[:device])

    if @device.save
       redirect_to(@device, :notice => 'Device was successfully created.') 
      
    else
      render :action => "new" 
    end
  end

  # PUT /devices/
  def update
    @device = Device.find(params[:id])

    if @device.update_attributes(params[:device])
        redirect_to(@device, :notice => 'Device was successfully updated.') 
    else
        render :action => "edit" 
    end
  end

  # DELETE /devices/1
  def destroy
    @device = Device.find(params[:id])
    @device.destroy

    redirect_to(devices_url) 
  end
end
