class CafesController < ApplicationController

  def index
    @cafes = Cafe.where(search_id: params[:id])
    render json: @cafes
  end

end