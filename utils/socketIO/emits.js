const { getUser } = require('../redis/users');
const { getRoom } = require('../redis/rooms');

const basicEmit = (fastify, socketId, eventName, data) => {
	const { io } = fastify;

	if (data) {
		io.to(socketId).emit(eventName, data);
	} else {
		io.to(socketId).emit(eventName);
	}
};

const roomEmit = async (fastify, socketId, eventName, data) => {
	const { io, redis } = fastify;

	const user = await getUser(redis, socketId);
	const room = await getRoom(redis, user.roomName);
	room.members.forEach((memberId) => {
		if (data) {
			io.to(memberId).emit(eventName, data);
		} else {
			io.to(memberId).emit(eventName);
		}
	});
};

const roomBroadcastEmit = async (fastify, socketId, eventName, data) => {
	const { io, redis } = fastify;

	const user = await getUser(redis, socketId);
	const room = await getRoom(redis, user.roomName);
	room.members.forEach((memberId) => {
		if (memberId !== socketId) {
			if (data) {
				io.to(memberId).emit(eventName, data);
			} else {
				io.to(memberId).emit(eventName);
			}
		}
	});
};

module.exports = { basicEmit, roomEmit, roomBroadcastEmit };
