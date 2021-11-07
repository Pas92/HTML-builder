const path = require('path');
const fs = require('fs');


const folderPath = path.join(__dirname, 'files');
const targetFolder = path.join(__dirname, 'files-copy');

fs.readdir(targetFolder, (err, files) => {
  if (err) throw err;

  for(file of files) {
    let target = file
    fs.unlink(path.join(targetFolder, target.toString()), err => {
      if(err) throw err;
      console.log('Файл успешно удалён');
    });
  }
});

fs.mkdir(targetFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  for(file of files) {
    let target = file
    console.log(target);
    fs.copyFile(path.join(folderPath, target.toString()), path.join(targetFolder, target.toString()), err => {
      if(err) throw err;
      console.log('Файл успешно скопирован');
    });
  }
});




