const fs = require('fs');
const sessions = require('../database/session.json');

exports.createSession = (sessionID, userObj) => {
  sessions[sessionID] = userObj;
  // var SESSIONS called sessionID is equal to the USER object that is passed

  fs.writeFileSync('./database/session.json', JSON.stringify(sessions));
  // writes it all down on the DB

  return sessions[sessionID]; //returns 
};

exports.getSession = (sessionID) => {
  return sessions[sessionID];
};

exports.logOut = () => {
  sessionID = this.getSession();
  console.log(sessionID)
  fs.unlinkSync(sessionID)
}