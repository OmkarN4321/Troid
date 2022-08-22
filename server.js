const wsPlugin = require("./plugins/wsPlugin");
const redisPlugin = require("./plugins/redisPlugin");

const fastify = require("fastify")({ logger: true });

const init = () => {
  wsPlugin(fastify);
  redisPlugin(fastify);
};

const fire = async () => {
  try {
    await fastify.listen({ port: 5000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

init();
fire();
