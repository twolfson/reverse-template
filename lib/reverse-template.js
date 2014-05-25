var parse = require('./parser').parse;
// var template = '{{#author}}{{name}}{{/author}}';
var template = '{{#if author}}{{name}}{{/if}}';


console.log(parse(template));
