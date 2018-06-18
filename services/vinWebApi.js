/* POST communication with online vin API decoder */

var path = require('path');
var request = require('request');
var comparison = require('../services/vinComparison.js');

const test = {
  async getInfo(joinedVins, vinData){
    var vinApi = {
      url: 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/',
      method: 'POST',
      headers: {
        'contentType': 'application/json'
      },
      form: {
        format: "json",
        data: joinedVins
      }
    };
    return request(vinApi, function(err, respond, body) {
      let json = JSON.parse(body);
      var test = json.Results.map((vinInfo, index) => {
        return Object.assign(vinInfo, vinData[index]);
      })
      var data = comparison.compare(test);
      console.log(data);
    });
  }
}

module.exports = test;
