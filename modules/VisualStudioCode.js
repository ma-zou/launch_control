const options = {
  "name": "VS Code",
  "trigger": [
    'code',
    'acoda',
    'maus',
    'casa',
    'coding',
    'ascascode'
  ],
  "description": "Opens Visual Studio Code",
  "version": "0.1.0",
  "actions": [
    "open",
    "openPath",
    "openProject"
  ]
}
class Module {
  static main(trigger, args) {
    console.log(options);
  }
  static openPath() {

  }
  static openProject() {

  }
  static result(args) {
    return {
      name: options.name,
      prefix: null,
      tooltip: options.description,
      callback: this.main()
    }
  }
}

module.exports = {...{
  "class": Module,
},...options }