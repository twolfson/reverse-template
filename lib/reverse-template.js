var _ = require('underscore');
var parse = require('./parser').parse;

// Not sure this will work with regexp's
// It is impossible to tell when we matched `a` or `c` in a loop
/*
> 'acb'.match(/^([ac])*(b)$/)
[ 'acb',
  'c',
  'b',
  index: 0,
  input: 'acb' ]
*/
// Maybe we use regexp as a coarse focus, with string fallbacks on smaller parts?
/*
// Manually determine parts of `ac` loop
> 'acb'.match(/^((?:[ac])*)(b)$/)
[ 'acb',
  'ac',
  'b',
  index: 0,
  input: 'acb' ]
*/

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
    // TODO: Instead of making these a switch, make it an object with lookups. Same result but more extensible.
    switch (type) {
      case 'name':
        return {
          handle: function (result) {
            return _.object([token[1]], [result]);
          },
          value: '(.*)'
        };
      case 'text':
        return {
          handle: null,
          value: token[1]
        };
      default:
        throw new Error('Unrecognized token type "' + type + '"');
    }
  });
  // TODO: We need to implement backoff logic and such
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
    var varHandles = [];
    regexpParts.forEach(function saveVarName (part) {
      if (part.handle) {
        varHandles.push(part.handle);
      }
    });

    // Get the variables that matches
    var matchResults = match.slice(1);
    var retObjParts = matchResults.map(function handleResult (result, i) {
      return varHandles[i](result);
    });

    // Group all objects and return
    var retObj = _.extend.apply(_, retObjParts);
    return retObj;
  }
}
console.log(reverseTemplate({
  template: '{{first_name}} wat {{last_name}}',
  content: 'hello wat there'
}));
