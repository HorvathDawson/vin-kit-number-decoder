var crud = require('../services/dbInteraction.js');

const comparison = {
  async compare(input) {
    try {
      let database = await crud.loadAllVehicles();
      var value;
      var data = {
        customerData: [],
        employeeData: [],
        errorData: []
      };
      await input.forEach(async (vehicle, index) => {
        value = await database.filter((forCompare) => {
          return forCompare.year + ':' + forCompare.make === vehicle.ModelYear + ':' + vehicle.Make;
        })[0];
        if (value) {
          vehicle = Object.assign(vehicle, {
            success: true
          });
          value = Object.assign(vehicle, {
            harnessTypeOne: value.harnessTypeOne,
            harnessTypeTwo: value.harnessTypeTwo,
            adapterType: value.adapterType
          });
        } else {
          vehicle = Object.assign(vehicle, {
            success: false
          });
          value = Object.assign(vehicle, {
            harnessTypeOne: 'Not Found',
            harnessTypeTwo: 'Not Found',
            adapterType: 'Not Found'
          });
        }

        if(value.ErrorCode !== '0 - VIN decoded clean. Check Digit (9th position) is correct'){
          data.errorData.push({
            VIN: value.VIN,
            make: value.Make,
            year: value.ModelYear,
            engineManufacturer: value.EngineManufacturer,
            engineModel: value.EngineModel,
            kitNumber: value.kitPartNumber,
            suggestedVIN: value.SuggestedVIN,
            errorCode: value.ErrorCode
          })
        }else{
          data.employeeData.push({
            success: value.success,
            VIN: value.VIN,
            engineManufacturer: value.EngineManufacturer,
            engineModel: value.EngineModel,
            make: value.Make,
            year: value.ModelYear,
            model: value.Model,
            vehicleType: value.VehicleType,
            plantLocation: value.PlantCountry,
            kitNumber: value.kitPartNumber,
            harnessTypeOne: value.harnessTypeOne,
            harnessTypeTwo: value.harnessTypeTwo,
            adapterType: value.adapterType
          });
          data.customerData.push({
            VIN: value.VIN,
            make: value.Make,
            year: value.ModelYear,
            model: value.Model,
            success: value.success,
            vehicleType: value.VehicleType,
            kitNumber: value.kitPartNumber,
            harnessTypeOne: value.harnessTypeOne,
            harnessTypeTwo: value.harnessTypeTwo,
            adapterType: value.adapterType
          });
        }
      });
      return(data);
      //return value;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = comparison;
