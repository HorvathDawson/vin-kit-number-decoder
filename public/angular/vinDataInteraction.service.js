angular.module("myApp")
  .service("vinDataInteraction", function($http) {
      this.receiveData = receiveData;
      this.deleteVehicle = deleteVehicle;
      this.updateVehicle = updateVehicle;
      this.insertVehicle = insertVehicle;
      this.insertSpecialVehicle = insertSpecialVehicle;

      function receiveData() {
        return $http({
          method: 'GET',
          url: '/crud/loadAll'
        })
      };

      function deleteVehicle(vehicle, type) {
        var url = '/crud/delete';
        if (type) {
          url = url + type;
        }
        return $http({
          method: 'POST',
          url: url,
          data: vehicle,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      };

      function updateVehicle(selected, vehicle, type) {
        var url = '/crud/update';
        if (type) {
          url = url + type;
        }
        var updateData = {
          harnessTypeOne: vehicle.harnessTypeOne,
          harnessTypeTwo: vehicle.harnessTypeTwo,
          adapterType: vehicle.adapterType,
          yearId: selected.year,
          makeId: selected.make,
          engineId: selected.engine
        }
        return $http({
          method: 'POST',
          url: url,
          data: updateData,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      };

      function insertSpecialVehicle(insertData) {
        return $http({
          method: 'POST',
          url: '/crud/insert/special',
          data: insertData,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      }

      function insertVehicle(insertData) {
        return $http({
          method: 'POST',
          url: '/crud/insert',
          data: insertData,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      }
  })
