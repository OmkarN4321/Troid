const {
	createRoom,
	getRoom,
	updateRoom,
	deleteRoom,
} = require("./utils/redis/rooms");
const { createUser, getUser, deleteUser } = require("./utils/redis/users");
const { roomEmit, basicEmit } = require("./utils/socketIO/emits");
const socketIOPlugin = require("./plugins/socketIOPlugin");
const redisPlugin = require("./plugins/redisPlugin");
const { setTimeout } = require("timers");

const fastify = require("fastify")({ logger: true });

const init = async () => {
	socketIOPlugin(fastify);
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

const game = () => {
	fastify.ready().then(() => {
		fastify.io.on("connection", (socket) => {
			socket.on("createRoom", async ({ userName, roomName }) => {
				const { status, message } = await createRoom(
					fastify,
					socket.id,
					roomName
				);

				if (status === 1) {
					await createUser(fastify, socket.id, userName, roomName);

					basicEmit(fastify, socket.id, "success", { message });
				} else {
					basicEmit(fastify, socket.id, "failure", { message });
				}
			});

			socket.on("joinRoom", async ({ userName, roomName }) => {
				const { status, message } = await updateRoom(
					fastify,
					"join",
					socket.id,
					roomName
				);

				if (status === 1) {
					await createUser(fastify, socket.id, userName, roomName);

					basicEmit(fastify, socket.id, "success", { message });
					setTimeout(
						async () => await roomEmit(fastify, socket.id, "gameOn"),
						5000
					);
				} else {
					basicEmit(fastify, socket.id, "failure", { message });
				}
			});

			socket.on("posUpdate", async ({ posDiff }) => {
				await roomEmit(fastify, socket.id, "posUpdate", { posDiff });
			});

			socket.on("leaveRoom", async () => {
				const user = await getUser(fastify, socket.id);

				if (user) {
					await roomEmit(fastify, socket.id, "gameOff");
					await deleteRoom(fastify, user.roomName);

					basicEmit(fastify, socket.id, "success", {
						message: "User left the room",
					});
				} else {
					basicEmit(fastify, socket.id, "failure", {
						message: "User doesn't exist",
					});
				}
			});

			socket.on("disconnect", async (reason) => {
				const user = await getUser(fastify, socket.id);

				if (user) {
					await roomEmit(fastify, socket.id, "gameOff");
					await deleteRoom(fastify, user.roomName);
				}
			});
		});
	});
};

init();
game();
fire();
