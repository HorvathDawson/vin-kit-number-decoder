var crudVehicle = require('../services/vehicleTableInteraction.js');
var crudHarness = require('../services/harnessTableInteraction.js');
var crudKitParts = require('../services/kitTableInteraction.js');


const comparison = {
  async compare(input) {
    try {
      let mainDatabase = await crudVehicle.loadVehicles();
      let specialDatabase = await crudVehicle.loadSpecialVehicles();
      let harnessDatabase = await  crudHarness.loadHarness();
      let kitPartsDatabase = await  crudKitParts.loadKitParts(); // object with key being kit number and each keys value being a array of objects which are parts
      let kitInfoDatabase = await crudKitParts.loadKitName();

      let harnessDatabaseIndex = {};
      let kitInfoDatabaseIndex = {};
      let mainDatabaseIndex = {};
      let specialDatabaseIndex = {};
      var data = {
        'errorData': [],
        'employeeData': [],
        'customerData': []
      };

      mainDatabase.forEach((x) => mainDatabaseIndex[(x.year + ':' + x.make).replace(/\s/g, '')] = x);
      specialDatabase.forEach((x) => specialDatabaseIndex[(x.year + ':' + x.make + ':' + x.engine).replace(/\s/g, '')] = x);
      harnessDatabase.forEach((x) => harnessDatabaseIndex[x.mainHarness + ":" + x.adapterHarness] = x.harnessName);
      kitInfoDatabase.forEach((x) => kitInfoDatabaseIndex[x.id] = x.hasEcm);

      input.forEach((vehicle) => {
        kitPartsDatabase[vehicle.kitPartNumber].forEach((part) => {
          vehicle[part.partType] = part.number;
        })
        let specialEntry = specialDatabaseIndex[(vehicle.ModelYear + ':' + vehicle.Make + ':' + vehicle.EngineModel).replace(/\s/g, '')];

        if (typeof specialEntry !== 'undefined') {
          let harnessEntryOne = harnessDatabaseIndex[specialEntry.harnessNumberOne + ":" + specialEntry.adapterNumber];
          let harnessEntryTwo = harnessDatabaseIndex[specialEntry.harnessNumberTwo + ":" + specialEntry.adapterNumber];

          if(typeof harnessEntryOne !== 'undefined'){
            specialEntry.harnessName = harnessEntryOne;
          }else if(typeof harnessEntryTwo !== 'undefined'){
            specialEntry.harnessName = harnessEntryTwo;
          }
          test(data, vehicle, specialEntry, kitInfoDatabaseIndex);
          return;
        }

        let mainEntry = mainDatabaseIndex[(vehicle.ModelYear + ':' + vehicle.Make).replace(/\s/g, '')];

        if (typeof mainEntry !== 'undefined') {
          let harnessEntryOne = harnessDatabaseIndex[mainEntry.harnessNumberOne + ":" + mainEntry.adapterNumber];
          let harnessEntryTwo = harnessDatabaseIndex[mainEntry.harnessNumberTwo + ":" + mainEntry.adapterNumber];

          if(typeof harnessEntryOne !== 'undefined'){
            mainEntry.harnessName = harnessEntryOne;
          }else if(typeof harnessEntryTwo !== 'undefined'){
            mainEntry.harnessName = harnessEntryTwo;
          }
          test(data, vehicle, mainEntry, kitInfoDatabaseIndex);
          return;
        }
        if(vehicle.ErrorCode == '0 - VIN decoded clean. Check Digit (9th position) is correct'){
          vehicle.ErrorCode = 'Vehicle was not in harness database';
        }
        data.errorData.push({
          'VIN': vehicle.VIN,
          'Make': vehicle.Make,
          'Year': vehicle.ModelYear,
          'Kit Number': vehicle.kitPartNumber,
          'Suggested VIN': vehicle.SuggestedVIN,
          'Error Code': vehicle.ErrorCode
        });
        return;
      });
      return data;

    } catch (error) {
      console.log(error);
    }
  }
}
/* sets values in objects for worksheets*/
var test = function(data, vehicle, value, kitInfoDatabaseIndex) {
  try{
    let employee = {
      'VIN': vehicle.VIN,
      'Year': vehicle.ModelYear,
      'Make': vehicle.Make,
      'Model': vehicle.Model,
      'Engine': vehicle.EngineManufacturer + ' ' + vehicle.EngineModel,
      'Kit Number': vehicle.kitPartNumber,
      'Has ECM': kitInfoDatabaseIndex[vehicle.kitPartNumber] ? 'Has ECM' : 'No ECM',
      'Harness Name': value.harnessName,
      'Harness Number': value.harnessNumberOne,
      'Additional Harness Number': value.harnessNumberTwo,
      'Adapter Number': value.adapterNumber
    }
    let customer = {
      'VIN': vehicle.VIN,
      'Year': vehicle.ModelYear,
      'Make': vehicle.Make,
      'Model': vehicle.Model,
      'Kit Number': vehicle.kitPartNumber,
      'Harness Number': kitInfoDatabaseIndex[vehicle.kitPartNumber] ? value.harnessNumberOne : 'No Ecm',
      'Adapter Number': value.adapterNumber ? value.adapterNumber :'N/A',
      'Cradle Assembly': vehicle.Cradle ? vehicle.Cradle :'N/A',
      'Case': vehicle.Case ? vehicle.Case :'N/A',
      'Cable': vehicle.Cable ? vehicle.Cable :'N/A',
      'Tablet': vehicle.Tablet ? vehicle.Tablet :'N/A',
      'Navilink': vehicle.Navilink ? vehicle.Navilink :'N/A',
      'Sub Kit': vehicle.Other ? vehicle.Other :'N/A',
      'VNA BlueTooth Module': vehicle.VNA ? vehicle.VNA :'N/A',
    }
    if (vehicle.ErrorCode !== '0 - VIN decoded clean. Check Digit (9th position) is correct') {
      data.errorData.push({
        'VIN': vehicle.VIN,
        'Year': vehicle.ModelYear,
        'Make': vehicle.Make,
        'Kit Number': vehicle.kitPartNumber,
        'Suggested VIN': vehicle.SuggestedVIN,
        'Error Code': vehicle.ErrorCode
      });
    } else {
      if(!/[a-zA-Z]/.test(value.harnessNumberOne)){
        data.employeeData.push(employee);
        data.customerData.push(customer);
      }else{
        data.employeeData.unshift(employee);
        data.customerData.unshift(customer);
      }

    }
  }catch(err){
    console.log(err);
  }

}
module.exports = comparison;
