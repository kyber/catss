class SensorDatasController < ApplicationController
  # GET /sensor_datas
  # GET /sensor_datas.xml
  def index
    @sensor_datas = SensorData.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @sensor_datas }
    end
  end

  # GET /sensor_datas/1
  # GET /sensor_datas/1.xml
  def show
    @sensor_data = SensorData.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @sensor_data }
    end
  end

  # GET /sensor_datas/new
  # GET /sensor_datas/new.xml
  def new
    @sensor_data = SensorData.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @sensor_data }
    end
  end

  # GET /sensor_datas/1/edit
  def edit
    @sensor_data = SensorData.find(params[:id])
  end

  # POST /sensor_datas
  # POST /sensor_datas.xml
  def create
    @sensor_data = SensorData.new(params[:sensor_data])

    respond_to do |format|
      if @sensor_data.save
        format.html { redirect_to(@sensor_data, :notice => 'Sensor data was successfully created.') }
        format.xml  { render :xml => @sensor_data, :status => :created, :location => @sensor_data }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @sensor_data.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /sensor_datas/1
  # PUT /sensor_datas/1.xml
  def update
    @sensor_data = SensorData.find(params[:id])

    respond_to do |format|
      if @sensor_data.update_attributes(params[:sensor_data])
        format.html { redirect_to(@sensor_data, :notice => 'Sensor data was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @sensor_data.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /sensor_datas/1
  # DELETE /sensor_datas/1.xml
  def destroy
    @sensor_data = SensorData.find(params[:id])
    @sensor_data.destroy

    respond_to do |format|
      format.html { redirect_to(sensor_datas_url) }
      format.xml  { head :ok }
    end
  end
end
