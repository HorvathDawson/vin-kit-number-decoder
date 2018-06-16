var fs = require('fs');
var XLSX = require('xlsx');

const helper = {
  async readSpreadSheet(file) {
    var wb = await XLSX.readFile('./upload/' + file);
    return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

  },
  deleteFile(filename) {
    fs.unlink('./upload/' + filename, function(error) {
      if (error) {
        throw error;
      }
      console.log('Deleted ' + filename);
    })
  },
  async makeWorkBook() {
    var wb = XLSX.utils.book_new();
    return wb;
  },
  async addDataWb(wb, jsonData, name){
    var ws = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(wb, ws, name);
    return wb;
  }
}

module.exports = helper;
