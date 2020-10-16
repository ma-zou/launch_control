var normalizedPath = require("path").join(__dirname, '/');

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  if(file !== 'index.js' && file !== 'default.js') {
    var name = file.replace('.js', '');
    exports[name] = require("./" + file);
  }
});