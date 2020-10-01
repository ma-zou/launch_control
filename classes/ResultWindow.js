const { ipcRenderer } = require('electron');

class ResultWindow {
  constructor() {
    this.element = document.getElementById('results'),
    this.height = 75;
    this.inputHeight = 58;
  }
  update(results) {
    this.clear();

    results.forEach((result, key) => {
      this.create(result, key);
    });
    ipcRenderer.send('resize', this.height * results.length + this.inputHeight);
  }
  clear() {
    this.element.innerHTML = ''
    ipcRenderer.send('resize', this.inputHeight);
  }
  focus(keyMatch) {
    console.log(keyMatch);
    let nodes = this.element.children
    for(let i = 0; i < nodes.length; i++) {
      nodes[i].classList.remove('active');
      console.log(nodes[i]);
      console.log(i);
      if(keyMatch && i === keyMatch) nodes[i].classList.add('active');
    }
  }
  create(result, key) {
    let element = document.createElement('div');
    element.classList.add('resultOption');
    element.innerHTML = (result.prefix) ? result.name + '<span>'+result.prefix+'</span>' : result.name;
    element.dataset.tooltip = result.tooltip

    this.element.appendChild(element);
  }
}

module.exports = ResultWindow