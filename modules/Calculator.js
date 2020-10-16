const { ipcRenderer } = require('electron');

const options = {
  "name": "Calculator",
  "trigger": [
    'calc',
  ],
  "description": "Calculate input",
  "version": "0.1.0",
  "settings": {}
}
class Module {
  static main(trigger, args, params) {
    // this is an example callback funtion
    // trigger is the currently selected triggger, args is a string containing all arguments added to the trigger, params is a

  }
  static result(data, key, args) {
    let result = ''
    if(args) {
      result = eval(args);
    }
    return {
      name: options.name+': '+ result,
      prefix: null,
      tooltip: options.description,
    }
  }
}

module.exports = {...{
  "class": Module,
},...options }