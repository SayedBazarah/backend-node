const socketBytes = new Map();

module.exports = (req, res, next) => {
  req.socketProgress = getSocketProgress(req.socket);
  console.log(req.socketProgress);
  next();
};

/**
 * return kb read delta for given socket
 */
function getSocketProgress(socket) {
  const currBytesRead = socket.bytesRead;
  let prevBytesRead;
  if (!socketBytes.has(socket)) {
    prevBytesRead = 0;
  } else {
    prevBytesRead = socketBytes.get(socket).prevBytesRead;
  }
  socketBytes.set(socket, { prevBytesRead: currBytesRead });
  return (currBytesRead - prevBytesRead) / 1024;
}
