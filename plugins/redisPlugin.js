const fastifyRedis = require("@fastify/redis");

const redisPlugin = async (fastify, options) => {
  fastify.register(fastifyRedis, {
    host: "127.0.0.1",
    port: 6379,
  });
};

module.exports = redisPlugin;
