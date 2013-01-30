require ::File.expand_path('../store', __FILE__)

module Fondant
  class App < Sinatra::Application

    before do
      @store = Fondant::Store.new
    end

    get '/' do
      @title = @store.get('title')
      @body = @store.get('body')

      haml :index
    end

    post '/update/:field' do
      @store.set(params[:field], request.body.read)
    end

    # Assets
    get('/js/fondant.js') { coffee :fondant }
    get('/css/fondant.css') { scss :fondant, style: :compressed }

  end
end
