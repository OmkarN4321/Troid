const createRoom = async (redis, roomCreator, roomName) => {
  const roomObj = {
    members: [roomCreator],
  };

  const status = await redis.setnx(roomName, JSON.stringify(roomObj));

  if (status === 1) {
    return { status, message: "Room created" };
  } else {
    return { status, message: "Room exists" };
  }
};

const getRoom = async (redis, roomName) => {
  const room = await redis.get(roomName);

  return JSON.parse(room);
};

const updateRoom = async (redis, type, member, roomName) => {
  let room = await getRoom(redis, roomName);

  if (!room) return { status: 0, message: "Room doesn't exist" };

  if (type === "join") {
    if (room.members.length === 1) {
      room.members = room.members.concat(member);
      await redis.set(roomName, JSON.stringify(room));

      return { status: 1, message: "User joined the room" };
    } else {
      return { status: 0, message: "Room is full" };
    }
  } else if (type === "leave") {
    room.members = room.members.concat(member);
    await redis.set(roomName, JSON.stringify(room));

    return { status: 1, message: "User left the room" };
  }
};

const deleteRoom = async (redis, roomName) => {
  const status = await redis.del(roomName);

  if (status === 1) {
    return { status, message: "Room deleted" };
  } else {
    return { status, message: "Room doesn't exist" };
  }
};

module.exports = { createRoom, getRoom, updateRoom, deleteRoom };
