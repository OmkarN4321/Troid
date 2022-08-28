const fastifyPlugin = require('fastify-plugin');
const { Server } = require('socket.io');

const fastifySocketIO = (
	fastify,
	options = {
		cors: {
			origin: 'http://localhost:3000',
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
		}
	},
	done
) => {
	try {
		fastify.decorate('io', new Server(fastify.server, options));
		fastify.addHook('onClose', () => fastify.io.close());

		done();
	} catch (error) {
		done(error);
	}
};

const socketIOPlugin = (fastify) => {
	fastify.register(fastifyPlugin(fastifySocketIO));
};

module.exports = socketIOPlugin;
