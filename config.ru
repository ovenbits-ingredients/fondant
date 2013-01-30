require 'bundler'
Bundler.require

require ::File.expand_path('../lib/fondant', __FILE__)
run Fondant::App

