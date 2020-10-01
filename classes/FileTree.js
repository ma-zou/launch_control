const { remote } = require('electron');
const electronFs = remote.require('fs');

class FileTree {
  constructor(path, name = null) {
    this.path = path;
    this.name = name;
    this.item = []
  }

  build = () => {
    this.item = FileTree.readDir(this.path);
  }

  static readDir(path) {
    let fileArray = [];

    electronFs.readdirSync(path).forEach(file => {
      let fileInfo = new FileTree(`${path}\\${file}`, file);

      let stat = electronFs.statSync(fileInfo.path);

      if(stat.isDirectory()) {
        fileInfo.item = FileTree.readDir(fileInfo.path);
      }

      fileArray.push(fileInfo);
    })

    return fileArray;
  }
}

module.exports = FileTree