const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');


// const folderPath = path.join(__dirname, 'files');
// const targetFolder = path.join(__dirname, 'files-copy');

const createFolder = async (folderName) => {
  try {
    await fsPromises.mkdir(folderName, { recursive: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteFiles = async (folderName) => {
  try {
    const files = await fsPromises.readdir(folderName, { withFileTypes: true });
    for (let file of files) {
      if(file.isFile()) {
        let target = file.name;
        console.log(`Файл ${target} успешно удален из папки ${folderName
        }`);
        fsPromises.unlink(path.join(folderName, target));
      } else {
        let target = file.name;
        const newTarget = path.join(folderName, target.toString());
        deleteFiles(newTarget);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const copyFiles = async (sourceFolder, targetFolder) => {
  try {
    const files = await fsPromises.readdir(sourceFolder, { withFileTypes: true });
    for (let file of files) {
      if(file.isFile()) {
        let target = file.name;
        try {
          await fsPromises.copyFile(path.join(sourceFolder, target.toString()), path.join(targetFolder, target.toString()));
          console.log(`Файл ${target} успешно скопирован из папки ${sourceFolder
          } в папку ${targetFolder}`);
        } catch (error) {
          console.log(error);
        }
      } else {
        let target = file.name;
        const newSource = path.join(sourceFolder, target.toString());
        const newTarget = path.join(targetFolder, target.toString());
        await createFolder(newTarget);
        await copyFiles(newSource, newTarget);
      }

    }
  } catch (error) {
    console.log(error);
  }
};

const copyAssets = async (targetFolder) => {
  const assetsFolder = path.join(targetFolder, 'assets');
  const sourceFolder = path.join(__dirname, 'assets');
  await createFolder(assetsFolder);
  await deleteFiles(assetsFolder);
  await copyFiles(sourceFolder, assetsFolder);
};

const createCSSBundle = async (sourcePath, targetPath, bundleName, bundleExtension) => {
  try {
    const files = await fsPromises.readdir(sourcePath);
    const output = fs.createWriteStream(path.join(targetPath, `${bundleName}.${bundleExtension}`));
    for (let file of files) {
      let target = file;
      if (path.extname(target) === `.${bundleExtension}`) {
        const stream = fs.createReadStream(path.join(sourcePath, target.toString()), 'utf-8');
        let data = '';
        stream.on('data', chunk => data += chunk);
        stream.on('end', () => {
          output.write(data);
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const buildProject = async () => {
  const buildFolder = path.join(__dirname, 'project-dist');
  await createFolder(buildFolder);
  await copyAssets(buildFolder);

  const sourceCSSFolder = path.join(__dirname, 'styles');
  await createCSSBundle(sourceCSSFolder, buildFolder, 'style', 'css');
};

buildProject();
