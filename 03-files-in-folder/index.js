const path = require('path');
const fs = require('fs');


const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, {encoding: 'utf-8', withFileTypes: true}, (err, files) => {
  if (err) throw err;

  for(file of files) {
    if(file.isFile()) {
      let fileInfo = path.parse(file.name);

      fs.stat(path.join(folderPath, file.name), (err, stats) => {
        console.log(`${fileInfo.name} - ${fileInfo.ext} - ${stats.size / 1024}kb`);
      });
    }
  }
});


