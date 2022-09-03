const { getUser } = require('../redis/users');
const { getRoom } = require('../redis/rooms');

const basicEmit = (fastify, socketId, eventName, data) => {
	if (data) {
		fastify.io.to(socketId).emit(eventName, data);
	} else {
		fastify.io.to(socketId).emit(eventName);
	}
};

const roomEmit = async (fastify, socketId, eventName, data) => {
	const user = await getUser(fastify, socketId);
	const room = await getRoom(fastify, user.roomName);
	room.members.forEach((memberId) => {
		if (data) {
			fastify.io.to(memberId).emit(eventName, data);
		} else {
			fastify.io.to(memberId).emit(eventName);
		}
	});
};

const roomBroadcastEmit = async (fastify, socketId, eventName, data) => {
	const user = await getUser(fastify, socketId);
	const room = await getRoom(fastify, user.roomName);
	room.members.forEach((memberId) => {
		if (memberId !== socketId) {
			if (data) {
				fastify.io.to(memberId).emit(eventName, data);
			} else {
				fastify.io.to(memberId).emit(eventName);
			}
		}
	});
};

module.exports = { basicEmit, roomEmit, roomBroadcastEmit };
