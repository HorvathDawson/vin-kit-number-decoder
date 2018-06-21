var crud = require('../services/vehicleDbInteraction.js');


var test = function(data, vehicle, value) {
  try{
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
      data.employeeData.push({
        'VIN': vehicle.VIN,
        'Engine Manufacturer': vehicle.EngineManufacturer,
        'Engine Model': vehicle.EngineModel,
        'Make': vehicle.Make,
        'Year': vehicle.ModelYear,
        'Model': vehicle.Model,
        'Vehicle Type': vehicle.VehicleType,
        'Plant Location': vehicle.PlantCountry,
        'Kit Number': vehicle.kitPartNumber,
        'Harness Type': value.harnessTypeOne,
        'Additional Harness Type': value.harnessTypeTwo,
        'Adapter Type': value.adapterType
      });
      data.customerData.push({
        'VIN': vehicle.VIN,
        'Make': vehicle.Make,
        'Year': vehicle.ModelYear,
        'Model': vehicle.Model,
        'Vehicle Type': vehicle.VehicleType,
        'Kit Number': vehicle.kitPartNumber,
        'Harness Type': value.harnessTypeOne,
        'Additional Harness Type': value.harnessTypeTwo,
        'Adapter Type': value.adapterType
      });
    }
  }catch(err){
    console.log(err);
  }

}
const comparison = {
  async compare(input) {
    try {
      let mainDatabase = await crud.loadVehicles();
      let specialDatabase = await crud.loadSpecialVehicles();

      let mainDatabaseIndex = {};
      let specialDatabaseIndex = {};
      var data = {
        'errorData': [],
        'employeeData': [],
        'customerData': []
      };

      mainDatabase.forEach((x) => mainDatabaseIndex[(x.year + ':' + x.make).replace(/\s/g, '')] = x);
      specialDatabase.forEach((x) => specialDatabaseIndex[(x.year + ':' + x.make + ':' + x.engine).replace(/\s/g, '')] = x);


      input.forEach((vehicle) => {
        let specialEntry = specialDatabaseIndex[(vehicle.ModelYear + ':' + vehicle.Make + ':' + vehicle.EngineModel).replace(/\s/g, '')];

        if (typeof specialEntry !== 'undefined') {
          test(data, vehicle, specialEntry);
          return;
        }

        let mainEntry = mainDatabaseIndex[(vehicle.ModelYear + ':' + vehicle.Make).replace(/\s/g, '')];

        if (typeof mainEntry !== 'undefined') {
          test(data, vehicle, mainEntry);
          // do your something
          return;
        }
        // do your error case
        let errorEntry = {
          harnessTypeOne: 'Not Found',
          harnessTypeTwo: 'Not Found',
          adapterType: 'Not Found'
        };
        test(data, vehicle, errorEntry);
        return;
      });
      console.log(data);
      return data;

    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = comparison;
