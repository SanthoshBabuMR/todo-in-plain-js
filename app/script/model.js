var model = function () {
  var data = [];
  var getIndexById = function (id) {
    return data.map(function(todo) {
      return todo.id
    }).indexOf(id);
  };

  var get = function (id) {
    if (id) {
      return data[getIndexById(id)];
    }
    return data.slice();
  };

  var set = function (val) {
    data = val;
  };

  var add = function (todo) {
    data.unshift(todo);
  };

  var remove = function (todoId) {
    var removeIndex = getIndexById(todoId);
    if (removeIndex !== -1) {
      data.splice(removeIndex, 1)
    }
  };

  var update = function (todo) {
    var updateIndex = getIndexById(todo.id);
    if (updateIndex !== -1) {
      data.splice(updateIndex, 1, todo)
    }
  };

  return {
    get: get,
    set: set,
    add: add,
    remove: remove,
    update: update
  };
};

$(function () {
  window.app.model = model();
})
