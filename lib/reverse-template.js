var handlebars = require('handlebars');
var template = '{{#if author}}{{name}}{{/if}}';


// console.log(handlebars);
console.log(handlebars.parse(template).statements[0].mustache);
