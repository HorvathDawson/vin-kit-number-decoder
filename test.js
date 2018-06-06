

var data = '1HTMMAAP08H575867;2NKHHM7HXDM964935;1FT8X3B62BEB34872;1M1AW09Y5BM015844;1M1AW09YXBM015161;1M1AW02Y5BM013604;1M1AW07Y8DM025094;1HTSCNMPXNH402804;1GC1KWEY2HF232351;2NKHHM7H5FM974663;2NKHHM7H9HM987208;2NKHHM7H9EM966161;1M1AW07Y1FM049028;1M1AW07YXEM038169;3CET2V921J5190078;3CET2V923J5190079;3CET2V92XJ5190080;2M93JMHA38W064838;2M93JMHA58W064839;2M93JMHA58W064842;2M93JMHA78W064860;2M93JMFA88W064904;2M93JMHAX8W064979;1G9TX1DH7HP492002;2NPNHD6X93M808079'

const request = require('request');

const options = {
    url: 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/',
    method: 'POST',
    headers: {
        'contentType': 'application/json'
    },
    form:  {
      format: "json",
      data: data
    }
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
/*
$.ajax({
  url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
  type: "POST",
  data: {
    format: "json",
    data: vinNumber
  },
  dataType: "json",
  success: function(result) {
    vm.vinResults = result.Results;
    vm.vinResults = result.Results.map((vinInfo, index) => {
      return Object.assign(vinInfo, vm.importedVinNumbers[index]);
    })
    console.log(vm.vinResults);
  },
  error: function(xhr, ajaxOptions, thrownError) {
    console.log(xhr.status);
    console.log(thrownError);
  }
});
*/
