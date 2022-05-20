const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

const folderPath = path.join(__dirname, 'styles');
const targetFolder = path.join(__dirname, 'project-dist');

const createBundle = async (source, bundleName, bundleExtension) => {
  try {
    const files = await fsPromises.readdir(source);
    const output = fs.createWriteStream(path.join(targetFolder, `${bundleName}.${bundleExtension}`));
    for(file of files) {
      let target = file
      if(path.extname(target) === `.${bundleExtension}`) {
        const stream = fs.createReadStream(path.join(folderPath, target.toString()), 'utf-8');
        let data = '';
        stream.on('data', chunk => data += chunk);
        stream.on('end', () => {
          output.write(data);
        });
      }
    }
  } catch (error) {
    console.log(error)
  }
}

createBundle(folderPath, 'bundle', 'css')
