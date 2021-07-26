const fs = require('fs');
const sessions = require('../database/session.json');

exports.createSession = (sessionID, obj) => {
  sessions[sessionID] = obj;

  fs.writeFileSync('./database/session.json', JSON.stringify(sessions));

  return sessions[sessionID];
};

exports.getSession = (sessionID) => {
  return sessions[sessionID];
};
