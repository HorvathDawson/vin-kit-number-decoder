var crud = require('../services/dbInteraction.js');

const comparison = {
  async compare(input) {
    try {
      let database = await crud.loadAllVehicles();
      var value = [];
      var data = {
        customerData: [],
        employeeData: [],
        errorData: []
      };
      await input.forEach(async (vehicle, index) => {
        value[index] = await database.filter((forCompare) => {
          return forCompare.year + ':' + forCompare.make === vehicle.ModelYear + ':' + vehicle.Make;
        })[0];
        if (value[index]) {
          vehicle = Object.assign(vehicle, {
            success: true
          });
          value[index] = Object.assign(vehicle, {
            harnessTypeOne: value[index].harnessTypeOne,
            harnessTypeTwo: value[index].harnessTypeTwo
          });
        } else {
          vehicle = Object.assign(vehicle, {
            success: false
          });
          value[index] = Object.assign(vehicle, {
            harnessTypeOne: 'Not Found',
            harnessTypeTwo: 'Not Found'
          });
        }
        // TODO: create a sheet for each situation error, employee, and customer data

        if(value[index].ErrorCode !== '0 - VIN decoded clean. Check Digit (9th position) is correct'){
          data.errorData.push({
            VIN: value[index].VIN,
            make: value[index].Make,
            year: value[index].ModelYear,
            engineManufacturer: value[index].EngineManufacturer,
            engineModel: value[index].EngineModel,
            kitNumber: value[index].kitPartNumber,
            suggestedVIN: value[index].SuggestedVIN,
            errorCode: value[index].ErrorCode
          })
        }else{
          data.employeeData.push({
            success: value[index].success,
            VIN: value[index].VIN,
            engineManufacturer: value[index].EngineManufacturer,
            engineModel: value[index].EngineModel,
            make: value[index].Make,
            year: value[index].ModelYear,
            model: value[index].Model,
            vehicleType: value[index].VehicleType,
            plantLocation: value[index].PlantCountry,
            kitNumber: value[index].kitPartNumber,
            harnessTypeOne: value[index].harnessTypeOne,
            harnessTypeTwo: value[index].harnessTypeTwo,
          });
          data.customerData.push({
            VIN: value[index].VIN,
            make: value[index].Make,
            year: value[index].ModelYear,
            model: value[index].Model,
            success: value[index].success,
            vehicleType: value[index].VehicleType,
            kitNumber: value[index].kitPartNumber,
            harnessTypeOne: value[index].harnessTypeOne,
            harnessTypeTwo: value[index].harnessTypeTwo,
          });
        }
        /*
        value[index] = {
          VIN: value[index].VIN,
          make: value[index].Make,
          year: value[index].ModelYear,
          model: value[index].Model,
          engineManufacturer: value[index].EngineManufacturer,
          engineModel: value[index].EngineModel,
          kitNumber: value[index].kitPartNumber,
          harnessTypeOne: value[index].harnessTypeOne,
          harnessTypeTwo: value[index].harnessTypeTwo,
          success: value[index].success,
          plantLocation: value[index].PlantCountry,
          vehicleType: value[index].VehicleType,
          suggestedVIN: value[index].SuggestedVIN,
          errorCode: value[index].ErrorCode
        } */
      });
      return(data);
      //return value;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = comparison;
