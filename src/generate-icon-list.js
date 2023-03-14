const fs = require('fs');
const path = require('path');

// *** comment line 5 in and line 6 out for local testing when doing changes on the icon set
const pathToListOfGeneratedIcons = path.join(__dirname, '..', '..', 'Fhi.Frontend.Demo', 'Fhi.Frontend.Style', 'src', 'fhi', 'icons', 'icon-list.GENERATED.md');
// const pathToListOfGeneratedIcons = path.join(__dirname, '..', 'node_modules', '@folkehelseinstituttet', 'style', 'src', 'fhi', 'icons', 'icon-list.GENERATED.md');
const generatedOutputFile = path.join(__dirname, 'MOCK_DB_DATA', 'library-items', 'icons', 'icon-set.GENERATED.ts');

let listOfGeneratedIcons;

fs.readFile(pathToListOfGeneratedIcons, { encoding: 'utf-8' }, (error, data) => {
  if (error) throw error;
  listOfGeneratedIcons = data;
});

const generateIconList = function() {
  listOfGeneratedIcons = listOfGeneratedIcons.replace('```scss', '');
  listOfGeneratedIcons = listOfGeneratedIcons.replace('$included-icons: (', 'export const includedIcons = [').trim();
  listOfGeneratedIcons = listOfGeneratedIcons.replace(')', '];');
  listOfGeneratedIcons = listOfGeneratedIcons.replace('```', '');
  fs.writeFile(generatedOutputFile, listOfGeneratedIcons, { encoding: 'utf-8' }, error => {
    console.log(generatedOutputFile + '\ngenerated with latest icon set\n');
    if (error) throw error;
  });
}

setTimeout(generateIconList, 250);//give some time to find and read file
