const fs = require('fs');
const path = require('path');

const pathToListOfGeneratedIcons = path.join(__dirname, '..', '..', 'Fhi.Frontend.Style', 'src', 'icons', '_icon-map.GENERATED.scss');
// const listOfGenaratedIcons = fs.readFile(pathToListOfGeneratedIcons);

fs.readFile(pathToListOfGeneratedIcons, (err, data) => {
  if (err) throw err;
  console.log(data);
});

const generateIconList = function() {
  // console.log(listOfGenaratedIcons);
}

generateIconList();
