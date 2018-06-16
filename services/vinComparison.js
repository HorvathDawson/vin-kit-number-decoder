var crud = require('../services/dbInteraction.js');


var test = function(data, vehicle, value) {
  try{
    if (vehicle.ErrorCode !== '0 - VIN decoded clean. Check Digit (9th position) is correct') {
      console.log(data.errorData);
      console.log('here');
      data.errorData.push({
        VIN: vehicle.VIN,
        make: vehicle.Make,
        year: vehicle.ModelYear,
        kitNumber: vehicle.kitPartNumber,
        suggestedVIN: vehicle.SuggestedVIN,
        errorCode: vehicle.ErrorCode
      });
    } else {
      data.employeeData.push({
        VIN: vehicle.VIN,
        engineManufacturer: vehicle.EngineManufacturer,
        engineModel: vehicle.EngineModel,
        make: vehicle.Make,
        year: vehicle.ModelYear,
        model: vehicle.Model,
        vehicleType: vehicle.VehicleType,
        plantLocation: vehicle.PlantCountry,
        kitNumber: vehicle.kitPartNumber,
        harnessTypeOne: value.harnessTypeOne,
        harnessTypeTwo: value.harnessTypeTwo,
        adapterType: value.adapterType
      });
      data.customerData.push({
        VIN: vehicle.VIN,
        make: vehicle.Make,
        year: vehicle.ModelYear,
        model: vehicle.Model,
        vehicleType: vehicle.VehicleType,
        kitNumber: vehicle.kitPartNumber,
        harnessTypeOne: value.harnessTypeOne,
        harnessTypeTwo: value.harnessTypeTwo,
        adapterType: value.adapterType
      });
    }
  }catch(err){
    console.log(err);
  }

}
const comparison = {
  async compare(input) {
    try {
      let mainDatabase = await crud.loadAllVehicles();
      let specialDatabase = await crud.loadAllSpecialVehicles();

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


/*
await input.forEach(async (vehicle, index) => {
  value = mainDatabase.filter((forCompare) => {
    let dataBaseValues = forCompare.year + ':' + forCompare.make;
    let vehicleValues = vehicle.ModelYear + ':' + vehicle.Make;
    return dataBaseValues.replace(/\s/g,'') === vehicleValues.replace(/\s/g,'');
  })[0];
  console.log(value);

  value = specialDatabase.filter((forCompare) => {
    let dataBaseValues = forCompare.year + ':' + forCompare.make + ':' + forCompare.engine;
    let vehicleValues = vehicle.ModelYear + ':' + vehicle.Make + ':' + vehicle.EngineModel;
    return dataBaseValues.replace(/\s/g,'') === vehicleValues.replace(/\s/g,'');
  })[0];
  console.log(value);

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
}); */
//return(data);
//return value;
