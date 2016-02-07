var nonPositiveValidationRule = require('./validator/rules/nonPositive');
var nonDivisibleValidationRule = require('./validator/rules/nonDivisible');

var validationRules = [
    nonPositiveValidationRule,
    nonDivisibleValidationRule(3, 'error.three'),
    nonDivisibleValidationRule(5, 'error.five'),
];

module.exports = function (n) {
    return validationRules.reduce(function(result, rule){
        rule(n, result);
        return result;
    }, []);
    // var result = []
    // nonpositiveValidationRule(n, result)
    // nonDivisibleBy3ValidationRule(n, result)
    // nonDivisibleBy5ValidationRule(n, result)
    // return result;
};