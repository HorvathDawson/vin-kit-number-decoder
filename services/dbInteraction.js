var sqlite = require('sqlite');

var INSERT_DATA = 'INSERT INTO regularVinNumber (year, make, harnessTypeOne, harnessTypeTwo) VALUES (?, ?, ?, ?)';
var SELECT_DATA = 'SELECT * FROM regularVinNumber WHERE year = ? AND make = ?';
var SELECT_ALL_DATA = 'SELECT * FROM regularVinNumber';
var UPDATE_DATA = 'UPDATE regularVinNumber SET harnessTypeOne = ?, harnessTypeTwo = ? WHERE year = ? AND make = ?';
var DELETE_DATA = 'DELETE FROM regularVinNumber WHERE year = ? AND make = ?';
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
  async insertVehicle(data) {
    try {
      const mainDb = await openDataBase();
      await mainDb.run(INSERT_DATA, data.year, data.make, data.harnessTypeOne, data.harnessTypeTwo);
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
      await mainDb.run(UPDATE_DATA, data.harnessTypeOne, data.harnessTypeTwo, data.yearId, data.makeId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = crud;
