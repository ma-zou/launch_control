const { ipcRenderer } = require('electron');
const settings = require('../settings.json');

const options = {
  "module_name": "OfficeLight",
  "name": "Office Light",
  "trigger": [
    'lamp',
  ],
  "description": "Toggle Office Light",
  "version": "0.1.0",
  "settings": {
    "url": "string"
  }
  // "url": "https://maker.ifttt.com/trigger/ToggleOfficeLight/with/key/lko95yNf3xBjgflDTUD_-GdbMqFfu4xrkEz2oucSjVp"
}
class Module {
  static main(trigger, args, params) {
    // this is an example callback funtion
    // trigger is the currently selected triggger, args is a string containing all arguments added to the trigger, params is a
    fetch(settings[options.module_name].url, {
      method: "POST",
    })
  }
  static result(data, key, args) {
    // returns a result object to display possible and matched options
    // can be an object or an array of objects
    // callback is the function called when the selected options is ran

    return {
      name: options.name,
      prefix: args,
      tooltip: options.description,
      callback: this.main
    }
  }
}

module.exports = {...{
  "class": Module,
},...options }