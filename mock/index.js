var indexdata = require('./data');
var data = {
    '/api/list': indexdata
}
module.exports = function(url) {
    return data[url]
}