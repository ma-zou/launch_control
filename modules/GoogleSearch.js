const { ipcRenderer } = require('electron');

const options = {
  "name": "Google Search",
  "trigger": [
    'google',
  ],
  "description": "Open Google search in Browser",
  "version": "0.1.0",
  "settings": {}
}
class Module {
  static main(trigger, args, params) {
    if(!args) {
      console.log('def');
      ipcRenderer.send('process_exec', 'start https://google.com');
    } else {
      console.log('args:',args);
      ipcRenderer.send('process_exec', 'start https://google.com/search?q='+encodeURI(args)+'&ie=UTF-8');
    }
  }
  static result(data, key, args) {
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