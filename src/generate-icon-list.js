const fs = require('fs');
const path = require('path');

const pathToListOfGeneratedIcons = path.join(__dirname, '..', '..', 'Fhi.Frontend.Demo', 'Fhi.Frontend.Style', 'src', 'fhi', 'icons', 'icon-list.GENERATED.md');
const generatedOutputFile = path.join(__dirname, 'MOCK_DB_DATA', 'library-items', 'icons', 'icon-set.GENERATED.ts');

let listOfGeneratedIcons;

fs.readFile(pathToListOfGeneratedIcons, { encoding: 'utf-8' }, (err, data) => {
  checkForErrors(err);
  listOfGeneratedIcons = data;
});

const generateIconList = function() {
  listOfGeneratedIcons = listOfGeneratedIcons.replace('```scss', '');
  listOfGeneratedIcons = listOfGeneratedIcons.replace('$included-icons: (', 'export const includedIcons = [').trim();
  listOfGeneratedIcons = listOfGeneratedIcons.replace(')', '];');
  listOfGeneratedIcons = listOfGeneratedIcons.replace('```', '');
  fs.writeFile(generatedOutputFile, listOfGeneratedIcons, { encoding: 'utf-8' }, err => {
    console.log('trying to write...');
    checkForErrors(err);
  });
}

setTimeout(generateIconList, 1000);

const checkForErrors = function(error) {
  if (error) throw error;
}
