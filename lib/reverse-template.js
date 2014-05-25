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
  var regexpParts = tokens.map(function generateRegexpPart (token) {
    var type = token[0];
    var value = token[1];
    switch (type) {
      case 'name':
        return '(.*)';
      case 'text':
        return value;
      default:
        throw new Error('Unrecognized token type "' + type + '"');
    }
  });
  var regexp = new RegExp(regexpParts.join(''));
  var match = content.match(regexp);

  // If we did not match, return a negative result
  if (!match) {
    return null;
  // Otherwise, line up the parts
  } else {
    return match;
  }
}
console.log(reverseTemplate({
  template: '{{first_name}} wat {{last_name}}',
  content: 'hello wat there'
}));
