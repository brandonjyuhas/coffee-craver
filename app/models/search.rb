class Search < ActiveRecord::Base
  after_create :find_lng_lat
  has_many :cafes

  # Handle redirection for Google Photos
  def fetch(uri_str, limit = 10)
    raise ArgumentError, 'too many HTTP redirects' if limit == 0

    response = Net::HTTP.get_response(URI(uri_str))

    case response
    when Net::HTTPSuccess then
      response['location']
    when Net::HTTPRedirection then
      location = response['location']
      warn "redirected to #{location}"
      return location
      fetch(location, limit - 1)
    else
      response['location']
    end
  end

  def find_lng_lat

    # Create variable to handle spaces
    address_search = ("https://maps.googleapis.com/maps/api/geocode/json?address=#{self.address}&key=#{Rails.application.secrets.google_api_key}").gsub!(/\s/,'+')

    # Get Google Response for longitude and latitude
    raw_data = HTTParty.get(address_search)

    @lng = raw_data["results"][0]["geometry"]["location"]["lng"]
    @lat = raw_data["results"][0]["geometry"]["location"]["lat"]


    find_cafes(@lng,@lat)
  end

  def find_cafes(lng,lat)

    raw_data = HTTParty.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{lat},#{lng}&keyword=coffee&types=cafe&rankby=distance&key=#{Rails.application.secrets.google_api_key}
")

    if raw_data["results"].length > 10
      raw_data["results"][0..9].each do |i|
        create_cafe(i)
      end
    else
    end
  end

  def create_cafe(result)
    if result["photos"] == nil
      @image_url = @@cafe_pics_array.sample
    else
      @photo_reference = result["photos"][0]["photo_reference"]

      @image_url = fetch("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=#{@photo_reference}&key=#{Rails.application.secrets.google_api_key}")
    end
    @name = result["name"]
    @address = result["vicinity"]

    cafe = Cafe.create(search_id: self.id, name: @name, image_url: @image_url, address: @address)
    puts "\n\n\n\n #{cafe}"
  end

  @@cafe_pics_array = ["http://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG","http://upload.wikimedia.org/wikipedia/commons/f/f8/Love_Coffee.jpg","http://i.imgur.com/gikAxJW.jpg","http://upload.wikimedia.org/wikipedia/commons/9/9d/Morning_cup_of_coffee_black_no_sugar.jpg","https://c1.staticflickr.com/3/2257/2182764740_bac869d3f4.jpg","https://c2.staticflickr.com/2/1196/4611048929_a5ca42e054_z.jpg","https://c1.staticflickr.com/3/2636/3992916003_dac7e3d823_b.jpg","http://fc02.deviantart.net/fs70/i/2011/270/1/0/latte_art___unicorn_by_coffee_secrets-d4b4kv0.jpg","http://i.imgur.com/B7caVd8.jpg","http://i.imgur.com/QeQxyVj.jpg","http://upload.wikimedia.org/wikipedia/commons/0/0b/4_lattes.png","https://c1.staticflickr.com/3/2542/4151087479_f0cddfd389_z.jpg?zz=1","https://c1.staticflickr.com/9/8296/7893347260_b29d57baf0_z.jpg","https://c2.staticflickr.com/4/3730/10194498966_3f25bd3a3f_b.jpg"]
end
