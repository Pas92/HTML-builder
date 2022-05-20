const{ stdin, stdout } = process;
const path = require('path');
const fs = require('fs');
const output = fs.createWriteStream(path.join(__dirname, 'stream-file.txt'));

stdout.write('Введите текст: ');

const flag = 'exit';

stdin.on('data', data => {
  if (data.toString().trim() === flag) {
    process.exit();
  } else {
    output.write(data);
    stdout.write('Введите текст: ');
  }
});

process.on('exit', () => stdout.write('Ввод данных завершен'));
process.on('SIGINT', () => {
  stdout.write('\n');
  process.exit();
});
