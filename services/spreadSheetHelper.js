var fs = require('fs');
var XLSX = require('xlsx');

const helper = {
  async readSpreadSheet(file) {
    var wb = XLSX.readFile('./upload/' + file);
    return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

  },
  async readVinNumbers(file) {
    var vinData = await helper.readSpreadSheet(file)
    return await vinData.map((vinObject) => {
      return vinObject.VIN;
    });
  },
  async joinVinNumbers(file) {
    var vinData = await helper.readVinNumbers(file)
    return vinData.join(';');
  },
  deleteFile(filename) {
    fs.unlink('./upload/' + filename, function(error) {
      if (error) {
        throw error;
      }
      console.log('Deleted ' + filename);
    })
  },
  async makeWorkBook(jsonData) {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(wb, ws, 'VinData');
    return wb
  }
}

module.exports = helper;
