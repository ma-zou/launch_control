const { ipcRenderer } = require('electron');

class Main {
  constructor(modules, trigger) {
    this.focus = null;
    this.key = null;
    this.value = null;
    this.trigger = trigger;
    this.modules = modules
    this.matchingTrigger = [];
    this.result = new ResultWindow();
    this.results = [];
  }
  update(e) {
    switch(e.which) {
      case 27:
        ipcRenderer.send('close');
        break;
      case 13:
        this.focus.trigger('click');
        break;
      case 40:
        if(this.focus === null) {
          this.focus = 0;
        } else if(this.focus >= this.matchingTrigger.length - 1) {
          this.focus = null;
        } else {
          this.focus++;
        }
        this.result.focus(this.focus)
      default:
          this.default(e)
        break
    }
  }

  default(e) {
    this.value = e.target.value;
    this.key = this.value.trim().split(' ')[0];
    this.args = this.value.trim().replace(this.key, '');

    if(this.key) {
      this.matchingTrigger = this.trigger.filter(item => item.value.indexOf(this.key) != -1);
      this.matchingTrigger = this.matchingTrigger.sort((a, b) => {
        if(a.value.indexOf(this.key) > b.value.indexOf(this.key)) {
          return -1;
        } else {
          return 0
        }
      });
      this.results = this.matchingTrigger.map(item => {
        return this.modules[item.module].class.result();
      })
      this.result.update(this.results);
    } else {
      this.result.clear();
    }
  }
}

module.exports = Main