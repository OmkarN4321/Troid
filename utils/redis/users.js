const createUser = async (fastify, socketId, userName, roomName) => {
	const status = await fastify.redis.setnx(
		socketId,
		JSON.stringify({
			userName,
			roomName
		})
	);

	if (status === 1) {
		return { status, message: 'User created' };
	} else {
		return { status, message: 'User exists' };
	}
};

const getUser = async (fastify, socketID) => {
	const user = await fastify.redis.get(socketID);

	return JSON.parse(user);
};

const deleteUser = async (fastify, socketID) => {
	const status = await fastify.redis.del(socketID);

	if (status === 1) {
		return { status, message: 'User deleted' };
	} else {
		return { status, message: "User doesn't exist" };
	}
};

module.exports = { createUser, getUser, deleteUser };
