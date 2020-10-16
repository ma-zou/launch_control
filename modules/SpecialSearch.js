const { ipcRenderer } = require('electron');

const options = {
  "name": "Special Search",
  "trigger": [
    'wiki',
    'stackoverflow'
  ],
  "description": "Specialized web search",
  "version": "0.1.0",
  "settings": {}
}
class Module {
  static main(trigger, args, params) {
    // this is an example callback funtion
    // trigger is the currently selected triggger, args is a string containing all arguments added to the trigger, params is a
    switch (trigger) {
      case 'wiki':
        ipcRenderer.send('process_exec', 'start https://de.wikipedia.org/w/index.php?search='+encodeURI(args));
        break;
      case 'stackoverflow':
        ipcRenderer.send('process_exec', 'start https://stackoverflow.com/search?q='+encodeURI(args));
        break;
      default:
        break;
    }
  }
  static result(data, key, args) {
    // returns a result object to display possible and matched options
    // can be an object or an array of objects
    // callback is the function called when the selected options is ran

    args = args.trim();
    switch (data.value) {
      case 'wiki':
        return {
          name: 'Wikipedia Search',
          prefix: args,
          tooltip: "Search in Wikipedia",
          callback: this.main
        }
        break;
      case 'stackoverflow':
        return {
          name: 'Stackoverflow Search',
          prefix: args,
          tooltip: "Search in Stackoverflow",
          callback: this.main
        }
        break;
      default:
        break;
    }
  }
}

module.exports = {...{
  "class": Module,
},...options }