var Parser = require('./parser');
var template = '{{#if author}}{{name}}{{/if}}';


// console.log(handlebars);
var parser = new Parser();
console.log(parser.parse(template));
