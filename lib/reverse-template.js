var parse = require('./parser').parse;
// var template = '{{#author}}{{name}}{{/author}}';
var template = '{{#if author}}{{first_name}}{{/if}}';


console.log(JSON.stringify(parse(template), null, 2));
