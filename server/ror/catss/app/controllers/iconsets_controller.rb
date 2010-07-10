class IconsetsController < ApplicationController
  # GET /iconsets
  # GET /iconsets.xml
  def index
    @iconsets = Iconset.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @iconsets }
    end
  end

  # GET /iconsets/1
  # GET /iconsets/1.xml
  def show
    @iconset = Iconset.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @iconset }
    end
  end

  # GET /iconsets/new
  # GET /iconsets/new.xml
  def new
    @iconset = Iconset.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @iconset }
    end
  end

  # GET /iconsets/1/edit
  def edit
    @iconset = Iconset.find(params[:id])
  end

  # POST /iconsets
  # POST /iconsets.xml
  def create
    @iconset = Iconset.new(params[:iconset])

    respond_to do |format|
      if @iconset.save
        format.html { redirect_to(@iconset, :notice => 'Iconset was successfully created.') }
        format.xml  { render :xml => @iconset, :status => :created, :location => @iconset }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @iconset.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /iconsets/1
  # PUT /iconsets/1.xml
  def update
    @iconset = Iconset.find(params[:id])

    respond_to do |format|
      if @iconset.update_attributes(params[:iconset])
        format.html { redirect_to(@iconset, :notice => 'Iconset was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @iconset.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /iconsets/1
  # DELETE /iconsets/1.xml
  def destroy
    @iconset = Iconset.find(params[:id])
    @iconset.destroy

    respond_to do |format|
      format.html { redirect_to(iconsets_url) }
      format.xml  { head :ok }
    end
  end
end
