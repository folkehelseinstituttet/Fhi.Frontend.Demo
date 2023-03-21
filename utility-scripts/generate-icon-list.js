const fs = require('fs');
const path = require('path');

const pathToListOfGeneratedIcons = path.join(__dirname, '..', '..', 'Fhi.Frontend.Demo', 'Fhi.Frontend.Style', 'src', 'fhi', 'icons', 'icon-list.GENERATED.md');
const generatedOutputFile = path.join(__dirname, '..', 'src', 'MOCK_DB_DATA', 'library-items', 'icons', 'icon-set.GENERATED.ts');

let listOfGeneratedIcons;

fs.readFile(pathToListOfGeneratedIcons, { encoding: 'utf-8' }, (error, data) => {
  if (error) throw error;
  listOfGeneratedIcons = data;
});

const generateIconList = function() {
  listOfGeneratedIcons = listOfGeneratedIcons.replace('```scss', '');
  listOfGeneratedIcons = listOfGeneratedIcons.replace('$included-icons: (', 'export const IncludedIcons = [').trim();
  listOfGeneratedIcons = listOfGeneratedIcons.replace(')', '];');
  listOfGeneratedIcons = listOfGeneratedIcons.replace('```', '');
  fs.writeFile(generatedOutputFile, listOfGeneratedIcons, { encoding: 'utf-8' }, error => {
    console.log(generatedOutputFile + '\ngenerated with latest icon set\n');
    if (error) throw error;
  });
}

setTimeout(generateIconList, 250);//give time to find and read file
