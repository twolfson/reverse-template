var parse = require('./parser').parse;
var template = '{{#author}}{{name}}{{/author}}';


console.log(parse(template));
