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
    switch (type) {
      case 'name':
        return {
          name: token[1],
          value: '(.*)'
        };
      case 'text':
        return {
          name: null,
          value: token[1]
        };
      default:
        throw new Error('Unrecognized token type "' + type + '"');
    }
  });
  // TODO: Amount has the ability to flucuate. Fuck.
  var regexpValues = regexpParts.map(function pluckValue (part) {
    return part.value;
  });
  var regexp = new RegExp('^' + regexpValues.join('') + '$');
  var match = content.match(regexp);

  // If we did not match, return a negative result
  if (!match) {
    return null;
  // Otherwise, line up the parts
  } else {
    // Collapse variables to their names
    var varNames = [];
    regexpParts.forEach(function saveVarName (part) {
      if (part.name) {
        varNames.push(part.name);
      }
    });

    // Get the variables that matches
    var matchResults = match.slice(1);

    // Generate and return our rsult
    var retObj = {};
    matchResults.forEach(function saveResult (result, i) {
      var name = varNames[i];
      retObj[name] = result;
    });
    return retObj;
  }
}
console.log(reverseTemplate({
  template: '{{first_name}} wat {{last_name}}',
  content: 'hello wat there'
}));
