const path = require('path');
const fs = require('fs');


const folderPath = path.join(__dirname, 'styles');
const targetFolder = path.join(__dirname, 'project-dist');

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;
  const output = fs.createWriteStream(path.join(targetFolder, 'bundle.css'));

  for(file of files) {
    let target = file
    // console.log(target);

    if(path.extname(target) === '.css') {
      const stream = fs.createReadStream(path.join(folderPath, target.toString()), 'utf-8');
      let data = '';
      stream.on('data', chunk => data += chunk);
      stream.on('end', () => {
        output.write(data);
      });
    }
  }
});