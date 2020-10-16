const { remote, ipcRenderer } = require('electron');
const fs = require('fs');

const modules = require('./modules/');
const form = document.getElementById('settings');
const save = document.createElement('button');
let settingsFile = fs.readFileSync('settings.json');
settingsFile = JSON.parse(settingsFile);
save.type = "submit";
save.innerText = 'Save Settings';

Object.keys(modules).forEach(module => {
  if( Object.keys(modules[module].settings).length ) {
    let container = document.createElement('fieldset');
    let legend = document.createElement('legend');
    legend.innerText = module;
    container.append(legend);
    container.classList.add(module);
    console.log(modules[module]);
    Object.keys(modules[module].settings).forEach(setting => {
      let input = document.createElement('input');
      let label = document.createElement('label');
      let box = document.createElement('div');
      box.classList.add('inputGrp')
      label.innerText = setting;
      label.for = module + setting;
      input.name = module +'|'+ setting;
      input.id = module + setting;
      if( settingsFile[module] && settingsFile[module][setting] ) input.value = settingsFile[module][setting];
      console.log(setting +': '+ modules[module].settings[setting]);
      switch(modules[module].settings[setting]) {
        case "string":
          input.type = "text";
          box.classList.add('text')
          break;
        case "boolean":
          input.type = "checkbox";
          box.classList.add('checkbox')
          break;
        case "number":
          input.type = "number";
          box.classList.add('number')
          break;
        default:
          input.type = "text";
          box.classList.add('text')
          break
      }
      box.append(input);
      box.append(label);
      container.append(box);
    })
    form.append(container)
  }
});

form.append(save);
form.addEventListener('submit', saveSettings);

function saveSettings(e) {
  e.preventDefault();
  let values = new FormData(e.target).entries();
  let input = values.next();
  let result = {};
  while(!input.done) {
    let moduleName = input.value[0].split('|')[0]
    let settingName = input.value[0].split('|')[1]
    if(!result[moduleName]) result[moduleName] = {}
    result[moduleName][settingName] = input.value[1]
    input = values.next();
  }
  fs.writeFileSync('settings.json', JSON.stringify(result))
}

let close = document.getElementById('close');
close.addEventListener('click', () => {
  ipcRenderer.send('settings_close');
});