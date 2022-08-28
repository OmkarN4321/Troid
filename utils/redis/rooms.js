const { deleteUser } = require('./users');

const createRoom = async (fastify, roomCreator, roomName) => {
	const { redis } = fastify;

	const status = await redis.setnx(
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
	const { redis } = fastify;

	const room = await redis.get(roomName);

	return JSON.parse(room);
};

const updateRoom = async (fastify, type, member, roomName) => {
	const { redis } = fastify;

	let room = await getRoom(redis, roomName);

	if (room) {
		switch (type) {
			case 'join':
				if (room.members.length === 1) {
					room.members = room.members.concat(member);
					await redis.set(roomName, JSON.stringify(room));

					return { status: 1, message: 'User joined the room' };
				} else {
					return { status: 0, message: 'Room is full' };
				}
			case 'leave':
				room.members = room.members.filter((memberId) => memberId !== member);
				await redis.set(roomName, JSON.stringify(room));

				return { status: 1, message: 'User left the room' };
			default:
				break;
		}
	} else {
		return { status: 0, message: "Room doesn't exist" };
	}
};

const deleteRoom = async (fastify, roomName) => {
	const { redis } = fastify;

	const room = await getRoom(redis, roomName);

	if (room) {
		room.members.forEach(async (memberId) => {
			await deleteUser(redis, memberId);
		});
		await redis.del(roomName);

		return { status: 1, message: 'Room deleted' };
	} else {
		return { status: 0, message: "Room doesn't exist" };
	}
};

module.exports = { createRoom, getRoom, updateRoom, deleteRoom };
