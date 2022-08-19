//Server initiation
const fastify = require("fastify")({ logger: true });

//Plugin registration
fastify.register(require("fastify-socket.io"));
fastify.register(require("./handler"));

//Listening to requests
const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
