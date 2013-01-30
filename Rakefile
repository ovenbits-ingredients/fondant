require 'bundler'
Bundler.require

require ::File.expand_path('../lib/fondant', __FILE__)

desc "seed editable fields with sample data"
task :seed do
  @store = Fondant::Store.new

  @store.set('title', 'Hello, world!')
  @store.set('body','<p>Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla.</p><p>Vestibulum id ligula porta felis euismod semper. Vestibulum id ligula porta felis euismod semper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>')
end

desc "start the server"
task :server do
  system("rackup config.ru")
end
