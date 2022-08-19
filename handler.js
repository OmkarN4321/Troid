const handler = (fastify, options, done) => {

  fastify.get("/", (req, reply) => {});

  done();
};

module.exports = handler;
