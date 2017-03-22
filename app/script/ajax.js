var ajax = function (service, utils) {
  var todoForm = $('[data-id="todo-create"]'),
      todoInput = $('[data-field="task"]'),
      error = $('[data-field-error="task"]');

  var postTodo = function () {
    console.info('ajax.js > postTodo');
    event.preventDefault();
    if(!utils.validateForm()) {
      error.text('please enter a todo').removeClass('hide');
      return false;
    } else {
      error.text('').addClass('hide');
    }

    service.post({task: todoInput.val()}).then(function (res) {
      $(todoForm).trigger('add-todo', { todo: res, status: 'success' });
      todoInput.val('');
    }).catch(function(reason) {
      $(todoForm).trigger('add-todo', { status: 'error' });
    });
  };

  var getTodos = function () {
    console.info('ajax.js > getTodos');
    service.get().then(function (res) {
      $(todoForm).trigger('get-todos', { todos: res, status: 'success' });
    }).catch(function(reason) {
      $(todoForm).trigger('get-todos', { status: 'error' });
    });
  };

  var deleteTodo = function (id) {
    console.info('ajax.js > deleteTodo');
    service.del(id).then(function (res) {
      $(todoForm).trigger('delete-todo', { todoId: id, status: 'success' });
    }).catch(function(reason) {
      $(todoForm).trigger('delete-todo', { status: 'error' });
    });
  };

  var updateTodo = function (todo) {
    console.info('ajax.js > updateTodo');
    service.update(todo).then(function (res) {
      // TODO: returing todo value returing directly. is this okay?!
      $(todoForm).trigger('update-todo', { todo: todo, status: 'success' });
    }).catch(function(reason) {
      $(todoForm).trigger('update-todo', { status: 'error' });
    });
  };

  return {
    postTodo: postTodo,
    getTodos: getTodos,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo
  };

};

$(function () {
  var utils = window.app.utils,
      service = window.app.service;
  window.app.ajax = ajax(service, utils);
});
