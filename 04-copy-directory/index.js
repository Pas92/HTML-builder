const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');


const folderPath = path.join(__dirname, 'files');
const targetFolder = path.join(__dirname, 'files-copy');

const createFolder = async () => {
  try {
    await fsPromises.mkdir(targetFolder, { recursive: true });
  } catch (error) {
    console.log(error)
  }
}

const copyFiles = async () => {
  try {
    const files = await fsPromises.readdir(folderPath);
    for(file of files) {
      let target = file
      try {
        await fsPromises.copyFile(path.join(folderPath, target.toString()), path.join(targetFolder, target.toString()));
        console.log(`Файл ${target} успешно скопирован из папки ${folderPath} в папку ${targetFolder}`);
      } catch (error) {
        console.log(error)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const copyBetweenFolders = async () => {
  await createFolder();
  await copyFiles();
}

copyBetweenFolders()
