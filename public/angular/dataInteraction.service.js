angular.module("myApp")
  .service("dataInteraction", function($http) {
      this.receiveSpecialData = receiveSpecialData;
      this.receiveNormalData = receiveNormalData;
      this.deleteVehicle = deleteVehicle;
      this.updateVehicle = updateVehicle;
      this.insertVehicle = insertVehicle;
      this.insertSpecialVehicle = insertSpecialVehicle;
      this.receiveHarnessData = receiveHarnessData;
      this.updateHarness = updateHarness;
      this.insertHarness = insertHarness;
      this.deleteHarness = deleteHarness;

      function receiveNormalData() {
        return $http({
          method: 'GET',
          url: '/vinCrud/loadNormal'
        })
      };

      function receiveSpecialData() {
        return $http({
          method: 'GET',
          url: '/vinCrud/loadSpecial'
        })
      };

      function receiveHarnessData() {
        return $http({
          method: 'GET',
          url: '/harnessCrud/load'
        })
      };

      function deleteVehicle(vehicle, type) {
        var url = '/vinCrud/delete';
        if (type) {
          url = url + type;
        }else{
          url = url + '/normal';
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

      function updateVehicle(vehicle, type) {
        var url = '/vinCrud/update';
        if (type) {
          url = url + type;
        }else{
          url = url + '/normal';
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

      function insertSpecialVehicle(insertData) {
        return $http({
          method: 'POST',
          url: '/vinCrud/insert/special',
          data: insertData,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      };

      function insertVehicle(insertData) {
        return $http({
          method: 'POST',
          url: '/vinCrud/insert/normal',
          data: insertData,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      };
      function insertHarness(insertData) {
        return $http({
          method: 'POST',
          url: '/harnessCrud/insert',
          data: insertData,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      };
      function deleteHarness(harness) {
        return $http({
          method: 'POST',
          url: '/harnessCrud/delete',
          data: harness,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      };

      function updateHarness(harness) {
        return $http({
          method: 'POST',
          url: '/harnessCrud/update',
          data: harness,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      };
  })
