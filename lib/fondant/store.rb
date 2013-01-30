module Fondant
  class Store
    def initialize(redis_connection_options={})
      @redis = Redis::Namespace.new(:fondant, redis: Redis.connect(redis_connection_options))
    end

    def set(key, value)
      @redis.set(key, value)
    end

    def get(key)
      @redis.get(key)
    end
  end
end
