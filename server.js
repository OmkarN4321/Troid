const {
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("./utils/redis/rooms");
const { createUser, getUser, deleteUser } = require("./utils/redis/users");
const socketIOPlugin = require("./plugins/socketIOPlugin");
const redisPlugin = require("./plugins/redisPlugin");
const path = require("path");
const fs = require("fs");

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
          fastify.redis,
          socket.id,
          roomName
        );

        if (status === 1) {
          await createUser(fastify.redis, socket.id, userName, roomName);

          io.to(socket.id).emit("success", { message });
        } else {
          io.to(socket.id).emit("failure", { message });
        }
      });

      socket.on("joinRoom", async ({ userName, roomName }) => {
        const { status, message } = await updateRoom(
          fastify.redis,
          "join",
          socket.id,
          roomName
        );

        if (status === 1) {
          await createUser(fastify.redis, socket.id, userName, roomName);

          io.to(socket.id).emit("success", { message });

          const room = await getRoom(fastify.redis, roomName);
          room.members.forEach((memberId) => {
            io.to(memberId).emit("gameOn");
          });
        } else {
          io.to(socket.id).emit("failure", { message });
        }
      });

      socket.on("leaveRoom", async () => {
        const user = await getUser(fastify.redis, socket.id);

        if (user) {
          const room = await getRoom(fastify.redis, user.roomName);
          room.members.forEach(async (memberId) => {
            io.to(memberId).emit("gameOff");
            await deleteUser(fastify.redis, memberId);
          });
          await deleteRoom(fastify.redis, user.roomName);

          io.to(socket.id).emit("success", { message });
        } else {
          io.to(socket.id).emit("failure", { message });
        }
      });
    });
  });
};

fastify.get("*", {}, (req, reply) => {
  const stream = fs.createReadStream(
    path.join(__dirname, "client", "index.html")
  );

  reply.type("text/html").send(stream);
});

init();
game();
fire();
