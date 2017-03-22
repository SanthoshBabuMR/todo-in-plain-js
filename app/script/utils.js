var utils = function() {
  var guid = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };

  var validateForm = function () {
    console.info('utils.js > validateForm');
    var value = $('[data-field="task"]').val();
    return !value ? false : true;
  };

  return {
    guid: guid,
    validateForm: validateForm
  };
};

$(function () {
  window.app.utils = utils();
});
