var sqlite = require('sqlite');

var SELECT_DATA = 'SELECT * FROM part';
var INSERT_DATA = 'INSERT INTO part (number, averageCost, note) VALUES (?, ?, ?)';
var UPDATE_DATA = 'UPDATE part SET averageCost = ?, note = ? WHERE number = ?';
var DELETE_DATA = 'DELETE FROM part WHERE number = ?';

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
  async loadParts() {
    try {
      const db = await openDataBase();
      return db.all(SELECT_DATA);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async insertPart(data) {
    try {
      const db = await openDataBase();
      await db.run(INSERT_DATA, data.number, data.averageCost, data.note);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deletePart(data) {
    try {
      const db = await openDataBase();
      await db.run(DELETE_DATA, data.number);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updatePart(data) {
    try {
      const db = await openDataBase();
      await db.run(UPDATE_DATA, data.averageCost, data.note, data.number);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = crud;
