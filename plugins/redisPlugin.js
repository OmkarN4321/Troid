const fastifyPlugin = require("fastify-plugin");
const Redis = require("ioredis");

const fastifyRedis = (
  fastify,
  options = { host: "127.0.0.1", port: 6379 },
  done
) => {
  fastify.decorate("redis", new Redis(options));
  fastify.addHook("onClose", () => fastify.redis.off("error", onError).quit());

  let retryAttempts = 0;

  const onReady = () => {
    fastify.redis.off("ready", onReady);

    done();
  };

  const onError = (error) => {
    if (error.code === "ECONNREFUSED") {
      retryAttempts++;
    }

    if (retryAttempts > 5 || error instanceof Redis.ReplyError) {
      done(error);
    }
  };

  fastify.redis.on("ready", onReady).on("error", onError);
};

const redisPlugin = (fastify) => {
  fastify.register(fastifyPlugin(fastifyRedis));
};

module.exports = redisPlugin;
