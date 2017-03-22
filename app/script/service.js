var service = function (db, utils) {

  var post = function( data ) {
    console.info('service.js > post');
    var res = new Promise( function (resolve, reject) {
      var todo = {
        id: utils.guid(),
        task: data.task
      };
      try {
        db.todos.unshift(todo);
        resolve(todo);
      } catch(e) {
        console.error('service.js > post', e);
        reject(false)
      }
    });
    return res;
  };

  var get = function () {
    console.info('service.js > get');
    var res = new Promise( function (resolve, reject) {
      var todos = []
      try {
        todos = db.todos.slice();
        resolve(todos);
      } catch(e) {
        console.error('service.js > get', e);
        reject(false)
      }
    });
    return res;
  };

  var del = function (id) {
    console.info('service.js > delete');
    var res = new Promise( function (resolve, reject) {
      try {
        var todoToDeleteIndex;
        db.todos.find(function(obj, index, arr){
          if (obj.id === id) {
            todoToDeleteIndex = index;
            return true;
          }
        });
        db.todos.splice(todoToDeleteIndex, 1);
        resolve(true);
      } catch(e) {
        console.error('service.js > del', e);
        reject(false)
      }
    });
    return res;
  };

  var update = function (todo) {
    console.info('service.js > update');
    var res = new Promise( function (resolve, reject) {
      try {
        var todoToUpdate;
        db.todos.find(function(obj, index, arr){
          if(obj.id === todo.id) {
            obj.task = todo.task;
            todoToUpdate = obj;
            return true;
          }
        });
        resolve(todoToUpdate);
      } catch(e) {
        console.error('service.js > update', e);
        reject(false)
      }
    });
    return res;
  };

  return {
    post: post,
    get: get,
    del: del,
    update: update
  };

};

$(function () {
    var db = window.db,
        utils = window.app.utils;
    window.app.service = service(db, utils);
});
