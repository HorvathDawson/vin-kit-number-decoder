var sqlite = require('sqlite');

var INSERT_DATA = 'INSERT INTO harnessName (harnessName, mainHarness, adapterHarness) VALUES (?, ?, ?)';
var SELECT_ALL_DATA = 'SELECT * FROM harnessName';
var UPDATE_DATA = 'UPDATE harnessName SET harnessName = ?, mainHarness = ?, adapterHarness = ? WHERE ROWID = ?';
var DELETE_DATA = 'DELETE FROM harnessName WHERE ROWID = ?';
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
  async loadHarness() {
    try {
      const db = await openDataBase();
      return db.all(SELECT_ALL_DATA);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async insertHarness(data) {
    try {
      const db = await openDataBase();
      await db.run(INSERT_DATA, data.harnessName, data.mainHarness, data.adapterHarness);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteHarness(data) {
    try {
      const db = await openDataBase();
      await db.run(DELETE_DATA, data.ROWID);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateHarness(data) {
    try {
      const db = await openDataBase();
      await db.run(UPDATE_DATA, data.harnessName, data.mainHarness,  data.adapterHarness, data.ROWID);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = crud;
