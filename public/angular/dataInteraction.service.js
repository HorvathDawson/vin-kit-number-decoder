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
    this.receiveKitNames = receiveKitNames;
    this.receiveKitPartsData = receiveKitPartsData;
    this.receivePartsData = receivePartsData;
    this.insertPart = insertPart;
    this.deletePart = deletePart;
    this.updatePart = updatePart;
    this.receiveKitPartData = receiveKitPartData;
    this.insertKit = insertKit;
    this.deleteKit = deleteKit;
    this.deleteKitPart = deleteKitPart;
    this.insertKitPart = insertKitPart;
    this.updateQuantity = updateQuantity;
    this.updateEcm = updateEcm;

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

    function receivePartsData() {
      return $http({
        method: 'GET',
        url: '/partsCrud/load'
      })
    };
    function receiveHarnessData() {
      return $http({
        method: 'GET',
        url: '/harnessCrud/load'
      })
    };

    function receiveKitNames() {
      return $http({
        method: 'GET',
        url: '/kitCrud/loadNames'
      })
    };

    function receiveKitPartData(kitNumber) {
      return $http({
        method: 'POST',
        data: {
          kitNumber: kitNumber
        },
        url: '/kitCrud/loadKitPart'
      })
    };

    function receiveKitPartsData() {
      return $http({
        method: 'GET',
        url: '/kitCrud/loadKitParts'
      })
    };


    /* Vehicle Crud*/
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

    function updateVehicle(vehicle, type) {
      var url = '/vinCrud/update';
      if (type) {
        url = url + type;
      } else {
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

    function deleteVehicle(vehicle, type) {
      var url = '/vinCrud/delete';
      if (type) {
        url = url + type;
      } else {
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


    /*Harness Name CRUD*/
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


    /*Parts CRUD*/


    function insertPart(insertData) {
      return $http({
        method: 'POST',
        url: '/partsCrud/insert',
        data: insertData,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    };

    function deletePart(part) {
      return $http({
        method: 'POST',
        url: '/partsCrud/delete',
        data: part,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    };

    function updatePart(part) {
      return $http({
        method: 'POST',
        url: '/partsCrud/update',
        data: part,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    };

    /* kit Crud */

    function insertKit(insertData) {
      return $http({
        method: 'POST',
        url: '/kitCrud/insertKit',
        data: insertData,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    };
    function insertKitPart(insertData) {
      return $http({
        method: 'POST',
        url: '/kitCrud/insertKitPart',
        data: insertData,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    };

    function deleteKit(kitId) {
      return $http({
        method: 'POST',
        url: '/kitCrud/deleteKit',
        data: {kitId: kitId},
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    };
    function deleteKitPart(data) {
      return $http({
        method: 'POST',
        url: '/kitCrud/deletePart',
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    };
    function updateQuantity(data) {
      return $http({
        method: 'POST',
        url: '/kitCrud/updateQuantity',
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    };
    function updateEcm(data) {
      return $http({
        method: 'POST',
        url: '/kitCrud/updateEcm',
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    };

  })
