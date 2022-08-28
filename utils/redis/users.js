const createUser = async (redis, socketID, userName, roomName) => {
  const status = await redis.setnx(
    socketID,
    JSON.stringify({
      userName,
      roomName,
    })
  );

  if (status === 1) {
    return { status, message: "User created" };
  } else {
    return { status, message: "User exists" };
  }
};

const getUser = async (redis, socketID) => {
  const user = await redis.get(socketID);

  return JSON.parse(user);
};

const deleteUser = async (redis, socketID) => {
  const status = await redis.del(socketID);

  if (status === 1) {
    return { status, message: "User deleted" };
  } else {
    return { status, message: "User doesn't exist" };
  }
};

module.exports = { createUser, getUser, deleteUser };
