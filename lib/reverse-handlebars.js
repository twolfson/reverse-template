var handlebars = require('handlebars');
var template = '{{#if author}}{{name}}{{/if}}';


// console.log(handlebars);
console.log(handlebars.parse(template));
