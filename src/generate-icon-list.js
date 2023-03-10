const fs = require('fs');
const path = require('path');

const pathToListOfGeneratedIcons = path.join(__dirname, '..', '..', 'Fhi.Frontend.Demo', 'Fhi.Frontend.Style', 'src', 'fhi', 'icons', '_icon-map.GENERATED.scss');

let listOfGeneratedIcons = fs.readFile(pathToListOfGeneratedIcons, { encoding: 'utf-8' }, (error, data) => {
  if (error) throw error;
  return data;
});
console.log(listOfGeneratedIcons);

const generateIconList = function() {
  // console.log(listOfGenaratedIcons);
}

generateIconList();
