var sqlite = require('sqlite');

var INSERT_DATA = 'INSERT INTO regularVinNumber (year, make, harnessType) VALUES (?, ?, ?)';
var SELECT_DATA = 'SELECT * FROM regularVinNumber WHERE year = ? AND make = ?';
var SELECT_ALL_DATA = 'SELECT * FROM regularVinNumber';
var UPDATE_DATA = 'UPDATE regularVinNumber SET harnessType = ? WHERE year = ? AND make = ?';
var DELETE_DATA = 'DELETE FROM regularVinNumber WHERE year = ? AND make = ?';
async function openDataBase() {
  try{
    return await sqlite.open('./db/mainVinDb.db', { Promise })
  } catch(error) {
    return Promise.reject(error);
  }
}
const crud = {
  loadAllVehicles: async function() {
    try{
      const mainDb = await openDataBase();
      return mainDb.all(SELECT_ALL_DATA);
    } catch(error) {
      return Promise.reject(error);
    }
  },
  insertVehicle: async function(data) {
    try {
      const mainDb = await openDataBase();
      await mainDb.run( INSERT_DATA, data.year, data.make, data.harnessType);
    } catch(error) {
      return Promise.reject(error);
    }
  },
  deleteVehicle: async function(data) {
    try {
      const mainDb = await openDataBase();
      await mainDb.run( DELETE_DATA, data.year, data.make);
    } catch(error) {
      return Promise.reject(error);
    }
  },
  updateVehicle: async function(data) {
    try {
      const mainDb = await openDataBase();
      await mainDb.run( UPDATE_DATA, data.harnessType, data.yearId, data.makeId);
    } catch(error) {
      return Promise.reject(error);
    }
  }
}

module.exports = crud;
