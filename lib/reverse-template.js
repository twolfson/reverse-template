var parse = require('./parser').parse;

function reverseTemplate(params) {
  // Localize parameters
  var template = params.template;
  var content = params.content;

  // Tokenize our template
  var tokens = parse(template);

  // Generate a regular expression for the content
  // TODO: Generate a regular expression as far as we can
  // TODO: We should sweep through all the templates and make them full paths if possible.
  // TODO: Then, figure out where we have to stop
  console.log(tokens);
}
console.log(reverseTemplate({
  template: '{{first_name}}',
  content: 'hello'
}));
