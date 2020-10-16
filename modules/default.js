const { ipcRenderer } = require('electron');

const options = {
  "name": "Name",
  "trigger": [
    'triggerwords',
  ],
  "description": "description",
  "version": "0.1.0",
  "settings": {}
}
class Module {
  static main(trigger, args, params) {
    // this is an example callback funtion
    // trigger is the currently selected triggger, args is a string containing all arguments added to the trigger, params is a

    if(!args) {
      console.log('def');
      ipcRenderer.send('process_exec', 'start https://google.com');
    } else {
      console.log('args:',args);
      ipcRenderer.send('process_exec', 'start https://google.com/search?q='+encodeURI(args)+'&ie=UTF-8');
    }
  }
  static result(data, key, args) {
    // returns a result object to display possible and matched options
    // can be an object or an array of objects
    // callback is the function called when the selected options is ran

    args = args.trim();
    if(args) {
      return {
        name: options.name,
        prefix: args,
        tooltip: options.description,
        callback: this.main
      }
    } else {
      return {
        name: options.name,
        prefix: null,
        tooltip: options.description,
        callback: this.main
      }
    }
  }
}

module.exports = {...{
  "class": Module,
},...options }