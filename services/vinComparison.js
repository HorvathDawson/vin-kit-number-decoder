var crud = require('../services/dbInteraction.js');

const comparison = {
  async compare(input) {
    try {
      let database = await crud.loadAllVehicles();
      var value = [];
      var data = [];
      await input.forEach(async (vehicle, index) => {
        value[index] = await database.filter((forCompare) => {
          return forCompare.year + ':' + forCompare.make === vehicle.ModelYear + ':' + vehicle.Make;
        })[0];
        if (value[index]) {
          vehicle = Object.assign(vehicle, {
            success: true
          });
          value[index] = Object.assign(vehicle, {
            harnessType: value[index].harnessType
          });
        } else {
          vehicle = Object.assign(vehicle, {
            success: false
          });
          value[index] = Object.assign(vehicle, {
            harnessType: 'Not Found'
          });
        }
        value[index] = {
          VIN: value[index].VIN,
          make: value[index].Make,
          year: value[index].ModelYear,
          model: value[index].Model,
          engineManufacturer: value[index].EngineManufacturer,
          engineModel: value[index].EngineModel,
          kitNumber: value[index].kitPartNumber,
          harnessType: value[index].harnessType,
          success: value[index].success,
          plantLocation: value[index].PlantCountry,
          vehicleType: value[index].VehicleType,
          suggestedVIN: value[index].SuggestedVIN,
          errorCode: value[index].ErrorCode
        }
      });
      return value;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = comparison;
