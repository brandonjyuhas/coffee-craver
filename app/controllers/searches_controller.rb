class SearchesController < ApplicationController

  def index
    @searches = Search.all
  end

  def show
    @search = Search.find(params[:id])
    @cafes = Cafe.where(search_id: params[:id])
    render json: @search
  end

  def new
    @search = Search.new
  end

  def create
    @search = Search.new(search_params)

    if @search.save
      render json: @search
    end
  end

  private

    def search_params
      params.require(:search).permit(:address)
    end

end