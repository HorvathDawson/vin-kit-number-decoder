var crudVehicle = require('../services/vehicleTableInteraction.js');
var crudHarness = require('../services/harnessTableInteraction.js');


const comparison = {
  async compare(input) {
    try {
      let mainDatabase = await crudVehicle.loadVehicles();
      let specialDatabase = await crudVehicle.loadSpecialVehicles();
      let harnessDatabase = await  crudHarness.loadHarness();

      let harnessDatabaseIndex = {};
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

      input.forEach((vehicle) => {

        // TODO: compare kit here and add all info to vehicle object


        let specialEntry = specialDatabaseIndex[(vehicle.ModelYear + ':' + vehicle.Make + ':' + vehicle.EngineModel).replace(/\s/g, '')];

        if (typeof specialEntry !== 'undefined') {
          let harnessEntryOne = harnessDatabaseIndex[specialEntry.harnessNumberOne + ":" + specialEntry.adapterNumber];
          let harnessEntryTwo = harnessDatabaseIndex[specialEntry.harnessNumberTwo + ":" + specialEntry.adapterNumber];
          if(typeof harnessEntryOne !== 'undefined'){
            specialEntry.harnessName = harnessEntryOne;
          }else if(typeof harnessEntryTwo !== 'undefined'){
            specialEntry.harnessName = harnessEntryTwo;
          }
          test(data, vehicle, specialEntry);
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
          console.log(mainEntry.harnessName);
          test(data, vehicle, mainEntry);
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
var test = function(data, vehicle, value) {
  try{
    let employee = {
      'VIN': vehicle.VIN,
      'Engine': ((vehicle.EngineManufacturer)? vehicle.EngineManufacturer : '') + ' ' + vehicle.EngineModel,
      'Make': vehicle.Make,
      'Year': vehicle.ModelYear,
      'Model': vehicle.Model,
      'Kit Number': vehicle.kitPartNumber,
      'Harness Name': value.harnessName,
      'Harness Number': value.harnessNumberOne,
      'Additional Harness Number': value.harnessNumberTwo,
      'Adapter Number': value.adapterNumber
    }
    let customer = {
      'VIN': vehicle.VIN,
      'Make': vehicle.Make,
      'Year': vehicle.ModelYear,
      'Model': vehicle.Model,
      'Kit Number': vehicle.kitPartNumber,
      'Harness Number': value.harnessNumberOne,
      'Additional Harness Number': value.harnessNumberTwo,
      'Adapter Number': value.adapterNumber
    }
    if (vehicle.ErrorCode !== '0 - VIN decoded clean. Check Digit (9th position) is correct') {
      data.errorData.push({
        'VIN': vehicle.VIN,
        'Make': vehicle.Make,
        'Year': vehicle.ModelYear,
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
