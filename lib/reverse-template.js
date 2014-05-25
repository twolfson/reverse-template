var parse = require('./parser').parse;
var template = '{{#if author}}{{name}}{{/if}}';


console.log(parse(template));
