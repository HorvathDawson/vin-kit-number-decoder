var sqlite = require('sqlite');

var INSERT_PART_DATA = 'INSERT INTO kitPart (kit_id, part_number, quantity) VALUES (?, ?, ?)';
var INSERT_KIT = 'INSERT INTO kit (id, hasEcm) VALUES (?, ?)';
var SELECT_KIT_DATA = 'SELECT p.number, p.note, kp.quantity, p.averageCost FROM kitPart kp, part p, kit k  WHERE p.number = kp.part_number AND kp.kit_id = k.id AND k.id = ? ORDER BY p.number ASC';
var SELECT_KIT_NAMES = 'SELECT id, hasEcm FROM kit ORDER BY id ASC';
var DELETE_PART = 'DELETE FROM kitPart WHERE kit_id = ? AND part_number = ?';
var DELETE_KIT_PARTS = 'DELETE FROM kitPart WHERE kit_id = ?';
var DELETE_KIT = 'DELETE FROM kit WHERE id = ?';
var UPDATE_PART_QUANTITY = 'UPDATE kitPart SET quantity = ? WHERE part_number =  ? AND kit_id = ?';
var UPDATE_ECM = 'UPDATE kit SET hasEcm = ? WHERE id = ?'

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
  async loadKitPart(kitNumber) {
    try {
      const db = await openDataBase();
      return db.all(SELECT_KIT_DATA, kitNumber);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async loadKitParts() {
    try {
      const db = await openDataBase();
      var kits = await db.all(SELECT_KIT_NAMES);
      var kitParts = {};
      for (let kit of kits){
        kitParts[kit.id] = await db.all(SELECT_KIT_DATA, kit.id);
      }
      return kitParts;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateQuantity(data) {
    try {
      const db = await openDataBase();
      await db.run(UPDATE_PART_QUANTITY, data.quantity, data.partNumber, data.kitId);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateEcm(data) {
    try {
      const db = await openDataBase();
      await db.run(UPDATE_ECM,  data.hasEcm, data.kitId);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async insertKitPart(data) {
    try {
      const db = await openDataBase();
      await db.run(INSERT_PART_DATA, data.kitId, data.partNumber, data.quantity);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async insertKit(data) {
    try {
      const db = await openDataBase();
      await db.run(INSERT_KIT, data.kitId, data.hasEcm);
      for (let part of data.parts){
        console.log(part);
        await db.run(INSERT_PART_DATA, data.kitId, part.number, part.quantity);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deletePart(data) {
    try {
      const db = await openDataBase();
      await db.run(DELETE_PART, data.kitId, data.partNumber);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteKit(kitId) {
    try {
      const db = await openDataBase();
      await db.run(DELETE_KIT_PARTS, kitId);
      await db.run(DELETE_KIT, kitId);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteKitPart(data) {
    try {
      const db = await openDataBase();
      await db.run(DELETE_PART, data.kitId, data.partNumber);
    } catch (error) {
      return Promise.reject(error);
    }
  },
}

module.exports = crud;
