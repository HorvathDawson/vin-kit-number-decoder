var sqlite = require('sqlite');

var INSERT_DATA = 'INSERT INTO regularComparison (year, make, harnessTypeOne, harnessTypeTwo, adapterType) VALUES (?, ?, ?, ?, ?)';
var SELECT_DATA = 'SELECT * FROM regularComparison WHERE year = ? AND make = ?';
var SELECT_ALL_DATA = 'SELECT * FROM regularComparison';
var UPDATE_DATA = 'UPDATE regularComparison SET harnessTypeOne = ?, harnessTypeTwo = ?, adapterType = ? WHERE year = ? AND make = ?';
var DELETE_DATA = 'DELETE FROM regularComparison WHERE year = ? AND make = ?';

var INSERT_SPECIAL_DATA = 'INSERT INTO specialComparison (year, make, engine, harnessTypeOne, harnessTypeTwo, adapterType) VALUES (?, ?, ?, ?, ?, ?)';
var SELECT_SPECIAL_DATA = 'SELECT * FROM specialComparison WHERE year = ? AND make = ? AND engine = ?';
var SELECT_ALL_SPECIAL_DATA = 'SELECT * FROM specialComparison';
var UPDATE_SPECIAL_DATA = 'UPDATE specialComparison SET harnessTypeOne = ?, harnessTypeTwo = ?, adapterType = ? WHERE engine = ? AND year = ? AND make = ?';
var DELETE_SPECIAL_DATA = 'DELETE FROM specialComparison WHERE year = ? AND make = ? AND engine = ? ';

async function openDataBase() {
  try {
    return await sqlite.open('./db/mainVinDb.db', {
      Promise
    })
  } catch (error) {
    return Promise.reject(error);
  }
}
const crud = {
  async loadAllVehicles() {
    try {
      const mainDb = await openDataBase();
      return mainDb.all(SELECT_ALL_DATA);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async loadAllSpecialVehicles() {
    try {
      const specDb = await openDataBase();
      return specDb.all(SELECT_ALL_SPECIAL_DATA);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async insertVehicle(data) {
    try {
      const mainDb = await openDataBase();
      await mainDb.run(INSERT_DATA, data.year, data.make, data.harnessTypeOne, data.harnessTypeTwo, data.adapterType);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteVehicle(data) {
    try {
      const mainDb = await openDataBase();
      await mainDb.run(DELETE_DATA, data.year, data.make);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateVehicle(data) {
    try {
      const mainDb = await openDataBase();
      await mainDb.run(UPDATE_DATA, data.harnessTypeOne, data.harnessTypeTwo, data.adapterType, data.yearId, data.makeId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = crud;
