require 'bundler'
Bundler.require

require ::File.expand_path('../lib/fondant', __FILE__)

desc "seed editable fields with sample data"
task :seed do
  @store = Fondant::Store.new

  @store.set('title', 'Hello, world!')
  @store.set('body',
    <<-eos
      <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu
      leo quam. <strong>Pellentesque ornare sem</strong> lacinia quam venenatis vestibulum. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit. <em>Vestibulum id ligula porta</em> felis
      euismod semper. Donec ullamcorper nulla non metus auctor fringilla.</p>

      <p>Vestibulum id ligula porta felis euismod semper. Vestibulum id ligula porta felis euismod
      semper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus
      varius blandit sit amet non magna. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
      venenatis vestibulum.</p>

      <ul>
        <li>This</li>
        <li><strong>That</strong></li>
        <li><a href="http://twitter.com/ovenbits">The other</a></li>
      </ul>

      <ol>
        <li>One</li>
        <li>Dos</li>
        <li>Trois</li>
      </ol>

      <p>
        <a href="http://ovenbits.com">
          <img src="http://d1a9fbb3yksxfz.cloudfront.net/assets-1.6/images/logo-color.png">
        </a>
      </p>
    eos
  )
end

desc "start the server"
task :server do
  system("rackup config.ru")
end
