var sqlite = require('sqlite');

var SELECT_DATA = 'SELECT * FROM part';
var SELECT_TYPE_DATA = 'SELECT * FROM partType';
var INSERT_DATA = 'INSERT INTO part (number, partType, averageCost, note) VALUES (?, ?, ?, ?)';
var UPDATE_DATA = 'UPDATE part SET averageCost = ?, partType = ?, note = ? WHERE number = ?';
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
  async loadPartTypes() {
    try {
      const db = await openDataBase();
      return db.all(SELECT_TYPE_DATA);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async insertPart(data) {
    try {
      const db = await openDataBase();
      await db.run(INSERT_DATA, data.number, data.partType, data.averageCost, data.note);
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
      await db.run(UPDATE_DATA, data.averageCost, data.partType, data.note, data.number);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = crud;
