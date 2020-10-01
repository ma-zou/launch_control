var normalizedPath = require("path").join(__dirname, '/');

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  if(file !== 'index.js') {
    var name = file.replace('.js', '');
    exports[name] = require("./" + file);
  }
});