var sqlite = require('sqlite');

var INSERT_DATA = 'INSERT INTO vehicleConfiguration (year, make, harnessTypeOne, harnessTypeTwo, adapterType) VALUES (?, ?, ?, ?, ?)';
var SELECT_KIT_DATA = 'SELECT p.number, p.note, kp.quantity, p.averageCost FROM kitPart kp, part p, kit k  WHERE p.number = kp.part_number AND kp.kit_id = k.id AND k.id = ? ORDER BY p.number ASC';
var SELECT_KIT_NAMES = 'SELECT id FROM kit ORDER BY id ASC';
var UPDATE_DATA = 'UPDATE vehicleConfiguration SET harnessTypeOne = ?, harnessTypeTwo = ?, adapterType = ? WHERE year = ? AND make = ?';
var DELETE_DATA = 'DELETE FROM vehicleConfiguration WHERE year = ? AND make = ?';

/* Opens database for access */
async function openDataBase() {
  try {
    return await sqlite.open('./db/database.db', {
      Promise
    })
  } catch (error) {
    return Promise.reject(error);
  }
}

/* all database interactions */
const crud = {
  async loadKitName() {
    try {
      const db = await openDataBase();
      return db.all(SELECT_KIT_NAMES);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async loadKitParts(kitNumber) {
    try {
      const db = await openDataBase();
      return db.all(SELECT_KIT_DATA, kitNumber);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = crud;
