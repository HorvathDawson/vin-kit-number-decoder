var sqlite = require('sqlite');

var INSERT_DATA = 'INSERT INTO vehicleConfiguration (year, make, harnessTypeOne, harnessTypeTwo, adapterType) VALUES (?, ?, ?, ?, ?)';
var SELECT_ALL_DATA = 'SELECT * FROM vehicleConfiguration';
var UPDATE_DATA = 'UPDATE vehicleConfiguration SET harnessTypeOne = ?, harnessTypeTwo = ?, adapterType = ? WHERE year = ? AND make = ?';
var DELETE_DATA = 'DELETE FROM vehicleConfiguration WHERE year = ? AND make = ?';

var INSERT_SPECIAL_DATA = 'INSERT INTO specialVehicleConfiguration (year, make, engine, harnessTypeOne, harnessTypeTwo, adapterType) VALUES (?, ?, ?, ?, ?, ?)';
var SELECT_ALL_SPECIAL_DATA = 'SELECT * FROM specialVehicleConfiguration';
var UPDATE_SPECIAL_DATA = 'UPDATE specialVehicleConfiguration SET harnessTypeOne = ?, harnessTypeTwo = ?, adapterType = ? WHERE engine = ? AND year = ? AND make = ?';
var DELETE_SPECIAL_DATA = 'DELETE FROM specialVehicleConfiguration WHERE year = ? AND make = ? AND engine = ? ';

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
  async loadVehicles() {
    try {
      const db = await openDataBase();
      return db.all(SELECT_ALL_DATA);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async insertVehicle(data) {
    try {
      const db = await openDataBase();
      await db.run(INSERT_DATA, data.year, data.make, data.harnessTypeOne, data.harnessTypeTwo, data.adapterType);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteVehicle(data) {
    try {
      const db = await openDataBase();
      await db.run(DELETE_DATA, data.yearId, data.makeId);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateVehicle(data) {
    try {
      const db = await openDataBase();
      await db.run(UPDATE_DATA, data.harnessTypeOne, data.harnessTypeTwo, data.adapterType,  data.yearId, data.makeId);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  /* special table interaction */
  async loadSpecialVehicles() {
    try {
      const db = await openDataBase();
      return db.all(SELECT_ALL_SPECIAL_DATA);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateSpecialVehicle(data) {
    try {
      const db = await openDataBase();
      await db.run(UPDATE_SPECIAL_DATA, data.harnessTypeOne, data.harnessTypeTwo, data.adapterType, data.engineId, data.yearId, data.makeId);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async insertSpecialVehicle(data) {
      try {
        const db = await openDataBase();
        await db.run(INSERT_SPECIAL_DATA, data.year, data.make, data.engine, data.harnessTypeOne, data.harnessTypeTwo, data.adapterType);
      } catch (error) {
        return Promise.reject(error);
      }
  },
  async deleteSpecialVehicle(data) {
    try {
      const db = await openDataBase();
      await db.run(DELETE_SPECIAL_DATA, data.yearId, data.makeId, data.engineId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = crud;
