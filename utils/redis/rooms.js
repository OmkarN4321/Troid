const { deleteUser } = require('./users');

const createRoom = async (fastify, roomCreator, roomName) => {
	const status = await fastify.redis.setnx(
		roomName,
		JSON.stringify({
			members: [roomCreator]
		})
	);

	if (status === 1) {
		return { status, message: 'Room created' };
	} else {
		return { status, message: 'Room exists' };
	}
};

const getRoom = async (fastify, roomName) => {
	const room = await fastify.redis.get(roomName);

	return JSON.parse(room);
};

const updateRoom = async (fastify, type, member, roomName) => {
	let room = await getRoom(fastify, roomName);

	if (room) {
		switch (type) {
			case 'join':
				if (room.members.length === 1) {
					room.members = room.members.concat(member);
					await fastify.redis.set(roomName, JSON.stringify(room));

					return { status: 1, message: 'User joined the room' };
				} else {
					return { status: 0, message: 'Room is full' };
				}
			case 'leave':
				room.members = room.members.filter((memberId) => memberId !== member);
				await fastify.redis.set(roomName, JSON.stringify(room));

				return { status: 1, message: 'User left the room' };
			default:
				break;
		}
	} else {
		return { status: 0, message: "Room doesn't exist" };
	}
};

const deleteRoom = async (fastify, roomName) => {
	const room = await getRoom(fastify, roomName);

	if (room) {
		room.members.forEach(async (memberId) => {
			await deleteUser(fastify, memberId);
		});
		await fastify.redis.del(roomName);

		return { status: 1, message: 'Room deleted' };
	} else {
		return { status: 0, message: "Room doesn't exist" };
	}
};

module.exports = { createRoom, getRoom, updateRoom, deleteRoom };
