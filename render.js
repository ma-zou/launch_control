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