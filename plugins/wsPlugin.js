const fastifyWS = require("@fastify/websocket");

const wsPlugin = async (fastify, options) => {
  fastify.register(fastifyWS, {});
};

module.exports = wsPlugin;
