const { ipcRenderer } = require('electron');
const isValid = require('is-valid-path');
const FileTree = require('../classes/FileTree.js');
const settings = require('../settings.json');

const options = {
  "module_name": "VisualStudioCode",
  "name": "VS Code",
  "trigger": [
    'code'
  ],
  "description": "Opens Visual Studio Code",
  "version": "0.1.0",
  "settings": {
    "projectDir": "string"
  }
}

const workspaces = new FileTree(settings[options.module_name].projectDir);
workspaces.build();

let workspaceArray = workspaces.item.map(item => item.name.replace('.code-workspace', ''))

class Module {
  static main(trigger, args, params) {
    if(!args) {
      ipcRenderer.send('process_exec', 'code');
    } else {
      if(params.project) {
        ipcRenderer.send('process_exec', 'start '+params.project, settings[options.module_name].projectDir);
      } else if( params.path) {
        ipcRenderer.send('process_exec', 'start '+params.project, path);
      }
    }
  }
  static result(data, key, args) {
    args = args.trim();
    if(args) {
      let matchingWorkspaces = workspaceArray.filter(item => item.indexOf(args) != -1)
      if(matchingWorkspaces.length > 0) {
        // project
        console.log('project');
        return [
          {
            name: options.name,
            prefix: 'Open VS Code',
            tooltip: options.description,
            callback: this.main
          },
          ...matchingWorkspaces.map(space => {
            return {
              name: options.name,
              prefix: 'Open path: '+ space,
              tooltip: options.description,
              callback: this.main,
              params: {
                project: space+'.code-workspace'
              }
            }
          })
        ]
      } else if(isValid(args)) {
        // path
        console.log('path');
        return [
          {
            name: options.name,
            prefix: 'Open VS Code',
            tooltip: options.description,
            callback: this.main
          },
          {
            name: options.name,
            prefix: 'Open path: '+args,
            tooltip: options.description,
            callback: this.main,
            params: {
              path: args
            }
          }
        ]
      }
    } else {
      // default case
      return {
        name: options.name,
        prefix: 'Open VS Code',
        tooltip: options.description,
        callback: this.main
      }
    }
  }
}

module.exports = {...{
  "class": Module,
},...options }