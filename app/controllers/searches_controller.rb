class SearchesController < ApplicationController

  def index
    @searches = Search.all
  end

  def show
    @search = Search.find(:id)
  end

  def new
    @search = Search.new
  end

  def create
    @search = Search.new(search_params)
  end

  private

    def search_params
      params.require(:search).permit(:address)
    end

end