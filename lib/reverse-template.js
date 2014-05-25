var parse = require('./parser').parse;
// var template = '{{#author}}{{name}}{{/author}}';
var template = 'oh hai {{first_name}} there';


console.log(JSON.stringify(parse(template), null, 2));
