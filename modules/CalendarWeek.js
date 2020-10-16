const options = {
  "name": "Calendar Week",
  "trigger": [
    'cw',
  ],
  "description": "Opens Visual Studio Code",
  "version": "0.1.0",
  "settings": {}
}
class Module {
  static main(trigger, args, params) {

  }
  static getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
  }
  static result(data, key, args) {
    let cw = this.getWeekNumber(new Date());
    return {
      name: options.name+': '+ cw[1],
      prefix: null,
      tooltip: options.description,
    }
  }
}

module.exports = {...{
  "class": Module,
},...options }