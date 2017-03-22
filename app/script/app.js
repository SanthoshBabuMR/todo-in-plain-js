$(function(){

  var ajax = window.app.ajax;

  var init = function () {
    console.info('app.js > init');
    ajax.getTodos();
  };

  window.app.init = init;
});
