var eventHandler = function (model, ajax, render) {
  var todoForm = $('[data-id="todo-create"]'),
      todoInput = $('[data-field="task"]'),
      todoList = $('[data-id="todos-list"]'),
      addTodoBtn = $('[data-action="add"]'),
      clearBtn = $('[data-action="clear"]'),
      showTodoCreateBtn = $('[data-action="show-todo-create"]')

  getId = function (el) {
    return $(el).parents('li').attr('data-task-id');
  };

  getValue = function (el) {
    return $(el).parents('li').find('[data-field]').val();
  }

  addTodoBtn.on('click', function (event) {
    console.info('eventHandler.js > addTodoBtn');
    event.preventDefault();
    ajax.postTodo();
  });

  clearBtn.on('click', function (event) {
    console.info('eventHandler.js > cancelBtn');
    todoForm.trigger('clear');
  });

  todoList.on('click', '[data-action="delete"]', function (event) {
    console.info('eventHandler.js > deleteBtn');
    event.preventDefault();
    ajax.deleteTodo(getId(this));
  });

  todoList.on('click', '[data-action="edit"]', function (event) {
    console.info('eventHandler.js > editBtn');
    event.preventDefault();
    var editTemplate = $($('#editTemplate').html());
    var listItem = $(this).parents('li');
    var todo = model.get(listItem.attr('data-task-id'))
    listItem.children().hide();
    editTemplate.find('input').attr('value',todo.task);
    listItem.append(editTemplate.html());
  });

  todoList.on('click', '[data-action="cancel"]', function (event) {
    console.info('eventHandler.js > cancelBtn');
    event.preventDefault();
    var listItem = $(this).parents('li');
    listItem.find('form').remove();
    listItem.find('div').show();
  });

  todoList.on('click', '[data-action="update"]', function (event) {
    console.info('eventHandler.js > updateBtn');
    event.preventDefault();
    ajax.updateTodo({
      id: getId(this),
      task: getValue(this)
    });
  });

  todoForm.on('add-todo', function (event, data) {
    console.info('eventHandler.js > event > add-todo');
    if(data.status === 'success') {
      // ajax.getTodos();
      model.add(data.todo);
      render.todos();
      render.notification(true, '<div class="success">Added todo</div>');
    } else if(data.status === 'error') {
      render.notification(true, '<div class="error">Error adding todo</div>');
    }
  });

  todoForm.on('get-todos', function (event, data) {
    console.info('eventHandler.js > event > get-todos');
    if(data.status === 'success') {
      model.set(data.todos);
      render.todos();
      if (data.todos.length) {
        render.notification(true, '<div class="success">Retrieved todos</div>');
      }
    } else if(data.status === 'error') {
      render.notification(true, '<div class="error">Error fetching todos</div>');
    }
  });

  todoForm.on('submit', function (event) {
    console.info('eventHandler.js > event > submit');
      event.preventDefault();
      addTodoBtn.trigger('click');
  });

  todoForm.on('clear', function (event) {
    console.info('eventHandler.js > event > clear');
    event.preventDefault();
    todoInput.val('');
  });

  todoForm.on('delete-todo', function (event, data) {
    console.info('eventHandler.js > event > delete');
    if(data.status === 'success') {
      model.remove(data.todoId);
      render.todos();
      render.notification(true, '<div class="success">Deleted todo</div>');
    } else if(data.status === 'error') {
      render.notification(true, '<div class="error">Error deleting todo</div>');
    }
  });

  todoForm.on('update-todo', function (event, data) {
    console.info('eventHandler.js > event > update');
    if(data.status === 'success') {
      model.update(data.todo);
      render.todos();
      render.notification(true, '<div class="success">Updated todo</div>');
    } else if(data.status === 'error') {
      render.notification(true, '<div class="error">Error updating todo</div>');
    }
  });

  todoForm.on('edit-todo', function (event) {
    console.info('eventHandler.js > event > edit');
    event.preventDefault();
  });

};

$(function () {
  var ajax = window.app.ajax,
      render = window.app.renderDOM,
      model = window.app.model;
  eventHandler(model, ajax, render);
});
