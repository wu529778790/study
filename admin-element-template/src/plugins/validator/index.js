/**
 * Created by Liangzc on 2017/11/08.
 */
let { rules } = require('./rules'),
  _vue;
let validator = function() {};

/**
 * 根据类型返回校验函数
 * @param {String} type 数据类型
 *
 * @return {Function}
 */
validator.prototype.type = type => {
  let defRule = rules[type] || {};
  return !defRule ?
    false :
    (rule, value, callback, source, options) => {
      let test = defRule.test,
        valid = _vue.$utils.is('Function', defRule.test) ?
          defRule.test.call(this, value) :
          _vue.$utils.is('String', defRule.test) ?
            _vue.$utils.is('Function', test) ?
              test.call(this, value) :
              test.test(value) :
            defRule.test.test(value);
      if (!valid) {
        callback(new Error(rule.message || defRule.message));
      } else {
        callback();
      }
    };
};

/**
 * 校验数据
 * @param {String} type 数据类型
 * @param {Object} value 数据
 *
 * @return {Boolean}
 */
validator.prototype.validate = (type, value) => {
  let defRule = rules[type] || {};
  if (!defRule) return true;
  let test = defRule.test,
    valid = _vue.$utils.is('Function', defRule.test) ?
      defRule.test.call(this, value) :
      _vue.$utils.is('String', defRule.test) ?
        _vue.$utils.is('Function', test) ?
          test.call(this, value) :
          test.test(value) :
        defRule.test.test(value);
  return valid;
};

let install = function(Vue, options) {
  _vue = Vue;
  options &&
    options.rules &&
    (rules = Object.assign(rules, rules, options.rules));
  Vue.prototype.$validator = Vue.$validator = new validator();
};

module.exports = install;
