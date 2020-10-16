const { ipcRenderer } = require('electron');

class Main {
  constructor(modules, trigger) {
    this.focus = null;
    this.key = null;
    this.args = null;
    this.value = null;
    this.trigger = trigger;
    this.modules = modules
    this.matchingTrigger = [];
    this.result = new ResultWindow();
    this.results = [];
  }
  update(e) {
    console.log(e.which);
    switch(e.which) {
      case 27:
        ipcRenderer.send('close');
        break;
      case 13:
        if(this.results[this.focus] && this.results[this.focus].callback) this.results[this.focus].callback(this.key, this.args, this.results[this.focus].params)
        break;
      case 40:
        if(this.focus == null) {
          this.focus = 0;
        } else if(this.focus >= this.results.length - 1) {
          this.focus = null;
        } else {
          this.focus++;
        }
        this.result.focus(this.focus)
        break;
      case 38:
        if(this.focus == null) {
          this.focus = this.results.length -1;
        } else if(this.focus <= 0) {
          this.focus = null;
        } else {
          this.focus--;
        }
        this.result.focus(this.focus)
        break;
      case 9:
        if(this.key) {
          this.matchingTrigger = this.matchingTrigger.sort((a, b) => a.value.indexOf(this.key) - b.value.indexOf(this.key));
          e.target.value = this.matchingTrigger[0].value;
          this.default(e);
        }
        break;
      default:
          this.default(e)
        break;
    }
  }

  default(e) {
    this.value = e.target.value;
    this.key = this.value.trim().split(' ')[0];
    this.args = this.value.trim().replace(this.key, '');
    this.results = [];
    if(this.key) {
      this.matchingTrigger = this.trigger.filter(item => item.value.indexOf(this.key) != -1);
      this.matchingTrigger = this.matchingTrigger.sort((a, b) => {
        if(a.value.indexOf(this.key) > b.value.indexOf(this.key)) {
          return -1;
        } else {
          return 0
        }
      });
      this.matchingTrigger.forEach(item => {
        let temp = this.modules[item.module].class.result(item, this.key, this.args)
        if(temp) {
          if(temp && typeof temp.length == 'undefined') {
            this.results.push(temp);
          } else {
            this.results = [...temp];
          }
        }
      })
      this.result.update(this.results);
    } else {
      this.result.clear();
    }
  }
}

module.exports = Main