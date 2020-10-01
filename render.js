const { remote } = require('electron');

const ResultWindow = require('./classes/ResultWindow.js');
const FileTree = require('./classes/FileTree.js');
const Main = require('./classes/Main.js');

const modules = require('./modules/');
const trigger = [];

Object.keys(modules).forEach(module => {
  modules[module].trigger.forEach(value => {
    trigger.push({
      value: value,
      module: module
    })
  })
})

const input = document.getElementById('input')
const main = new Main(modules, trigger);

input.addEventListener('keyup', main.update.bind(main));




























// const workspaces = new FileTree('C:/Users/malte zoudlik/Documents/Development/workspaces');
// workspaces.build();

// function update(e) {


//   console.log(matchingTrigger);



  // switch(key[0]) {
  //   case 'code':
  //     console.log('code');
  //     if(key[1] && key[1] === 'workspace' ) {
  //       console.log(workspaces);
  //       workspaces.forEach(space => {
  //         console.log(space);
  //       })
  //     } else {
  //       let results = [
  //         {
  //           type: 'server',
  //           func: 'code',
  //           message: 'Open VSCode'
  //         }
  //       ]
  //       if(key[1]) {
  //         results.push({
  //           type: "server",
  //           func: "code .",
  //           funcCwd: "C:\\Users\\malte zoudlik\\Documents\\Development\\"+key[1]+"\\",
  //           message: 'Open Dev-Folder "'+key[1]+'" in VSCode'
  //         });
  //       }
  //       resultWindow.updateResults(results)
  //     }
  //     break;
  //   case 'create':
  //     break;
  //   case 'placeholder':
  //     break;
  //   default:
  //     break
  // }

// }